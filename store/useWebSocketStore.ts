import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { WebSocketManager, MockWebSocketServer } from "@/lib/websocket"

interface WebSocketState {
  wsManager: WebSocketManager | null
  connectionStatus: "disconnected" | "connecting" | "connected" | "error"
  lastError: string | null
  reconnectAttempts: number
  isReconnecting: boolean

  // Actions
  connect: (userId?: string) => Promise<void>
  disconnect: () => void
  sendMessage: (message: any) => void
  setConnectionStatus: (status: WebSocketState["connectionStatus"]) => void
  setError: (error: string | null) => void
  clearError: () => void
}

// Create mock server instance
const mockServer = new MockWebSocketServer()

export const useWebSocketStore = create<WebSocketState>()(
  immer((set, get) => ({
    wsManager: null,
    connectionStatus: "disconnected",
    lastError: null,
    reconnectAttempts: 0,
    isReconnecting: false,

    connect: async (userId?: string) => {
      const { wsManager } = get()

      if (wsManager?.isConnected) {
        return
      }

      set((state) => {
        state.connectionStatus = "connecting"
        state.lastError = null
      })

      try {
        // In a real app, this would be your WebSocket server URL
        // For demo purposes, we'll simulate WebSocket behavior
        const mockWsManager = new WebSocketManager("wss://api.homindi.com/ws")

        // Simulate WebSocket connection
        const mockWs = {
          readyState: 1, // OPEN
          onopen: null as any,
          onmessage: null as any,
          onclose: null as any,
          onerror: null as any,
          send: (data: string) => {
            console.log("Mock WebSocket send:", data)
          },
          close: (code?: number, reason?: string) => {
            console.log("Mock WebSocket close:", code, reason)
          },
        }

        // Add to mock server
        mockServer.addClient(mockWs)

        // Simulate connection success
        setTimeout(() => {
          if (mockWs.onopen) {
            mockWs.onopen({} as Event)
          }
        }, 500)

        // Set up the manager
        set((state) => {
          state.wsManager = mockWsManager
          state.connectionStatus = "connected"
        })

        // Set up event listeners
        mockWsManager.on("connected", () => {
          set((state) => {
            state.connectionStatus = "connected"
            state.reconnectAttempts = 0
            state.isReconnecting = false
          })
        })

        mockWsManager.on("disconnected", () => {
          set((state) => {
            state.connectionStatus = "disconnected"
          })
        })

        mockWsManager.on("error", (error: any) => {
          set((state) => {
            state.connectionStatus = "error"
            state.lastError = error.message || "Connection error"
          })
        })

        // Set up notification handling
        mockWsManager.on("notification", (notification: any) => {
          // Import and use notification store
          import("@/store/useNotificationStore").then(({ useNotificationStore }) => {
            const { addNotification } = useNotificationStore.getState()
            addNotification(notification)
          })
        })

        // Set up order update handling
        mockWsManager.on("order_update", (update: any) => {
          // Import and use order store
          import("@/store/useOrderStore").then(({ useOrderStore }) => {
            const { updateOrderStatus } = useOrderStore.getState()
            updateOrderStatus(update.orderId, update.status)
          })
        })

        // Replace the actual WebSocket with our mock
        ;(mockWsManager as any).ws = mockWs;
        mockWs.onopen = () => (mockWsManager as any).emit("connected", null)
        mockWs.onmessage = (event: any) => {
          try {
            const message = JSON.parse(event.data)
            ;(mockWsManager as any).handleMessage?.(message)
          } catch (error) {
            console.error("Failed to parse message:", error)
          }
        }
      } catch (error) {
        set((state) => {
          state.connectionStatus = "error"
          state.lastError = error instanceof Error ? error.message : "Failed to connect"
        })
        throw error
      }
    },

    disconnect: () => {
      const { wsManager } = get()
      if (wsManager) {
        wsManager.disconnect()
        set((state) => {
          state.wsManager = null
          state.connectionStatus = "disconnected"
        })
      }
    },

    sendMessage: (message: any) => {
      const { wsManager } = get()
      if (wsManager?.isConnected) {
        wsManager.send(message)
      }
    },

    setConnectionStatus: (status: WebSocketState["connectionStatus"]) => {
      set((state) => {
        state.connectionStatus = status
      })
    },

    setError: (error: string | null) => {
      set((state) => {
        state.lastError = error
      })
    },

    clearError: () => {
      set((state) => {
        state.lastError = null
      })
    },
  })),
)