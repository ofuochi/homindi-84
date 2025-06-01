import { z } from "zod"
import type {
  ApiResponse,
  PaginatedResponse,
  Order,
  Product,
  User,
  AdminStats,
  Category,
  InventoryLog,
  UpdateOrderStatusRequest,
  CreateProductRequest,
  UpdateProductRequest,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  StockAdjustmentRequest,
} from "./types"
import {
  OrderSchema,
  ProductSchema,
  UserSchema,
  AdminStatsSchema,
  CategorySchema,
  InventoryLogSchema,
  ApiResponseSchema,
  PaginatedResponseSchema,
} from "./types"

// Mock data
import { mockProducts, mockOrders, mockUser, mockAdminStats } from "@/lib/mockData"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock additional data for admin
const mockUsers: User[] = [
  {
    ...mockUser,
    role: "user" as const,
  },
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@diasporabasket.com",
    phone: "+1-555-0100",
    preferredCountry: "United States",
    createdAt: "2023-01-01T00:00:00Z",
    addresses: [],
    role: "admin" as const,
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0124",
    preferredCountry: "Canada",
    createdAt: "2023-06-15T00:00:00Z",
    addresses: [],
    role: "user" as const,
  },
  {
    id: "user-3",
    name: "David Wilson",
    email: "david@example.com",
    phone: "+44-20-7946-0958",
    preferredCountry: "United Kingdom",
    createdAt: "2023-08-20T00:00:00Z",
    addresses: [],
    role: "user" as const,
  },
]

const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Palm Products",
    description: "Traditional palm-based products from West Africa",
    image: "/placeholder.svg?height=200&width=200",
    isActive: true,
    sortOrder: 1,
    productCount: 15,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "cat-2",
    name: "Spices & Seasonings",
    description: "Authentic African spices and seasonings",
    image: "/placeholder.svg?height=200&width=200",
    isActive: true,
    sortOrder: 2,
    productCount: 22,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "cat-3",
    name: "Dried Fish & Meat",
    description: "Premium dried fish and meat products",
    image: "/placeholder.svg?height=200&width=200",
    isActive: true,
    sortOrder: 3,
    productCount: 18,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "cat-4",
    name: "Grains & Cereals",
    description: "Traditional African grains and cereals",
    image: "/placeholder.svg?height=200&width=200",
    isActive: true,
    sortOrder: 4,
    productCount: 12,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "cat-5",
    name: "Snacks & Sweets",
    description: "Traditional African snacks and sweets",
    image: "/placeholder.svg?height=200&width=200",
    isActive: true,
    sortOrder: 5,
    productCount: 8,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
]

const mockInventoryLogs: InventoryLog[] = [
  {
    id: "log-1",
    productId: "1",
    action: "stock_in",
    quantity: 50,
    previousStock: 25,
    newStock: 75,
    reason: "New shipment received",
    userId: "admin-1",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "log-2",
    productId: "2",
    action: "sale",
    quantity: -3,
    previousStock: 40,
    newStock: 37,
    reason: "Customer purchase",
    userId: "user-1",
    createdAt: "2024-01-15T14:20:00Z",
  },
  {
    id: "log-3",
    productId: "3",
    action: "adjustment",
    quantity: -2,
    previousStock: 15,
    newStock: 13,
    reason: "Damaged items removed",
    userId: "admin-1",
    createdAt: "2024-01-14T16:45:00Z",
  },
]

const mockEnhancedAdminStats: AdminStats = {
  ...mockAdminStats,
  monthlyRevenue: 12450.75,
  weeklyOrders: 23,
  averageOrderValue: 89.5,
  totalProducts: 75,
  lowStockProducts: 8,
  outOfStockProducts: 3,
  topCategories: [
    { name: "Palm Products", sales: 5420, percentage: 35.2 },
    { name: "Spices & Seasonings", sales: 3890, percentage: 25.3 },
    { name: "Dried Fish & Meat", sales: 2340, percentage: 15.2 },
    { name: "Grains & Cereals", sales: 1890, percentage: 12.3 },
    { name: "Snacks & Sweets", sales: 1880, percentage: 12.0 },
  ],
}

class ApiClient {
  private baseUrl = "/api"

  private async request<T>(endpoint: string, options: RequestInit = {}, schema: z.ZodSchema<T>): Promise<T> {
    await delay(Math.random() * 1000 + 500) // Simulate network delay

    try {
      // Mock API responses based on endpoint
      const mockResponse = this.getMockResponse(endpoint, options)
      const validatedResponse = schema.parse(mockResponse)
      return validatedResponse
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`API validation error: ${error.message}`)
      }
      throw error
    }
  }

  private getMockResponse(endpoint: string, options: RequestInit) {
    const method = options.method || "GET"
    const url = new URL(endpoint, "http://localhost")

    // Orders endpoints
    if (endpoint.startsWith("/orders")) {
      if (method === "GET" && endpoint === "/orders") {
        const page = Number.parseInt(url.searchParams.get("page") || "1")
        const limit = Number.parseInt(url.searchParams.get("limit") || "10")
        const status = url.searchParams.get("status")

        let filteredOrders = [...mockOrders]
        if (status && status !== "all") {
          filteredOrders = mockOrders.filter((order) => order.status === status)
        }

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

        return {
          success: true,
          data: {
            items: paginatedOrders,
            total: filteredOrders.length,
            page,
            limit,
            totalPages: Math.ceil(filteredOrders.length / limit),
          },
        }
      }

      if (method === "GET" && endpoint.match(/\/orders\/[^/]+$/)) {
        const orderId = endpoint.split("/").pop()
        const order = mockOrders.find((o) => o.id === orderId)
        return {
          success: !!order,
          data: order,
          error: order ? undefined : "Order not found",
        }
      }

      if (method === "PUT" && endpoint.match(/\/orders\/[^/]+\/status$/)) {
        const orderId = endpoint.split("/")[2]
        const order = mockOrders.find((o) => o.id === orderId)
        return {
          success: !!order,
          data: order,
          message: "Order status updated successfully",
        }
      }
    }

    // Products endpoints
    if (endpoint.startsWith("/products")) {
      if (method === "GET" && endpoint === "/products") {
        const page = Number.parseInt(url.searchParams.get("page") || "1")
        const limit = Number.parseInt(url.searchParams.get("limit") || "10")
        const category = url.searchParams.get("category")
        const search = url.searchParams.get("search")
        const stockStatus = url.searchParams.get("stockStatus")

        let filteredProducts = [...mockProducts]

        if (category && category !== "all") {
          filteredProducts = filteredProducts.filter((product) => product.category === category)
        }

        if (search) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.description.toLowerCase().includes(search.toLowerCase()),
          )
        }

        if (stockStatus) {
          if (stockStatus === "low") {
            filteredProducts = filteredProducts.filter(
              (product) => product.stockQuantity <= 10 && product.stockQuantity > 0,
            )
          } else if (stockStatus === "out") {
            filteredProducts = filteredProducts.filter((product) => product.stockQuantity === 0)
          } else if (stockStatus === "in") {
            filteredProducts = filteredProducts.filter((product) => product.stockQuantity > 10)
          }
        }

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

        return {
          success: true,
          data: {
            items: paginatedProducts,
            total: filteredProducts.length,
            page,
            limit,
            totalPages: Math.ceil(filteredProducts.length / limit),
          },
        }
      }

      if (method === "POST" && endpoint === "/products") {
        const newProduct = {
          id: `product-${Date.now()}`,
          ...JSON.parse(options.body as string),
          inStock: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        return {
          success: true,
          data: newProduct,
          message: "Product created successfully",
        }
      }

      if (method === "PUT" && endpoint.match(/\/products\/[^/]+$/)) {
        const productId = endpoint.split("/").pop()
        const product = mockProducts.find((p) => p.id === productId)
        return {
          success: !!product,
          data: { ...product, ...JSON.parse(options.body as string), updatedAt: new Date().toISOString() },
          message: "Product updated successfully",
        }
      }

      if (method === "DELETE" && endpoint.match(/\/products\/[^/]+$/)) {
        const productId = endpoint.split("/").pop()
        const product = mockProducts.find((p) => p.id === productId)
        return {
          success: !!product,
          data: product,
          message: "Product deleted successfully",
        }
      }
    }

    // Categories endpoints
    if (endpoint.startsWith("/categories")) {
      if (method === "GET" && endpoint === "/categories") {
        const page = Number.parseInt(url.searchParams.get("page") || "1")
        const limit = Number.parseInt(url.searchParams.get("limit") || "10")

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedCategories = mockCategories.slice(startIndex, endIndex)

        return {
          success: true,
          data: {
            items: paginatedCategories,
            total: mockCategories.length,
            page,
            limit,
            totalPages: Math.ceil(mockCategories.length / limit),
          },
        }
      }

      if (method === "POST" && endpoint === "/categories") {
        const newCategory = {
          id: `cat-${Date.now()}`,
          ...JSON.parse(options.body as string),
          productCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        return {
          success: true,
          data: newCategory,
          message: "Category created successfully",
        }
      }

      if (method === "PUT" && endpoint.match(/\/categories\/[^/]+$/)) {
        const categoryId = endpoint.split("/").pop()
        const category = mockCategories.find((c) => c.id === categoryId)
        return {
          success: !!category,
          data: { ...category, ...JSON.parse(options.body as string), updatedAt: new Date().toISOString() },
          message: "Category updated successfully",
        }
      }

      if (method === "DELETE" && endpoint.match(/\/categories\/[^/]+$/)) {
        const categoryId = endpoint.split("/").pop()
        const category = mockCategories.find((c) => c.id === categoryId)
        return {
          success: !!category,
          data: category,
          message: "Category deleted successfully",
        }
      }
    }

    // Inventory endpoints
    if (endpoint.startsWith("/inventory")) {
      if (method === "GET" && endpoint === "/inventory/logs") {
        const page = Number.parseInt(url.searchParams.get("page") || "1")
        const limit = Number.parseInt(url.searchParams.get("limit") || "10")
        const productId = url.searchParams.get("productId")

        let filteredLogs = [...mockInventoryLogs]
        if (productId) {
          filteredLogs = mockInventoryLogs.filter((log) => log.productId === productId)
        }

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedLogs = filteredLogs.slice(startIndex, endIndex)

        return {
          success: true,
          data: {
            items: paginatedLogs,
            total: filteredLogs.length,
            page,
            limit,
            totalPages: Math.ceil(filteredLogs.length / limit),
          },
        }
      }

      if (method === "POST" && endpoint === "/inventory/adjust") {
        const adjustment = JSON.parse(options.body as string)
        const newLog = {
          id: `log-${Date.now()}`,
          ...adjustment,
          previousStock: 50, // Mock previous stock
          newStock: 50 + adjustment.quantity,
          userId: "admin-1",
          createdAt: new Date().toISOString(),
        }
        return {
          success: true,
          data: newLog,
          message: "Stock adjustment completed successfully",
        }
      }
    }

    // Users endpoints
    if (endpoint.startsWith("/users")) {
      if (method === "GET" && endpoint === "/users") {
        const page = Number.parseInt(url.searchParams.get("page") || "1")
        const limit = Number.parseInt(url.searchParams.get("limit") || "10")

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedUsers = mockUsers.slice(startIndex, endIndex)

        return {
          success: true,
          data: {
            items: paginatedUsers,
            total: mockUsers.length,
            page,
            limit,
            totalPages: Math.ceil(mockUsers.length / limit),
          },
        }
      }
    }

    // Admin stats
    if (endpoint === "/admin/stats") {
      return {
        success: true,
        data: mockEnhancedAdminStats,
      }
    }

    // Default error response
    return {
      success: false,
      error: "Endpoint not found",
    }
  }

  // Orders API
  async getOrders(params?: {
    page?: number
    limit?: number
    status?: string
  }): Promise<PaginatedResponse<Order>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.status) searchParams.set("status", params.status)

    const endpoint = `/orders?${searchParams.toString()}`
    return this.request(endpoint, {}, PaginatedResponseSchema(OrderSchema))
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return this.request(`/orders/${id}`, {}, ApiResponseSchema(OrderSchema))
  }

  async updateOrderStatus(id: string, data: UpdateOrderStatusRequest): Promise<ApiResponse<Order>> {
    return this.request(
      `/orders/${id}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(OrderSchema),
    )
  }

  // Products API
  async getProducts(params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    stockStatus?: string
  }): Promise<PaginatedResponse<Product>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.category) searchParams.set("category", params.category)
    if (params?.search) searchParams.set("search", params.search)
    if (params?.stockStatus) searchParams.set("stockStatus", params.stockStatus)

    const endpoint = `/products?${searchParams.toString()}`
    return this.request(endpoint, {}, PaginatedResponseSchema(ProductSchema))
  }

  async createProduct(data: CreateProductRequest): Promise<ApiResponse<Product>> {
    return this.request(
      "/products",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(ProductSchema),
    )
  }

  async updateProduct(id: string, data: UpdateProductRequest): Promise<ApiResponse<Product>> {
    return this.request(
      `/products/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(ProductSchema),
    )
  }

  async deleteProduct(id: string): Promise<ApiResponse<Product>> {
    return this.request(
      `/products/${id}`,
      {
        method: "DELETE",
      },
      ApiResponseSchema(ProductSchema),
    )
  }

  // Categories API
  async getCategories(params?: {
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<Category>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())

    const endpoint = `/categories?${searchParams.toString()}`
    return this.request(endpoint, {}, PaginatedResponseSchema(CategorySchema))
  }

  async createCategory(data: CreateCategoryRequest): Promise<ApiResponse<Category>> {
    return this.request(
      "/categories",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(CategorySchema),
    )
  }

  async updateCategory(id: string, data: UpdateCategoryRequest): Promise<ApiResponse<Category>> {
    return this.request(
      `/categories/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(CategorySchema),
    )
  }

  async deleteCategory(id: string): Promise<ApiResponse<Category>> {
    return this.request(
      `/categories/${id}`,
      {
        method: "DELETE",
      },
      ApiResponseSchema(CategorySchema),
    )
  }

  // Inventory API
  async getInventoryLogs(params?: {
    page?: number
    limit?: number
    productId?: string
  }): Promise<PaginatedResponse<InventoryLog>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.productId) searchParams.set("productId", params.productId)

    const endpoint = `/inventory/logs?${searchParams.toString()}`
    return this.request(endpoint, {}, PaginatedResponseSchema(InventoryLogSchema))
  }

  async adjustStock(data: StockAdjustmentRequest): Promise<ApiResponse<InventoryLog>> {
    return this.request(
      "/inventory/adjust",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(InventoryLogSchema),
    )
  }

  // Users API
  async getUsers(params?: {
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<User>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())

    const endpoint = `/users?${searchParams.toString()}`
    return this.request(endpoint, {}, PaginatedResponseSchema(UserSchema))
  }

  // Admin API
  async getAdminStats(): Promise<ApiResponse<AdminStats>> {
    return this.request("/admin/stats", {}, ApiResponseSchema(AdminStatsSchema))
  }
}

export const apiClient = new ApiClient()
