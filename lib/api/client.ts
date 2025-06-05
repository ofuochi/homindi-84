import { z } from "zod";
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
} from "./types";
import {
  OrderSchema,
  ProductSchema,
  UserSchema,
  AdminStatsSchema,
  CategorySchema,
  InventoryLogSchema,
  ApiResponseSchema,
  PaginatedResponseSchema,
} from "./types";

// Mock data
import {
  generateMockProducts,
  generateMockOrders,
  generateMockUser,
  generateMockAdminStats,
  generateMockCategories,
  generateMockInventoryLogs,
} from "@/lib/mockData";
import { faker } from "@faker-js/faker";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockProducts = generateMockProducts(20);
const mockOrders = generateMockOrders(mockProducts, "user-1", 10);
const mockUser = generateMockUser("user-1");
const mockAdminStats = generateMockAdminStats();
const mockUsers: User[] = [
  { ...mockUser, role: "user" as const },
  { ...generateMockUser("admin-1"), role: "admin" as const },
  generateMockUser("user-2"),
  generateMockUser("user-3"),
];
const mockCategories = generateMockCategories(5);
const mockInventoryLogs = generateMockInventoryLogs(mockProducts, 10);
const mockEnhancedAdminStats: AdminStats = {
  ...mockAdminStats,
  monthlyRevenue: parseFloat(faker.finance.amount({ min: 10000, max: 50000 })),
  weeklyOrders: faker.number.int({ min: 10, max: 40 }),
  averageOrderValue: parseFloat(faker.finance.amount({ min: 20, max: 200 })),
  totalProducts: mockProducts.length,
  lowStockProducts: mockProducts.filter(
    (p) => p.stockQuantity <= 10 && p.stockQuantity > 0,
  ).length,
  outOfStockProducts: mockProducts.filter((p) => p.stockQuantity === 0).length,
  topCategories: mockCategories.map((c) => ({
    name: c.name,
    sales: faker.number.int({ min: 1000, max: 10000 }),
    percentage: parseFloat(
      faker.number.float({ min: 5, max: 40, precision: 0.1 }).toFixed(1),
    ),
  })),
};

class ApiClient {
  private baseUrl = "/api";

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    schema: z.ZodSchema<T>,
  ): Promise<T> {
    await delay(Math.random() * 1000 + 500); // Simulate network delay

    try {
      // Mock API responses based on endpoint
      const mockResponse = this.getMockResponse(endpoint, options);
      const validatedResponse = schema.parse(mockResponse);
      return validatedResponse;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`API validation error: ${error.message}`);
      }
      throw error;
    }
  }

  private getMockResponse(endpoint: string, options: RequestInit) {
    const method = options.method || "GET";
    const url = new URL(endpoint, "http://localhost");

    // Orders endpoints
    if (endpoint.startsWith("/orders")) {
      if (method === "GET" && endpoint === "/orders") {
        const page = Number.parseInt(url.searchParams.get("page") || "1");
        const limit = Number.parseInt(url.searchParams.get("limit") || "10");
        const status = url.searchParams.get("status");

        let filteredOrders = [...mockOrders];
        if (status && status !== "all") {
          filteredOrders = mockOrders.filter(
            (order) => order.status === status,
          );
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

        return {
          success: true,
          data: {
            items: paginatedOrders,
            total: filteredOrders.length,
            page,
            limit,
            totalPages: Math.ceil(filteredOrders.length / limit),
          },
        };
      }

      if (method === "GET" && endpoint.match(/\/orders\/[^/]+$/)) {
        const orderId = endpoint.split("/").pop();
        const order = mockOrders.find((o) => o.id === orderId);
        return {
          success: !!order,
          data: order,
          error: order ? undefined : "Order not found",
        };
      }

      if (method === "PUT" && endpoint.match(/\/orders\/[^/]+\/status$/)) {
        const orderId = endpoint.split("/")[2];
        const order = mockOrders.find((o) => o.id === orderId);
        return {
          success: !!order,
          data: order,
          message: "Order status updated successfully",
        };
      }
    }

    // Products endpoints
    if (endpoint.startsWith("/products")) {
      if (method === "GET" && endpoint === "/products") {
        const page = Number.parseInt(url.searchParams.get("page") || "1");
        const limit = Number.parseInt(url.searchParams.get("limit") || "10");
        const category = url.searchParams.get("category");
        const search = url.searchParams.get("search");
        const stockStatus = url.searchParams.get("stockStatus");

        let filteredProducts = [...mockProducts];

        if (category && category !== "all") {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === category,
          );
        }

        if (search) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.description.toLowerCase().includes(search.toLowerCase()),
          );
        }

        if (stockStatus) {
          if (stockStatus === "low") {
            filteredProducts = filteredProducts.filter(
              (product) =>
                product.stockQuantity <= 10 && product.stockQuantity > 0,
            );
          } else if (stockStatus === "out") {
            filteredProducts = filteredProducts.filter(
              (product) => product.stockQuantity === 0,
            );
          } else if (stockStatus === "in") {
            filteredProducts = filteredProducts.filter(
              (product) => product.stockQuantity > 10,
            );
          }
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        return {
          success: true,
          data: {
            items: paginatedProducts,
            total: filteredProducts.length,
            page,
            limit,
            totalPages: Math.ceil(filteredProducts.length / limit),
          },
        };
      }

      if (method === "POST" && endpoint === "/products") {
        const newProduct = {
          id: `product-${Date.now()}`,
          ...JSON.parse(options.body as string),
          inStock: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return {
          success: true,
          data: newProduct,
          message: "Product created successfully",
        };
      }

      if (method === "PUT" && endpoint.match(/\/products\/[^/]+$/)) {
        const productId = endpoint.split("/").pop();
        const product = mockProducts.find((p) => p.id === productId);
        return {
          success: !!product,
          data: {
            ...product,
            ...JSON.parse(options.body as string),
            updatedAt: new Date().toISOString(),
          },
          message: "Product updated successfully",
        };
      }

      if (method === "DELETE" && endpoint.match(/\/products\/[^/]+$/)) {
        const productId = endpoint.split("/").pop();
        const product = mockProducts.find((p) => p.id === productId);
        return {
          success: !!product,
          data: product,
          message: "Product deleted successfully",
        };
      }
    }

    // Categories endpoints
    if (endpoint.startsWith("/categories")) {
      if (method === "GET" && endpoint === "/categories") {
        const page = Number.parseInt(url.searchParams.get("page") || "1");
        const limit = Number.parseInt(url.searchParams.get("limit") || "10");

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedCategories = mockCategories.slice(startIndex, endIndex);

        return {
          success: true,
          data: {
            items: paginatedCategories,
            total: mockCategories.length,
            page,
            limit,
            totalPages: Math.ceil(mockCategories.length / limit),
          },
        };
      }

      if (method === "POST" && endpoint === "/categories") {
        const newCategory = {
          id: `cat-${Date.now()}`,
          ...JSON.parse(options.body as string),
          productCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return {
          success: true,
          data: newCategory,
          message: "Category created successfully",
        };
      }

      if (method === "PUT" && endpoint.match(/\/categories\/[^/]+$/)) {
        const categoryId = endpoint.split("/").pop();
        const category = mockCategories.find((c) => c.id === categoryId);
        return {
          success: !!category,
          data: {
            ...category,
            ...JSON.parse(options.body as string),
            updatedAt: new Date().toISOString(),
          },
          message: "Category updated successfully",
        };
      }

      if (method === "DELETE" && endpoint.match(/\/categories\/[^/]+$/)) {
        const categoryId = endpoint.split("/").pop();
        const category = mockCategories.find((c) => c.id === categoryId);
        return {
          success: !!category,
          data: category,
          message: "Category deleted successfully",
        };
      }
    }

    // Inventory endpoints
    if (endpoint.startsWith("/inventory")) {
      if (method === "GET" && endpoint === "/inventory/logs") {
        const page = Number.parseInt(url.searchParams.get("page") || "1");
        const limit = Number.parseInt(url.searchParams.get("limit") || "10");
        const productId = url.searchParams.get("productId");

        let filteredLogs = [...mockInventoryLogs];
        if (productId) {
          filteredLogs = mockInventoryLogs.filter(
            (log) => log.productId === productId,
          );
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

        return {
          success: true,
          data: {
            items: paginatedLogs,
            total: filteredLogs.length,
            page,
            limit,
            totalPages: Math.ceil(filteredLogs.length / limit),
          },
        };
      }

      if (method === "POST" && endpoint === "/inventory/adjust") {
        const adjustment = JSON.parse(options.body as string);
        const newLog = {
          id: `log-${Date.now()}`,
          ...adjustment,
          previousStock: 50, // Mock previous stock
          newStock: 50 + adjustment.quantity,
          userId: "admin-1",
          createdAt: new Date().toISOString(),
        };
        return {
          success: true,
          data: newLog,
          message: "Stock adjustment completed successfully",
        };
      }
    }

    // Users endpoints
    if (endpoint.startsWith("/users")) {
      if (method === "GET" && endpoint === "/users") {
        const page = Number.parseInt(url.searchParams.get("page") || "1");
        const limit = Number.parseInt(url.searchParams.get("limit") || "10");

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedUsers = mockUsers.slice(startIndex, endIndex);

        return {
          success: true,
          data: {
            items: paginatedUsers,
            total: mockUsers.length,
            page,
            limit,
            totalPages: Math.ceil(mockUsers.length / limit),
          },
        };
      }
    }

    // Admin stats
    if (endpoint === "/admin/stats") {
      return {
        success: true,
        data: mockEnhancedAdminStats,
      };
    }

    // Default error response
    return {
      success: false,
      error: "Endpoint not found",
    };
  }

  // Orders API
  async getOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Order>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.status) searchParams.set("status", params.status);

    const endpoint = `/orders?${searchParams.toString()}`;
    return this.request(endpoint, {}, PaginatedResponseSchema(OrderSchema));
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return this.request(`/orders/${id}`, {}, ApiResponseSchema(OrderSchema));
  }

  async updateOrderStatus(
    id: string,
    data: UpdateOrderStatusRequest,
  ): Promise<ApiResponse<Order>> {
    return this.request(
      `/orders/${id}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(OrderSchema),
    );
  }

  // Products API
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    stockStatus?: string;
  }): Promise<PaginatedResponse<Product>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.category) searchParams.set("category", params.category);
    if (params?.search) searchParams.set("search", params.search);
    if (params?.stockStatus)
      searchParams.set("stockStatus", params.stockStatus);

    const endpoint = `/products?${searchParams.toString()}`;
    return this.request(endpoint, {}, PaginatedResponseSchema(ProductSchema));
  }

  async createProduct(
    data: CreateProductRequest,
  ): Promise<ApiResponse<Product>> {
    return this.request(
      "/products",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(ProductSchema),
    );
  }

  async updateProduct(
    id: string,
    data: UpdateProductRequest,
  ): Promise<ApiResponse<Product>> {
    return this.request(
      `/products/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(ProductSchema),
    );
  }

  async deleteProduct(id: string): Promise<ApiResponse<Product>> {
    return this.request(
      `/products/${id}`,
      {
        method: "DELETE",
      },
      ApiResponseSchema(ProductSchema),
    );
  }

  // Categories API
  async getCategories(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Category>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());

    const endpoint = `/categories?${searchParams.toString()}`;
    return this.request(endpoint, {}, PaginatedResponseSchema(CategorySchema));
  }

  async createCategory(
    data: CreateCategoryRequest,
  ): Promise<ApiResponse<Category>> {
    return this.request(
      "/categories",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(CategorySchema),
    );
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryRequest,
  ): Promise<ApiResponse<Category>> {
    return this.request(
      `/categories/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(CategorySchema),
    );
  }

  async deleteCategory(id: string): Promise<ApiResponse<Category>> {
    return this.request(
      `/categories/${id}`,
      {
        method: "DELETE",
      },
      ApiResponseSchema(CategorySchema),
    );
  }

  // Inventory API
  async getInventoryLogs(params?: {
    page?: number;
    limit?: number;
    productId?: string;
  }): Promise<PaginatedResponse<InventoryLog>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.productId) searchParams.set("productId", params.productId);

    const endpoint = `/inventory/logs?${searchParams.toString()}`;
    return this.request(
      endpoint,
      {},
      PaginatedResponseSchema(InventoryLogSchema),
    );
  }

  async adjustStock(
    data: StockAdjustmentRequest,
  ): Promise<ApiResponse<InventoryLog>> {
    return this.request(
      "/inventory/adjust",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      ApiResponseSchema(InventoryLogSchema),
    );
  }

  // Users API
  async getUsers(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<User>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());

    const endpoint = `/users?${searchParams.toString()}`;
    return this.request(endpoint, {}, PaginatedResponseSchema(UserSchema));
  }

  // Admin API
  async getAdminStats(): Promise<ApiResponse<AdminStats>> {
    return this.request(
      "/admin/stats",
      {},
      ApiResponseSchema(AdminStatsSchema),
    );
  }
}

export const apiClient = new ApiClient();
