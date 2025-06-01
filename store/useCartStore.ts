import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import type { CartItem, Product } from "@/lib/types"

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  setIsOpen: (open: boolean) => void
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id)

          if (existingItem) {
            existingItem.quantity += quantity
          } else {
            state.items.push({ product, quantity })
          }
        })
      },

      removeItem: (productId: string) => {
        set((state) => {
          state.items = state.items.filter((item) => item.product.id !== productId)
        })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => {
          const item = state.items.find((item) => item.product.id === productId)
          if (item) {
            item.quantity = quantity
          }
        })
      },

      clearCart: () => {
        set((state) => {
          state.items = []
        })
      },

      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },

      setIsOpen: (open: boolean) => {
        set((state) => {
          state.isOpen = open
        })
      },
    })),
    {
      name: "homindi-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
