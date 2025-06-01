"use client"

import { Menu, Tooltip, Badge } from "antd"
import {
  DashboardOutlined,
  ShoppingOutlined,
  InboxOutlined,
  UserOutlined,
  BarChartOutlined,
  SettingOutlined,
  TagOutlined,
  TruckOutlined,
  AppstoreOutlined,
  HistoryOutlined,
  CrownOutlined,
  FlagOutlined,
  ShopOutlined,
  AuditOutlined,
  BellOutlined,
  FileTextOutlined,
  TeamOutlined,
  SafetyOutlined,
  ExportOutlined,
  ImportOutlined,
  AlertOutlined,
  ScanOutlined,
  LineChartOutlined,
  DatabaseOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"

interface AdminSidebarProps {
  collapsed?: boolean
}

export default function AdminSidebar({ collapsed = false }: AdminSidebarProps) {
  const pathname = usePathname()
  const { user, userRole, roleInfo, hasPermission } = useClerkAuth()

  const roleIcons = {
    god: CrownOutlined,
    admin: SafetyOutlined,
    exporter: TruckOutlined,
    supplier: ShopOutlined,
    moderator: FlagOutlined,
    user: UserOutlined,
  }
  const RoleIcon = roleIcons[userRole] || UserOutlined

  const getMenuItems = () => {
    const items = []

    // Dashboard
    items.push({
      key: "/admin",
      icon: <DashboardOutlined />,
      label: collapsed ? null : <Link href="/admin">Dashboard</Link>,
      title: "Dashboard",
    })

    // Inventory Management Section
    if (hasPermission("inventory.manage") || hasPermission("inventory.view")) {
      items.push({ type: "divider" })

      if (!collapsed) {
        items.push({
          key: "inventory-group",
          label: "Inventory Management",
          type: "group",
        })
      }

      const inventoryItems = [
        {
          key: "/admin/inventory",
          icon: <InboxOutlined />,
          label: collapsed ? null : <Link href="/admin/inventory">Overview</Link>,
          title: "Inventory Overview",
          show: hasPermission("inventory.view") || hasPermission("inventory.manage"),
        },
        {
          key: "/admin/products",
          icon: <AppstoreOutlined />,
          label: collapsed ? null : <Link href="/admin/products">Products</Link>,
          title: "Products",
          show: hasPermission("products.manage") || hasPermission("products.view"),
        },
        {
          key: "/admin/categories",
          icon: <TagOutlined />,
          label: collapsed ? null : <Link href="/admin/categories">Categories</Link>,
          title: "Categories",
          show: hasPermission("products.manage"),
        },
        {
          key: "/admin/inventory/alerts",
          icon: <AlertOutlined />,
          label: collapsed ? null : (
            <Link href="/admin/inventory/alerts">
              <span className="flex items-center justify-between w-full">
                Low Stock Alerts
                <Badge count={5} size="small" />
              </span>
            </Link>
          ),
          title: "Low Stock Alerts",
          show: hasPermission("inventory.view") || hasPermission("inventory.manage"),
        },
        {
          key: "/admin/inventory/scanner",
          icon: <ScanOutlined />,
          label: collapsed ? null : <Link href="/admin/inventory/scanner">Barcode Scanner</Link>,
          title: "Barcode Scanner",
          show: hasPermission("inventory.manage"),
        },
        {
          key: "/admin/inventory/logs",
          icon: <HistoryOutlined />,
          label: collapsed ? null : <Link href="/admin/inventory/logs">Stock History</Link>,
          title: "Stock History",
          show: hasPermission("inventory.view") || hasPermission("inventory.manage"),
        },
      ]

      items.push(...inventoryItems.filter((item) => item.show !== false))
    }

    // Order Management Section
    if (hasPermission("orders.manage") || hasPermission("orders.view")) {
      items.push({ type: "divider" })

      if (!collapsed) {
        items.push({
          key: "orders-group",
          label: "Order Management",
          type: "group",
        })
      }

      const orderItems = [
        {
          key: "/admin/orders",
          icon: <ShoppingOutlined />,
          label: collapsed ? null : <Link href="/admin/orders">All Orders</Link>,
          title: "All Orders",
          show: hasPermission("orders.view") || hasPermission("orders.manage"),
        },
        {
          key: "/admin/orders/pending",
          icon: <TruckOutlined />,
          label: collapsed ? null : (
            <Link href="/admin/orders?status=pending">
              <span className="flex items-center justify-between w-full">
                Pending Orders
                <Badge count={12} size="small" />
              </span>
            </Link>
          ),
          title: "Pending Orders",
          show: hasPermission("orders.view") || hasPermission("orders.manage"),
        },
        {
          key: "/admin/exports",
          icon: <ExportOutlined />,
          label: collapsed ? null : <Link href="/admin/exports">Export Management</Link>,
          title: "Export Management",
          show: hasPermission("exports.manage") || userRole === "exporter",
        },
        {
          key: "/admin/imports",
          icon: <ImportOutlined />,
          label: collapsed ? null : <Link href="/admin/imports">Bulk Import</Link>,
          title: "Bulk Import",
          show: hasPermission("imports.manage"),
        },
      ]

      items.push(...orderItems.filter((item) => item.show !== false))
    }

    // User Management Section
    if (hasPermission("users.manage") || hasPermission("users.view")) {
      items.push({ type: "divider" })

      if (!collapsed) {
        items.push({
          key: "users-group",
          label: "User Management",
          type: "group",
        })
      }

      const userItems = [
        {
          key: "/admin/users",
          icon: <UserOutlined />,
          label: collapsed ? null : <Link href="/admin/users">All Users</Link>,
          title: "All Users",
          show: hasPermission("users.view") || hasPermission("users.manage"),
        },
        {
          key: "/admin/users/roles",
          icon: <TeamOutlined />,
          label: collapsed ? null : <Link href="/admin/users/roles">Role Management</Link>,
          title: "Role Management",
          show: hasPermission("roles.manage"),
        },
        {
          key: "/admin/users/permissions",
          icon: <SafetyOutlined />,
          label: collapsed ? null : <Link href="/admin/users/permissions">Permissions</Link>,
          title: "Permissions",
          show: hasPermission("roles.manage"),
        },
      ]

      items.push(...userItems.filter((item) => item.show !== false))
    }

    // Analytics & Reports Section
    if (hasPermission("analytics.view") || hasPermission("analytics.view.limited")) {
      items.push({ type: "divider" })

      if (!collapsed) {
        items.push({
          key: "analytics-group",
          label: "Analytics & Reports",
          type: "group",
        })
      }

      const analyticsItems = [
        {
          key: "/admin/analytics",
          icon: <BarChartOutlined />,
          label: collapsed ? null : <Link href="/admin/analytics">Dashboard Analytics</Link>,
          title: "Dashboard Analytics",
          show: hasPermission("analytics.view") || hasPermission("analytics.view.limited"),
        },
        {
          key: "/admin/analytics/sales",
          icon: <LineChartOutlined />,
          label: collapsed ? null : <Link href="/admin/analytics/sales">Sales Reports</Link>,
          title: "Sales Reports",
          show: hasPermission("analytics.view"),
        },
        {
          key: "/admin/reports",
          icon: <FileTextOutlined />,
          label: collapsed ? null : <Link href="/admin/reports">Custom Reports</Link>,
          title: "Custom Reports",
          show: hasPermission("reports.generate"),
        },
      ]

      items.push(...analyticsItems.filter((item) => item.show !== false))
    }

    // System Management Section (God and Admin only)
    if (hasPermission("system.manage") || hasPermission("audit.view")) {
      items.push({ type: "divider" })

      if (!collapsed) {
        items.push({
          key: "system-group",
          label: "System Management",
          type: "group",
        })
      }

      const systemItems = [
        {
          key: "/admin/audit",
          icon: <AuditOutlined />,
          label: collapsed ? null : <Link href="/admin/audit">Audit Logs</Link>,
          title: "Audit Logs",
          show: hasPermission("audit.view"),
        },
        {
          key: "/admin/notifications",
          icon: <BellOutlined />,
          label: collapsed ? null : <Link href="/admin/notifications">Notifications</Link>,
          title: "Notification Center",
          show: hasPermission("notifications.manage"),
        },
        {
          key: "/admin/database",
          icon: <DatabaseOutlined />,
          label: collapsed ? null : <Link href="/admin/database">Database Tools</Link>,
          title: "Database Tools",
          show: hasPermission("system.manage"),
        },
        {
          key: "/admin/settings",
          icon: <SettingOutlined />,
          label: collapsed ? null : <Link href="/admin/settings">System Settings</Link>,
          title: "System Settings",
          show: hasPermission("settings.manage"),
        },
      ]

      items.push(...systemItems.filter((item) => item.show !== false))
    }

    return items
  }

  const renderMenuItem = (item: any) => {
    if (collapsed && item.title && !item.type) {
      return {
        ...item,
        label: (
          <Tooltip title={item.title} placement="right">
            <Link href={item.key}>{item.title}</Link>
          </Tooltip>
        ),
      }
    }
    return item
  }

  const processedItems = getMenuItems().map(renderMenuItem)

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Sidebar Header */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#0B8457] to-[#0a7249]">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg mx-auto mb-3">
              <RoleIcon className="text-white text-xl" />
            </div>
            <span className="font-bold text-white font-poppins text-lg block">Admin Panel</span>
            <p className="text-xs text-white/80 font-inter mt-1">{roleInfo?.name}</p>
            <div className="mt-2 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-xs text-white font-inter font-medium">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="p-3 border-b border-gray-200 flex justify-center bg-gradient-to-r from-[#0B8457] to-[#0a7249]">
          <Tooltip title={`${roleInfo?.name} - ${user?.firstName} ${user?.lastName}`} placement="right">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
              <RoleIcon className="text-white text-sm" />
            </div>
          </Tooltip>
        </div>
      )}

      {/* Menu Items */}
      <div className="flex-1 overflow-auto py-2">
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={processedItems}
          className="border-0 bg-transparent"
          style={{
            backgroundColor: "transparent",
            border: "none",
          }}
          inlineCollapsed={collapsed}
        />
      </div>

      {/* Sidebar Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-500 font-inter">DiasporaBasket Admin v2.0</p>
            <p className="text-xs text-gray-400 font-inter mt-1">© 2024 All rights reserved</p>
          </div>
        </div>
      )}
    </div>
  )
}
