import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import type { Product } from "@/lib/types"
import { mockProducts } from "@/lib/mockData"

interface ProductState {
  products: Product[]
  filteredProducts: Product[]
  searchTerm: string
  selectedCategories: string[]
  priceRange: [number, number]
  inStockOnly: boolean
  sortBy: string
  isLoading: boolean

  // Actions
  setProducts: (products: Product[]) => void
  setSearchTerm: (term: string) => void
  setSelectedCategories: (categories: string[]) => void
  setPriceRange: (range: [number, number]) => void
  setInStockOnly: (inStock: boolean) => void
  setSortBy: (sortBy: string) => void
  applyFilters: () => void
  clearFilters: () => void
  fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductState>()(
  immer((set, get) => ({
    products: [],
    filteredProducts: [],
    searchTerm: "",
    selectedCategories: [],
    priceRange: [0, 100],
    inStockOnly: false,
    sortBy: "name",
    isLoading: false,

    setProducts: (products: Product[]) => {
      set((state) => {
        state.products = products
        state.filteredProducts = products
      })
    },

    setSearchTerm: (term: string) => {
      set((state) => {
        state.searchTerm = term
      })
      get().applyFilters()
    },

    setSelectedCategories: (categories: string[]) => {
      set((state) => {
        state.selectedCategories = categories
      })
      get().applyFilters()
    },

    setPriceRange: (range: [number, number]) => {
      set((state) => {
        state.priceRange = range
      })
      get().applyFilters()
    },

    setInStockOnly: (inStock: boolean) => {
      set((state) => {
        state.inStockOnly = inStock
      })
      get().applyFilters()
    },

    setSortBy: (sortBy: string) => {
      set((state) => {
        state.sortBy = sortBy
      })
      get().applyFilters()
    },

    applyFilters: () => {
      set((state) => {
        const { products, searchTerm, selectedCategories, priceRange, inStockOnly, sortBy } = state

        const filtered = products.filter((product) => {
          const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
          const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
          const matchesStock = !inStockOnly || product.inStock

          return matchesSearch && matchesCategory && matchesPrice && matchesStock
        })

        // Sort products
        filtered.sort((a, b) => {
          switch (sortBy) {
            case "price-low":
              return a.price - b.price
            case "price-high":
              return b.price - a.price
            case "name":
            default:
              return a.name.localeCompare(b.name)
          }
        })

        state.filteredProducts = filtered
      })
    },

    clearFilters: () => {
      const maxPrice = Math.max(...get().products.map((p) => p.price))
      set((state) => {
        state.searchTerm = ""
        state.selectedCategories = []
        state.priceRange = [0, maxPrice]
        state.inStockOnly = false
        state.sortBy = "name"
      })
      get().applyFilters()
    },

    fetchProducts: async () => {
      set((state) => {
        state.isLoading = true
      })

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const maxPrice = Math.max(...mockProducts.map((p) => p.price))
        set((state) => {
          state.products = mockProducts
          state.filteredProducts = mockProducts
          state.priceRange = [0, maxPrice]
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.isLoading = false
        })
        throw error
      }
    },
  })),
)
