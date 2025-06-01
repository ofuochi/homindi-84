import type { UserRole, RolePermissions } from "@/lib/types"

export const ROLE_PERMISSIONS: RolePermissions = {
  god: {
    name: "God Admin",
    description: "Full system access with all permissions",
    permissions: [
      "system.manage",
      "users.manage",
      "users.create",
      "users.delete",
      "roles.manage",
      "orders.manage",
      "products.manage",
      "inventory.manage",
      "analytics.view",
      "settings.manage",
      "exports.manage",
      "suppliers.manage",
      "audit.view",
    ],
    color: "purple",
    icon: "crown",
    level: 100,
  },
  admin: {
    name: "Administrator",
    description: "Full business operations access",
    permissions: [
      "users.manage",
      "users.create",
      "orders.manage",
      "products.manage",
      "inventory.manage",
      "analytics.view",
      "settings.manage",
      "exports.view",
      "suppliers.view",
    ],
    color: "red",
    icon: "shield",
    level: 80,
  },
  exporter: {
    name: "Exporter",
    description: "Export operations and logistics management",
    permissions: [
      "orders.view",
      "orders.update",
      "products.view",
      "inventory.view",
      "exports.manage",
      "shipping.manage",
      "analytics.view.limited",
    ],
    color: "blue",
    icon: "truck",
    level: 60,
  },
  supplier: {
    name: "Supplier",
    description: "Product and inventory management",
    permissions: ["products.manage.own", "inventory.manage.own", "orders.view.own", "analytics.view.own"],
    color: "green",
    icon: "shop",
    level: 40,
  },
  moderator: {
    name: "Moderator",
    description: "Content and user moderation",
    permissions: ["users.view", "users.moderate", "products.moderate", "orders.view", "reports.view"],
    color: "orange",
    icon: "flag",
    level: 30,
  },
  user: {
    name: "Customer",
    description: "Standard customer access",
    permissions: ["orders.view.own", "profile.manage", "cart.manage", "wishlist.manage"],
    color: "default",
    icon: "user",
    level: 10,
  },
}

export const hasPermission = (userRole: UserRole, permission: string): boolean => {
  const rolePermissions = ROLE_PERMISSIONS[userRole]?.permissions || []
  return rolePermissions.includes(permission) || rolePermissions.includes("system.manage")
}

export const canAccessAdminPanel = (userRole: UserRole): boolean => {
  return ["god", "admin", "exporter", "supplier", "moderator"].includes(userRole)
}

export const getRoleInfo = (role: UserRole) => {
  return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.user
}

export const canManageRole = (currentUserRole: UserRole, targetRole: UserRole): boolean => {
  const currentLevel = ROLE_PERMISSIONS[currentUserRole]?.level || 0
  const targetLevel = ROLE_PERMISSIONS[targetRole]?.level || 0

  // God can manage all roles
  if (currentUserRole === "god") return true

  // Admin can manage roles below their level (except god)
  if (currentUserRole === "admin" && targetRole !== "god") return true

  // Others cannot manage roles
  return false
}

export const getAvailableRoles = (currentUserRole: UserRole): UserRole[] => {
  if (currentUserRole === "god") {
    return ["god", "admin", "exporter", "supplier", "moderator", "user"]
  }

  if (currentUserRole === "admin") {
    return ["admin", "exporter", "supplier", "moderator", "user"]
  }

  return []
}
