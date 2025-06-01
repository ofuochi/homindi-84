import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import type {
  UpdateOrderStatusRequest,
  CreateProductRequest,
  UpdateProductRequest,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  StockAdjustmentRequest,
} from "@/lib/api/types"

// Query keys
export const queryKeys = {
  orders: (params?: any) => ["orders", params],
  order: (id: string) => ["orders", id],
  products: (params?: any) => ["products", params],
  categories: (params?: any) => ["categories", params],
  inventoryLogs: (params?: any) => ["inventory", "logs", params],
  users: (params?: any) => ["users", params],
  adminStats: () => ["admin", "stats"],
}

// Orders hooks
export function useOrders(params?: {
  page?: number
  limit?: number
  status?: string
}) {
  return useQuery({
    queryKey: queryKeys.orders(params),
    queryFn: () => apiClient.getOrders(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => apiClient.getOrder(id),
    enabled: !!id,
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderStatusRequest }) => apiClient.updateOrderStatus(id, data),
    onSuccess: (response, { id }) => {
      // Invalidate and refetch orders
      queryClient.invalidateQueries({ queryKey: queryKeys.orders() })
      queryClient.invalidateQueries({ queryKey: queryKeys.order(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.adminStats() })
    },
  })
}

// Products hooks
export function useProducts(params?: {
  page?: number
  limit?: number
  category?: string
  search?: string
  stockStatus?: string
}) {
  return useQuery({
    queryKey: queryKeys.products(params),
    queryFn: () => apiClient.getProducts(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductRequest) => apiClient.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products() })
      queryClient.invalidateQueries({ queryKey: queryKeys.adminStats() })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductRequest }) => apiClient.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products() })
      queryClient.invalidateQueries({ queryKey: queryKeys.adminStats() })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products() })
      queryClient.invalidateQueries({ queryKey: queryKeys.adminStats() })
    },
  })
}

// Categories hooks
export function useCategories(params?: {
  page?: number
  limit?: number
}) {
  return useQuery({
    queryKey: queryKeys.categories(params),
    queryFn: () => apiClient.getCategories(params),
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => apiClient.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories() })
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryRequest }) => apiClient.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories() })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories() })
    },
  })
}

// Inventory hooks
export function useInventoryLogs(params?: {
  page?: number
  limit?: number
  productId?: string
}) {
  return useQuery({
    queryKey: queryKeys.inventoryLogs(params),
    queryFn: () => apiClient.getInventoryLogs(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useAdjustStock() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: StockAdjustmentRequest) => apiClient.adjustStock(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products() })
      queryClient.invalidateQueries({ queryKey: queryKeys.inventoryLogs() })
      queryClient.invalidateQueries({ queryKey: queryKeys.adminStats() })
    },
  })
}

// Users hooks
export function useUsers(params?: {
  page?: number
  limit?: number
}) {
  return useQuery({
    queryKey: queryKeys.users(params),
    queryFn: () => apiClient.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Admin hooks
export function useAdminStats() {
  return useQuery({
    queryKey: queryKeys.adminStats(),
    queryFn: () => apiClient.getAdminStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}
