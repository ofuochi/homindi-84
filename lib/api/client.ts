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

import type { AxiosRequestConfig } from "axios";
import axiosInstance from "./axios";

class ApiClient {
  private async request<T>(
    config: AxiosRequestConfig,
    schema: z.ZodSchema<T>,
  ): Promise<T> {
    try {
      const response = await axiosInstance.request(config);
      return schema.parse(response.data);
    } catch (error: any) {
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
    return this.request(
      { url: "/orders", method: "GET", params },
      PaginatedResponseSchema(OrderSchema),
    );
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return this.request(
      { url: `/orders/${id}`, method: "GET" },
      ApiResponseSchema(OrderSchema),
    );
  }

  async updateOrderStatus(
    id: string,
    data: UpdateOrderStatusRequest,
  ): Promise<ApiResponse<Order>> {
    return this.request(
      { url: `/orders/${id}/status`, method: "PUT", data },
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
    return this.request(
      { url: "/products", method: "GET", params },
      PaginatedResponseSchema(ProductSchema),
    );
  }

  async createProduct(
    data: CreateProductRequest,
  ): Promise<ApiResponse<Product>> {
    return this.request(
      { url: "/products", method: "POST", data },
      ApiResponseSchema(ProductSchema),
    );
  }

  async updateProduct(
    id: string,
    data: UpdateProductRequest,
  ): Promise<ApiResponse<Product>> {
    return this.request(
      { url: `/products/${id}`, method: "PUT", data },
      ApiResponseSchema(ProductSchema),
    );
  }

  async deleteProduct(id: string): Promise<ApiResponse<Product>> {
    return this.request(
      { url: `/products/${id}`, method: "DELETE" },
      ApiResponseSchema(ProductSchema),
    );
  }

  // Categories API
  async getCategories(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Category>> {
    return this.request(
      { url: "/categories", method: "GET", params },
      PaginatedResponseSchema(CategorySchema),
    );
  }

  async createCategory(
    data: CreateCategoryRequest,
  ): Promise<ApiResponse<Category>> {
    return this.request(
      { url: "/categories", method: "POST", data },
      ApiResponseSchema(CategorySchema),
    );
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryRequest,
  ): Promise<ApiResponse<Category>> {
    return this.request(
      { url: `/categories/${id}`, method: "PUT", data },
      ApiResponseSchema(CategorySchema),
    );
  }

  async deleteCategory(id: string): Promise<ApiResponse<Category>> {
    return this.request(
      { url: `/categories/${id}`, method: "DELETE" },
      ApiResponseSchema(CategorySchema),
    );
  }

  // Inventory API
  async getInventoryLogs(params?: {
    page?: number;
    limit?: number;
    productId?: string;
  }): Promise<PaginatedResponse<InventoryLog>> {
    return this.request(
      { url: "/inventory/logs", method: "GET", params },
      PaginatedResponseSchema(InventoryLogSchema),
    );
  }

  async adjustStock(
    data: StockAdjustmentRequest,
  ): Promise<ApiResponse<InventoryLog>> {
    return this.request(
      { url: "/inventory/adjust", method: "POST", data },
      ApiResponseSchema(InventoryLogSchema),
    );
  }

  // Users API
  async getUsers(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<User>> {
    return this.request(
      { url: "/users", method: "GET", params },
      PaginatedResponseSchema(UserSchema),
    );
  }

  // Admin API
  async getAdminStats(): Promise<ApiResponse<AdminStats>> {
    return this.request(
      { url: "/admin/stats", method: "GET" },
      ApiResponseSchema(AdminStatsSchema),
    );
  }
}

export const apiClient = new ApiClient();
