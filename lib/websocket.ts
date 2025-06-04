export interface WebSocketMessage {
  type: "notification" | "order_update" | "system_message" | "heartbeat"
  data: any
  timestamp: string
}

export class WebSocketManager {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private heartbeatInterval: NodeJS.Timeout | null = null
  private isConnecting = false
  private listeners: Map<string, Function[]> = new Map()

  constructor(private url: string) {}

  connect(userId?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
        resolve()
        return
      }

      this.isConnecting = true
      const wsUrl = userId ? `${this.url}?userId=${userId}` : this.url

      try {
        this.ws = new WebSocket(wsUrl)

        this.ws.onopen = () => {
          console.log("WebSocket connected")
          this.isConnecting = false
          this.reconnectAttempts = 0
          this.startHeartbeat()
          this.emit("connected", null)
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data)
            this.handleMessage(message)
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error)
          }
        }

        this.ws.onclose = (event) => {
          console.log("WebSocket disconnected:", event.code, event.reason)
          this.isConnecting = false
          this.stopHeartbeat()
          this.emit("disconnected", { code: event.code, reason: event.reason })

          if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.scheduleReconnect()
          }
        }

        this.ws.onerror = (error) => {
          console.error("WebSocket error:", error)
          this.isConnecting = false
          this.emit("error", error)
          reject(error)
        }
      } catch (error) {
        this.isConnecting = false
        reject(error)
      }
    })
  }

  disconnect() {
    this.stopHeartbeat()
    if (this.ws) {
      this.ws.close(1000, "Client disconnect")
      this.ws = null
    }
  }

  send(message: Omit<WebSocketMessage, "timestamp">) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const fullMessage: WebSocketMessage = {
        ...message,
        timestamp: new Date().toISOString(),
      }
      this.ws.send(JSON.stringify(fullMessage))
    } else {
      console.warn("WebSocket not connected, cannot send message")
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  off(event: string, callback: Function) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach((callback) => callback(data))
    }
  }

  private handleMessage(message: WebSocketMessage) {
    switch (message.type) {
      case "notification":
        this.emit("notification", message.data)
        break
      case "order_update":
        this.emit("order_update", message.data)
        break
      case "system_message":
        this.emit("system_message", message.data)
        break
      case "heartbeat":
        // Respond to heartbeat
        this.send({ type: "heartbeat", data: { response: true } })
        break
      default:
        console.log("Unknown message type:", message.type)
    }
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.send({ type: "heartbeat", data: { ping: true } })
    }, 30000) // 30 seconds
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  private scheduleReconnect() {
    this.reconnectAttempts++
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)

    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`)

    setTimeout(() => {
      this.connect()
    }, delay)
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }

  get connectionState(): string {
    if (!this.ws) return "disconnected"
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return "connecting"
      case WebSocket.OPEN:
        return "connected"
      case WebSocket.CLOSING:
        return "closing"
      case WebSocket.CLOSED:
        return "disconnected"
      default:
        return "unknown"
    }
  }
}

// Mock WebSocket server simulation
export class MockWebSocketServer {
  private clients: Set<any> = new Set()
  private messageQueue: WebSocketMessage[] = []

 constructor() {
    // Simulate periodic notifications
    setInterval(() => {
      this.simulateNotification()
    }, 45000) // Every 45 seconds

    // Simulate order updates
    setInterval(() => {
      this.simulateOrderUpdate()
    }, 120000) // Every 2 minutes
  }

  addClient(client: any) {
    this.clients.add(client)
  }

  removeClient(client: any) {
    this.clients.delete(client)
  }

  broadcast(message: WebSocketMessage) {
    this.clients.forEach((client) => {
      if (client.onmessage) {
        client.onmessage({ data: JSON.stringify(message) })
      }
    })
  }

  private simulateNotification() {
    const notifications = [
      {
        type: "order_status",
        title: "Order Status Updated",
        message: "Your order #ORD-12345 is now being processed",
        orderId: "ORD-12345",
        priority: "medium",
        actionUrl: "/dashboard/orders",
        actionText: "View Order",
      },
      {
        type: "order_shipped",
        title: "Order Shipped",
        message: "Your order #ORD-67890 has been shipped!",
        orderId: "ORD-67890",
        priority: "high",
        actionUrl: "/dashboard/orders",
        actionText: "Track Package",
      },
      {
        type: "promotion",
        title: "Flash Sale",
        message: "30% off on all spices - Limited time offer!",
        priority: "low",
        actionUrl: "/products?category=Spices",
        actionText: "Shop Now",
      },
    ]

    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]

    this.broadcast({
      type: "notification",
      data: {
        ...randomNotification,
        isRead: false,
      },
      timestamp: new Date().toISOString(),
    })
  }

  private simulateOrderUpdate() {
    const orderUpdates = [
      {
        orderId: "ORD-12345",
        status: "processing",
        message: "Your order is being prepared for shipment",
      },
      {
        orderId: "ORD-67890",
        status: "shipped",
        message: "Your order has been shipped and is on its way",
      },
      {
        orderId: "ORD-54321",
        status: "delivered",
        message: "Your order has been delivered successfully",
      },
    ]

    const randomUpdate = orderUpdates[Math.floor(Math.random() * orderUpdates.length)]

    this.broadcast({
      type: "order_update",
      data: randomUpdate,
      timestamp: new Date().toISOString(),
    })
  }
}