"use client"

import { useState } from "react"
import { Badge, Dropdown, Button, List, Typography, Empty, Divider, Space } from "antd"
import { BellOutlined, SettingOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useNotificationStore } from "@/store/useNotificationStore"
import { formatDate } from "@/lib/utils"
import type { Notification } from "@/store/useNotificationStore"

const { Text } = Typography

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotificationStore()

  const recentNotifications = notifications.slice(0, 8)

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order_status":
      case "order_shipped":
      case "order_delivered":
        return "📦"
      case "order_cancelled":
        return "❌"
      case "promotion":
        return "🎉"
      case "system":
        return "⚙️"
      default:
        return "📢"
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "#ff4d4f"
      case "medium":
        return "#faad14"
      case "low":
        return "#52c41a"
      default:
        return "#d9d9d9"
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    setOpen(false)
  }

  const dropdownContent = (
    <div className="w-96 max-h-[32rem] overflow-hidden bg-white rounded-xl shadow-2xl border border-gray-100">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#0B8457] to-[#0a7249]">
        <div className="flex justify-between items-center">
          <div>
            <Text className="text-white font-inter font-semibold text-lg">Notifications</Text>
            {unreadCount > 0 && (
              <Text className="text-green-100 font-inter text-sm block">
                {unreadCount} unread message{unreadCount > 1 ? "s" : ""}
              </Text>
            )}
          </div>
          <Space>
            {unreadCount > 0 && (
              <Button
                type="text"
                size="small"
                icon={<CheckOutlined />}
                onClick={markAllAsRead}
                className="text-white hover:bg-white/20 border-white/30 font-inter"
              >
                Mark all read
              </Button>
            )}
            <Link href="/dashboard/notifications">
              <Button
                type="text"
                size="small"
                icon={<SettingOutlined />}
                onClick={() => setOpen(false)}
                className="text-white hover:bg-white/20 border-white/30 font-inter"
              >
                Settings
              </Button>
            </Link>
          </Space>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {recentNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<Text className="font-inter text-gray-500">No notifications yet</Text>}
            />
          </div>
        ) : (
          <List
            dataSource={recentNotifications}
            renderItem={(notification) => (
              <List.Item
                className={`px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 border-b border-gray-50 last:border-b-0 ${
                  !notification.isRead ? "bg-blue-50/50" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
                actions={[
                  <Button
                    key="delete"
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(notification.id)
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B8457] to-[#0a7249] flex items-center justify-center text-white text-lg mr-3">
                        {getNotificationIcon(notification.type)}
                      </div>
                      {!notification.isRead && (
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: getPriorityColor(notification.priority) }}
                        />
                      )}
                    </div>
                  }
                  title={
                    <div className="flex justify-between items-start">
                      <Text
                        className={`font-inter text-sm ${!notification.isRead ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}
                      >
                        {notification.title}
                      </Text>
                      <Text className="font-inter text-xs text-gray-400 ml-2 whitespace-nowrap">
                        {formatDate(notification.createdAt)}
                      </Text>
                    </div>
                  }
                  description={
                    <div className="mt-1">
                      <Text className="font-inter text-sm text-gray-600 leading-relaxed">{notification.message}</Text>
                      {notification.actionUrl && notification.actionText && (
                        <div className="mt-2">
                          <Link href={notification.actionUrl}>
                            <Button
                              type="link"
                              size="small"
                              className="p-0 h-auto font-inter text-[#0B8457] hover:text-[#0a7249] font-medium"
                            >
                              {notification.actionText} →
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>

      {/* Footer */}
      {recentNotifications.length > 0 && (
        <>
          <Divider className="my-0" />
          <div className="p-3 text-center bg-gray-50">
            <Link href="/dashboard/notifications">
              <Button
                type="link"
                onClick={() => setOpen(false)}
                className="font-inter font-medium text-[#0B8457] hover:text-[#0a7249]"
              >
                View all notifications
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )

  return (
    <Dropdown
    popupRender={() => dropdownContent}
      trigger={["click"]}
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <Button type="text" className="flex items-center relative">
        <Badge count={unreadCount} size="small" offset={[0, 0]} className="notification-badge">
          <BellOutlined className="text-xl text-gray-600 hover:text-[#0B8457] transition-colors" />
        </Badge>
        {unreadCount > 0 && <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
      </Button>
    </Dropdown>
  )
}
