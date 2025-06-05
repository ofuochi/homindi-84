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

import { delay } from "../utils";

class ApiClient {
  private baseUrl = "/api";

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    schema: z.ZodSchema<T>,
  ): Promise<T> {
    await delay(Math.random() * 1000 + 500); // Simulate network delay

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, options);
      const json = await response.json();
      return schema.parse(json);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`API validation error: ${error.message}`);
      }
      throw error;
    }
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
