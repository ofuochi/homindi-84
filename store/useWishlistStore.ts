import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/types"
import { useCartStore } from "./useCartStore"

interface WishlistState {
  wishlistItems: Product[]
  isLoading: boolean
  fetchWishlist: () => Promise<void>
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  moveAllToCart: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistItems: [],
      isLoading: false,

      fetchWishlist: async () => {
        set({ isLoading: true })
        try {
          // In a real app, this would be an API call
          // For now, we'll just simulate a delay
          await new Promise((resolve) => setTimeout(resolve, 800))
          // The actual data is already in the store via persist
        } catch (error) {
          console.error("Failed to fetch wishlist:", error)
        } finally {
          set({ isLoading: false })
        }
      },

      addToWishlist: (product) => {
        const { wishlistItems } = get()
        const isAlreadyInWishlist = wishlistItems.some((item) => item.id === product.id)

        if (!isAlreadyInWishlist) {
          set({ wishlistItems: [...wishlistItems, product] })
        }
      },

      removeFromWishlist: (productId) => {
        const { wishlistItems } = get()
        set({
          wishlistItems: wishlistItems.filter((item) => item.id !== productId),
        })
      },

      isInWishlist: (productId) => {
        const { wishlistItems } = get()
        return wishlistItems.some((item) => item.id === productId)
      },

      clearWishlist: () => {
        set({ wishlistItems: [] })
      },

      moveAllToCart: () => {
        const { wishlistItems } = get()
        const addItem = useCartStore.getState().addItem

        wishlistItems.forEach((product) => {
          if (product.inStock) {
            addItem(product, 1)
          }
        })

        // Optionally clear the wishlist after moving items to cart
        // set({ wishlistItems: [] });
      },
    }),
    {
      name: "wishlist-storage",
      // Only persist the wishlistItems
      partialize: (state) => ({ wishlistItems: state.wishlistItems }),
    },
  ),
)
