"use client"

import { useEffect, useState } from "react"
import { notification } from "antd"
import { CheckCircleOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { useNotificationStore } from "@/store/useNotificationStore"
import type { Notification } from "@/store/useNotificationStore"

export default function NotificationToast() {
  const [api, contextHolder] = notification.useNotification()
  const { notifications } = useNotificationStore()
  const [lastNotificationId, setLastNotificationId] = useState<string | null>(null)

  useEffect(() => {
    // Check for new notifications
    const latestNotification = notifications[0]

    if (latestNotification && latestNotification.id !== lastNotificationId) {
      showToast(latestNotification)
      setLastNotificationId(latestNotification.id)
    }
  }, [notifications, lastNotificationId])

  const showToast = (notif: Notification) => {
    const getIcon = () => {
      switch (notif.type) {
        case "order_delivered":
          return <CheckCircleOutlined style={{ color: "#52c41a" }} />
        case "order_shipped":
          return <InfoCircleOutlined style={{ color: "#1890ff" }} />
        case "order_cancelled":
          return <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
        case "promotion":
          return <WarningOutlined style={{ color: "#faad14" }} />
        default:
          return <InfoCircleOutlined style={{ color: "#1890ff" }} />
      }
    }

    const getNotificationConfig = () => {
      const baseConfig = {
        message: <div className="font-inter font-semibold text-gray-900">{notif.title}</div>,
        description: <div className="font-inter text-gray-600 mt-1">{notif.message}</div>,
        icon: getIcon(),
        placement: "topRight" as const,
        duration: notif.priority === "high" ? 8 : notif.priority === "medium" ? 6 : 4,
        className: "notification-toast",
        style: {
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        },
      }

      // Add action button if available
      if (notif.actionUrl && notif.actionText) {
        return {
          ...baseConfig,
          btn: (
            <a
              href={notif.actionUrl}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors duration-200 font-inter"
              onClick={() => api.destroy()}
            >
              {notif.actionText}
            </a>
          ),
        }
      }

      return baseConfig
    }

    api.open(getNotificationConfig())

    // Play notification sound for high priority notifications
    if (notif.priority === "high" && typeof window !== "undefined") {
      try {
        const audio = new Audio("/notification-sound.mp3")
        audio.volume = 0.3
        audio.play().catch(() => {
          // Ignore audio play errors (user interaction required)
        })
      } catch (error) {
        // Ignore audio errors
      }
    }
  }

  return <>{contextHolder}</>
}
