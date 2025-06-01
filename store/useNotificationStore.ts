import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export interface Notification {
  id: string
  type: "order_status" | "order_shipped" | "order_delivered" | "order_cancelled" | "promotion" | "system"
  title: string
  message: string
  orderId?: string
  isRead: boolean
  createdAt: string
  priority: "low" | "medium" | "high"
  actionUrl?: string
  actionText?: string
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  isPolling: boolean
  lastPolled: string | null
  settings: {
    enablePush: boolean
    enableEmail: boolean
    enableOrderUpdates: boolean
    enablePromotions: boolean
    enableSystem: boolean
    pollingInterval: number
  }

  // Actions
  addNotification: (notification: Omit<Notification, "id" | "createdAt">) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  deleteNotification: (notificationId: string) => void
  clearAllNotifications: () => void
  startPolling: () => void
  stopPolling: () => void
  updateSettings: (settings: Partial<NotificationState["settings"]>) => void
  fetchNotifications: () => Promise<void>
}

// Mock notification data for simulation
const mockNotifications: Omit<Notification, "id" | "createdAt">[] = [
  {
    type: "order_status",
    title: "Order Status Updated",
    message: "Your order #ORD-001 is now being processed",
    orderId: "ORD-001",
    isRead: false,
    priority: "medium",
    actionUrl: "/dashboard/orders",
    actionText: "View Order",
  },
  {
    type: "order_shipped",
    title: "Order Shipped",
    message: "Your order #ORD-002 has been shipped and is on its way!",
    orderId: "ORD-002",
    isRead: false,
    priority: "high",
    actionUrl: "/dashboard/orders",
    actionText: "Track Package",
  },
  {
    type: "promotion",
    title: "Special Offer",
    message: "Get 20% off on all palm oil products this week!",
    isRead: false,
    priority: "low",
    actionUrl: "/products?category=Palm Products",
    actionText: "Shop Now",
  },
]

let pollingInterval: NodeJS.Timeout | null = null

export const useNotificationStore = create<NotificationState>()(
  persist(
    immer((set, get) => ({
      notifications: [],
      unreadCount: 0,
      isPolling: false,
      lastPolled: null,
      settings: {
        enablePush: true,
        enableEmail: true,
        enableOrderUpdates: true,
        enablePromotions: true,
        enableSystem: true,
        pollingInterval: 30000, // 30 seconds
      },

      addNotification: (notificationData) => {
        const notification: Notification = {
          ...notificationData,
          id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        }

        set((state) => {
          state.notifications.unshift(notification)
          if (!notification.isRead) {
            state.unreadCount += 1
          }
        })

        // Show browser notification if enabled
        const { settings } = get()
        if (settings.enablePush && "Notification" in window && Notification.permission === "granted") {
          new Notification(notification.title, {
            body: notification.message,
            icon: "/favicon.ico",
            tag: notification.id,
          })
        }
      },

      markAsRead: (notificationId: string) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === notificationId)
          if (notification && !notification.isRead) {
            notification.isRead = true
            state.unreadCount = Math.max(0, state.unreadCount - 1)
          }
        })
      },

      markAllAsRead: () => {
        set((state) => {
          state.notifications.forEach((notification) => {
            notification.isRead = true
          })
          state.unreadCount = 0
        })
      },

      deleteNotification: (notificationId: string) => {
        set((state) => {
          const index = state.notifications.findIndex((n) => n.id === notificationId)
          if (index !== -1) {
            const notification = state.notifications[index]
            if (!notification.isRead) {
              state.unreadCount = Math.max(0, state.unreadCount - 1)
            }
            state.notifications.splice(index, 1)
          }
        })
      },

      clearAllNotifications: () => {
        set((state) => {
          state.notifications = []
          state.unreadCount = 0
        })
      },

      startPolling: () => {
        const { settings, isPolling } = get()

        if (isPolling || pollingInterval) {
          return
        }

        set((state) => {
          state.isPolling = true
        })

        // Initial fetch
        get().fetchNotifications()

        // Set up polling interval
        pollingInterval = setInterval(() => {
          get().fetchNotifications()
        }, settings.pollingInterval)
      },

      stopPolling: () => {
        if (pollingInterval) {
          clearInterval(pollingInterval)
          pollingInterval = null
        }

        set((state) => {
          state.isPolling = false
        })
      },

      updateSettings: (newSettings) => {
        set((state) => {
          Object.assign(state.settings, newSettings)
        })

        // Restart polling if interval changed
        if (newSettings.pollingInterval && get().isPolling) {
          get().stopPolling()
          get().startPolling()
        }

        // Request notification permission if push notifications enabled
        if (newSettings.enablePush && "Notification" in window && Notification.permission === "default") {
          Notification.requestPermission()
        }
      },

      fetchNotifications: async () => {
        try {
          // Simulate API call to fetch new notifications
          await new Promise((resolve) => setTimeout(resolve, 500))

          const { lastPolled, settings } = get()
          const now = new Date().toISOString()

          // Simulate receiving new notifications based on settings
          if (Math.random() < 0.3) {
            // 30% chance of new notification
            const availableNotifications = mockNotifications.filter((notif) => {
              switch (notif.type) {
                case "order_status":
                case "order_shipped":
                case "order_delivered":
                case "order_cancelled":
                  return settings.enableOrderUpdates
                case "promotion":
                  return settings.enablePromotions
                case "system":
                  return settings.enableSystem
                default:
                  return true
              }
            })

            if (availableNotifications.length > 0) {
              const randomNotification =
                availableNotifications[Math.floor(Math.random() * availableNotifications.length)]

              // Only add if we haven't seen this type recently
              const recentNotifications = get().notifications.slice(0, 5)
              const hasRecentSimilar = recentNotifications.some(
                (n) => n.type === randomNotification.type && n.orderId === randomNotification.orderId,
              )

              if (!hasRecentSimilar) {
                get().addNotification(randomNotification)
              }
            }
          }

          set((state) => {
            state.lastPolled = now
          })
        } catch (error) {
          console.error("Failed to fetch notifications:", error)
        }
      },
    })),
    {
      name: "diaspora-notifications",
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
        settings: state.settings,
        lastPolled: state.lastPolled,
      }),
    },
  ),
)
