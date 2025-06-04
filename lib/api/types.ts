import { z } from "zod"
import {  userRoles } from "@/lib/types"

// Base schemas
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  unit: z.string(),
  category: z.string(),
  image: z.string(),
  inStock: z.boolean(),
  stockQuantity: z.number(),
  origin: z.string(),
  weight: z.string().optional(),
  sku: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  discount: z.number().optional(),
  minOrderQuantity: z.number().default(1),
  maxOrderQuantity: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
  productCount: z.number().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const InventoryLogSchema = z.object({
  id: z.string(),
  productId: z.string(),
  action: z.enum(["stock_in", "stock_out", "adjustment", "sale", "return"]),
  quantity: z.number(),
  previousStock: z.number(),
  newStock: z.number(),
  reason: z.string().optional(),
  userId: z.string(),
  createdAt: z.string(),
})

export const ShippingAddressSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  country: z.string(),
  city: z.string(),
  streetAddress: z.string(),
  postalCode: z.string(),
  deliveryNotes: z.string().optional(),
})

export const CartItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number(),
})

export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(CartItemSchema),
  total: z.number(),
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
  createdAt: z.string(),
  shippingAddress: ShippingAddressSchema,
  trackingNumber: z.string().optional(),
})

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  addresses: z.array(ShippingAddressSchema),
  preferredCountry: z.string(),
  createdAt: z.string(),
  avatar: z.string().optional(),
  dateOfBirth: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  role: z.enum(userRoles).default("user"),
  isActive: z.boolean().default(true),
  emailVerified: z.boolean().default(false),
  phoneVerified: z.boolean().default(false),
  lastLoginAt: z.string().optional(),
})

export const AdminStatsSchema = z.object({
  totalRevenue: z.number(),
  totalOrders: z.number(),
  bestSellingProduct: z.string(),
  activeCustomers: z.number(),
  monthlyRevenue: z.number(),
  weeklyOrders: z.number(),
  averageOrderValue: z.number(),
  totalProducts: z.number(),
  lowStockProducts: z.number(),
  outOfStockProducts: z.number(),
  topCategories: z.array(
    z.object({
      name: z.string(),
      sales: z.number(),
      percentage: z.number(),
    }),
  ),
})

// API Response schemas
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string().optional(),
    error: z.string().optional(),
  })

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.boolean(),
    data: z.object({
      items: z.array(itemSchema),
      total: z.number(),
      page: z.number(),
      limit: z.number(),
      totalPages: z.number(),
    }),
    message: z.string().optional(),
  })

// Request schemas
export const CreateOrderRequestSchema = z.object({
  items: z.array(CartItemSchema),
  shippingAddress: ShippingAddressSchema,
  total: z.number(),
})

export const UpdateOrderStatusRequestSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
  trackingNumber: z.string().optional(),
})

export const CreateProductRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  unit: z.string(),
  category: z.string(),
  image: z.string(),
  stockQuantity: z.number().nonnegative(),
  origin: z.string(),
  weight: z.string().optional(),
  sku: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  discount: z.number().optional(),
  minOrderQuantity: z.number().default(1),
  maxOrderQuantity: z.number().optional(),
})

export const UpdateProductRequestSchema = CreateProductRequestSchema.partial()

export const CreateCategoryRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
})

export const UpdateCategoryRequestSchema = CreateCategoryRequestSchema.partial()

export const StockAdjustmentRequestSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  action: z.enum(["stock_in", "stock_out", "adjustment"]),
  reason: z.string().optional(),
})

// Type exports
export type Product = z.infer<typeof ProductSchema>
export type Category = z.infer<typeof CategorySchema>
export type InventoryLog = z.infer<typeof InventoryLogSchema>
export type Order = z.infer<typeof OrderSchema>
export type User = z.infer<typeof UserSchema>
export type AdminStats = z.infer<typeof AdminStatsSchema>
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>
export type UpdateOrderStatusRequest = z.infer<typeof UpdateOrderStatusRequestSchema>
export type CreateProductRequest = z.infer<typeof CreateProductRequestSchema>
export type UpdateProductRequest = z.infer<typeof UpdateProductRequestSchema>
export type CreateCategoryRequest = z.infer<typeof CreateCategoryRequestSchema>
export type UpdateCategoryRequest = z.infer<typeof UpdateCategoryRequestSchema>
export type StockAdjustmentRequest = z.infer<typeof StockAdjustmentRequestSchema>

export type ApiResponse<T> = {
  success: boolean
  data: T
  message?: string
  error?: string
}

export type PaginatedResponse<T> = {
  success: boolean
  data: {
    items: T[]
    total: number
    page: number
    limit: number
    totalPages: number
  }
  message?: string
}
