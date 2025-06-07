export interface Product {
  id: string
  name: string
  description: string
  price: number
  unit: string
  category: string
  image: string
  inStock: boolean
  stockQuantity: number
  origin: string
  weight?: string
  sku?: string
  tags?: string[]
  isFeatured?: boolean
  discount?: number
  minOrderQuantity?: number
  maxOrderQuantity?: number
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  shippingAddress: ShippingAddress
  trackingNumber?: string
}

export interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  country: string
  city: string
  streetAddress: string
  postalCode: string
  deliveryNotes?: string
}

export const userRoles = ["god", "admin", "exporter", "supplier", "moderator", "user"] as const
export type UserRole = typeof userRoles[number]

export interface ClerkUserMetadata {
  role: UserRole
  permissions?: string[]
  isActive?: boolean
  department?: string
  employeeId?: string
  lastRoleChange?: string
  assignedBy?: string
}

export interface ExtendedUser {
  id: string
  firstName: string | null
  lastName: string | null
  emailAddresses: Array<{
    emailAddress: string
    id: string
  }>
  phoneNumbers: Array<{
    phoneNumber: string
    id: string
  }>
  imageUrl: string
  createdAt: number
  lastSignInAt: number | null
  publicMetadata: ClerkUserMetadata
  privateMetadata: Record<string, any>
  unsafeMetadata: Record<string, any>
}

export interface AdminStats {
  totalRevenue: number
  totalOrders: number
  bestSellingProduct: string
  activeCustomers: number
  averageOrderValue?: number
  monthlyRevenue?: number
  weeklyOrders?: number
  totalProducts?: number
  lowStockProducts?: number
  outOfStockProducts?: number
  topCategories?: Array<{
    name: string
    sales: number
    percentage: number
  }>
}

export interface RolePermissions {
  [key: string]: {
    name: string
    description: string
    permissions: string[]
    color: string
    icon: string
    level: number
  }
}

export interface AuditLog {
  id: string
  userId: string
  userEmail: string
  action: string
  resource: string
  details: Record<string, any>
  timestamp: string
  ipAddress?: string
  userAgent?: string
}
