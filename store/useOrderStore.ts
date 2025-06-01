import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import type { Order, CartItem, ShippingAddress } from "@/lib/types"
import { mockOrders } from "@/lib/mockData"

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  isLoading: boolean
  error: string | null

  // Actions
  fetchOrders: () => Promise<void>
  fetchOrderById: (orderId: string) => Promise<void>
  createOrder: (orderData: {
    items: CartItem[]
    shippingAddress: ShippingAddress
    total: number
  }) => Promise<Order>
  updateOrderStatus: (orderId: string, status: Order["status"]) => Promise<void>
  cancelOrder: (orderId: string) => Promise<void>
  reorder: (orderId: string) => CartItem[]
  trackOrder: (orderId: string) => Promise<{
    status: string
    location: string
    estimatedDelivery: string
    updates: Array<{
      date: string
      status: string
      location: string
      description: string
    }>
  }>
  clearError: () => void
  setCurrentOrder: (order: Order | null) => void
}

// Mock tracking data
const mockTrackingData = {
  status: "In Transit",
  location: "Lagos Distribution Center",
  estimatedDelivery: "2024-02-15",
  updates: [
    {
      date: "2024-02-10T10:00:00Z",
      status: "Order Confirmed",
      location: "Lagos Warehouse",
      description: "Your order has been confirmed and is being prepared for shipment.",
    },
    {
      date: "2024-02-11T14:30:00Z",
      status: "Processing",
      location: "Lagos Warehouse",
      description: "Items are being picked and packed for shipment.",
    },
    {
      date: "2024-02-12T09:15:00Z",
      status: "Shipped",
      location: "Lagos Distribution Center",
      description: "Your order has been shipped and is on its way to the destination country.",
    },
    {
      date: "2024-02-13T16:45:00Z",
      status: "In Transit",
      location: "International Hub - Dubai",
      description: "Package is in transit through international shipping hub.",
    },
  ],
}

export const useOrderStore = create<OrderState>()(
  persist(
    immer((set, get) => ({
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,

      fetchOrders: async () => {
        set((state) => {
          state.isLoading = true
          state.error = null
        })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          set((state) => {
            state.orders = mockOrders
            state.isLoading = false
          })
        } catch (error) {
          set((state) => {
            state.error = "Failed to fetch orders"
            state.isLoading = false
          })
        }
      },

      fetchOrderById: async (orderId: string) => {
        set((state) => {
          state.isLoading = true
          state.error = null
        })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500))

          const order = mockOrders.find((o) => o.id === orderId)

          set((state) => {
            state.currentOrder = order || null
            state.isLoading = false
            if (!order) {
              state.error = "Order not found"
            }
          })
        } catch (error) {
          set((state) => {
            state.error = "Failed to fetch order details"
            state.isLoading = false
          })
        }
      },

      createOrder: async (orderData) => {
        set((state) => {
          state.isLoading = true
          state.error = null
        })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500))

          const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            userId: "user-1", // This would come from auth store
            items: orderData.items,
            total: orderData.total,
            status: "pending",
            createdAt: new Date().toISOString(),
            shippingAddress: orderData.shippingAddress,
            trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          }

          set((state) => {
            state.orders.unshift(newOrder)
            state.currentOrder = newOrder
            state.isLoading = false
          })

          // Trigger notification for order creation
          if (typeof window !== "undefined") {
            const { useNotificationStore } = await import("@/store/useNotificationStore")
            const { addNotification } = useNotificationStore.getState()
            addNotification({
              type: "order_status",
              title: "Order Placed Successfully",
              message: `Your order ${newOrder.id} has been placed and is being processed.`,
              orderId: newOrder.id,
              isRead: false,
              priority: "medium",
              actionUrl: "/dashboard/orders",
              actionText: "View Order",
            })
          }

          return newOrder
        } catch (error) {
          set((state) => {
            state.error = "Failed to create order"
            state.isLoading = false
          })
          throw error
        }
      },

      updateOrderStatus: async (orderId: string, status: Order["status"]) => {
        set((state) => {
          state.isLoading = true
          state.error = null
        })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 800))

          set((state) => {
            const orderIndex = state.orders.findIndex((o) => o.id === orderId)
            if (orderIndex !== -1) {
              state.orders[orderIndex].status = status
            }

            if (state.currentOrder?.id === orderId) {
              state.currentOrder.status = status
            }

            state.isLoading = false
          })

          // Trigger notification for status update
          if (typeof window !== "undefined") {
            const { useNotificationStore } = await import("@/store/useNotificationStore")
            const { addNotification } = useNotificationStore.getState()

            const statusMessages = {
              pending: "Your order is pending confirmation.",
              processing: "Your order is being processed.",
              shipped: "Your order has been shipped!",
              delivered: "Your order has been delivered!",
              cancelled: "Your order has been cancelled.",
            }

            addNotification({
              type:
                status === "shipped"
                  ? "order_shipped"
                  : status === "delivered"
                    ? "order_delivered"
                    : status === "cancelled"
                      ? "order_cancelled"
                      : "order_status",
              title: "Order Status Updated",
              message: statusMessages[status] || `Your order status has been updated to ${status}.`,
              orderId,
              isRead: false,
              priority: status === "delivered" ? "high" : status === "shipped" ? "high" : "medium",
              actionUrl: "/dashboard/orders",
              actionText: "View Order",
            })
          }
        } catch (error) {
          set((state) => {
            state.error = "Failed to update order status"
            state.isLoading = false
          })
        }
      },

      cancelOrder: async (orderId: string) => {
        set((state) => {
          state.isLoading = true
          state.error = null
        })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          set((state) => {
            const orderIndex = state.orders.findIndex((o) => o.id === orderId)
            if (orderIndex !== -1) {
              state.orders[orderIndex].status = "cancelled"
            }

            if (state.currentOrder?.id === orderId) {
              state.currentOrder.status = "cancelled"
            }

            state.isLoading = false
          })

          // Trigger notification for cancellation
          if (typeof window !== "undefined") {
            const { useNotificationStore } = await import("@/store/useNotificationStore")
            const { addNotification } = useNotificationStore.getState()
            addNotification({
              type: "order_cancelled",
              title: "Order Cancelled",
              message: `Your order ${orderId} has been cancelled successfully.`,
              orderId,
              isRead: false,
              priority: "medium",
              actionUrl: "/dashboard/orders",
              actionText: "View Orders",
            })
          }
        } catch (error) {
          set((state) => {
            state.error = "Failed to cancel order"
            state.isLoading = false
          })
        }
      },

      reorder: (orderId: string) => {
        const order = get().orders.find((o) => o.id === orderId)
        if (!order) {
          set((state) => {
            state.error = "Order not found for reorder"
          })
          return []
        }

        // Return the cart items for reordering
        return order.items
      },

      trackOrder: async (orderId: string) => {
        set((state) => {
          state.isLoading = true
          state.error = null
        })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 800))

          set((state) => {
            state.isLoading = false
          })

          return mockTrackingData
        } catch (error) {
          set((state) => {
            state.error = "Failed to fetch tracking information"
            state.isLoading = false
          })
          throw error
        }
      },

      clearError: () => {
        set((state) => {
          state.error = null
        })
      },

      setCurrentOrder: (order: Order | null) => {
        set((state) => {
          state.currentOrder = order
        })
      },
    })),
    {
      name: "diaspora-orders",
      partialize: (state) => ({
        orders: state.orders,
      }),
    },
  ),
)
