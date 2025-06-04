"use client";

import { useState } from "react";
import {
  Card,
  List,
  Button,
  Typography,
  Tag,
  Switch,
  InputNumber,
  Divider,
  Space,
  Empty,
  Modal,
  Statistic,
  Row,
  Col,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined,
  SettingOutlined,
  BellOutlined,
  MailOutlined,
  CheckOutlined,
  ClearOutlined,
  WifiOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useWebSocketStore } from "@/store/useWebSocketStore";
import { formatDate } from "@/lib/utils";
import type { Notification } from "@/store/useNotificationStore";

const { Title, Text } = Typography;

export default function NotificationsPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showSettings, setShowSettings] = useState(false);

  const {
    notifications,
    unreadCount,
    settings,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    updateSettings,
  } = useNotificationStore();

  const { connectionStatus } = useWebSocketStore();

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedType === "all") return true;
    if (selectedType === "unread") return !notification.isRead;
    return notification.type === selectedType;
  });

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order_status":
      case "order_shipped":
      case "order_delivered":
        return "📦";
      case "order_cancelled":
        return "❌";
      case "promotion":
        return "🎉";
      case "system":
        return "⚙️";
      default:
        return "📢";
    }
  };

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "default";
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "#52c41a";
      case "connecting":
        return "#faad14";
      case "error":
        return "#ff4d4f";
      default:
        return "#d9d9d9";
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting";
      case "error":
        return "Disconnected";
      default:
        return "Offline";
    }
  };

  const notificationTypes = [
    {
      key: "all",
      label: "All Notifications",
      count: notifications.length,
      icon: "📋",
    },
    { key: "unread", label: "Unread", count: unreadCount, icon: "🔔" },
    {
      key: "order_status",
      label: "Order Updates",
      count: notifications.filter((n) => n.type.startsWith("order")).length,
      icon: "📦",
    },
    {
      key: "promotion",
      label: "Promotions",
      count: notifications.filter((n) => n.type === "promotion").length,
      icon: "🎉",
    },
    {
      key: "system",
      label: "System",
      count: notifications.filter((n) => n.type === "system").length,
      icon: "⚙️",
    },
  ];

  const totalNotifications = notifications.length;
  const readNotifications = notifications.filter((n) => n.isRead).length;
  const highPriorityNotifications = notifications.filter(
    (n) => n.priority === "high"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <Title level={2} className="font-poppins mb-2">
            Notifications
          </Title>
          <div className="flex items-center gap-4">
            <Text type="secondary" className="font-inter">
              Stay updated with your orders and promotions
            </Text>
            <div className="flex items-center gap-2">
              <WifiOutlined style={{ color: getConnectionStatusColor() }} />
              <Text
                type="secondary"
                className="font-inter text-sm"
                style={{ color: getConnectionStatusColor() }}
              >
                {getConnectionStatusText()}
              </Text>
            </div>
          </div>
        </div>
        <Space wrap>
          <Button
            icon={<SettingOutlined />}
            onClick={() => setShowSettings(true)}
            className="font-inter"
          >
            Settings
          </Button>
          {unreadCount > 0 && (
            <Button
              icon={<CheckOutlined />}
              onClick={markAllAsRead}
              className="font-inter"
            >
              Mark All Read ({unreadCount})
            </Button>
          )}
          {notifications.length > 0 && (
            <Popconfirm
              title="Clear All Notifications"
              placement="left"
              description="Are you sure you want to delete all notifications? This action cannot be undone."
              okText="Yes, clear all"
              okButtonProps={{ danger: true }}
              cancelText="Cancel"
              onConfirm={clearAllNotifications}
            >
              <Button danger icon={<ClearOutlined />} className="font-inter">
                Clear All
              </Button>
            </Popconfirm>
          )}
        </Space>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-inter">Total Notifications</span>}
              value={totalNotifications}
              prefix={<BellOutlined />}
              valueStyle={{
                color: "#0B8457",
                fontFamily: "var(--font-poppins)",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-inter">Read Notifications</span>}
              value={readNotifications}
              prefix={<CheckOutlined />}
              valueStyle={{
                color: "#52c41a",
                fontFamily: "var(--font-poppins)",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-inter">High Priority</span>}
              value={highPriorityNotifications}
              prefix={<TrophyOutlined />}
              valueStyle={{
                color: "#ff4d4f",
                fontFamily: "var(--font-poppins)",
              }}
            />
          </Card>
        </Col>
      </Row>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Notification Types Sidebar */}
        <div className="lg:col-span-1">
          <Card
            title={<span className="font-poppins">Filter Notifications</span>}
          >
            <div className="space-y-2">
              {notificationTypes.map((type) => (
                <div
                  key={type.key}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedType === type.key
                      ? "bg-gradient-to-r from-[#0B8457] to-[#0a7249] text-white shadow-lg"
                      : "hover:bg-gray-50 border border-gray-100"
                  }`}
                  onClick={() => setSelectedType(type.key)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{type.icon}</span>
                      <Text
                        className={`font-inter font-medium ${
                          selectedType === type.key ? "text-white" : ""
                        }`}
                      >
                        {type.label}
                      </Text>
                    </div>
                    <Tag
                      className={`font-inter ${
                        selectedType === type.key ? "text-[#0B8457]" : ""
                      }`}
                    >
                      {type.count}
                    </Tag>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-3">
          <Card
            title={
              <span className="font-poppins">
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}{" "}
                Notifications
              </span>
            }
          >
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Empty
                  description={
                    <span className="font-inter text-gray-500">
                      No notifications found
                    </span>
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            ) : (
              <List
                dataSource={filteredNotifications}
                renderItem={(notification) => (
                  <List.Item
                    className={`${
                      !notification.isRead
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-[#0B8457]"
                        : ""
                    } rounded-lg mb-3 p-4 transition-all duration-200 hover:shadow-md`}
                    actions={[
                      !notification.isRead && (
                        <Button
                          key="read"
                          type="text"
                          size="small"
                          onClick={() => markAsRead(notification.id)}
                          className="font-inter"
                        >
                          Mark as read
                        </Button>
                      ),
                      <Button
                        key="delete"
                        type="text"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => deleteNotification(notification.id)}
                        className="font-inter"
                      >
                        Delete
                      </Button>,
                    ].filter(Boolean)}
                  >
                    <List.Item.Meta
                      avatar={
                        <div className="flex items-center pl-5">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B8457] to-[#0a7249] flex items-center justify-center text-white text-xl mr-4 shadow-lg">
                            {getNotificationIcon(notification.type)}
                          </div>
                          {!notification.isRead && (
                            <div className="w-3 h-3 bg-[#0B8457] rounded-full animate-pulse mr-2" />
                          )}
                        </div>
                      }
                      title={
                        <div className="flex justify-between items-start">
                          <Text
                            className={`font-inter text-base ${
                              !notification.isRead
                                ? "font-semibold text-gray-900"
                                : "font-medium text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </Text>
                          <div className="flex items-center gap-2 ml-4">
                            <Tag
                              color={getPriorityColor(notification.priority)}
                              className="font-inter"
                            >
                              {notification.priority}
                            </Tag>
                            <Text
                              type="secondary"
                              className="text-sm font-inter whitespace-nowrap"
                            >
                              {formatDate(notification.createdAt)}
                            </Text>
                          </div>
                        </div>
                      }
                      description={
                        <div className="space-y-3 mt-2">
                          <Text className="font-inter text-gray-600 leading-relaxed">
                            {notification.message}
                          </Text>
                          {notification.orderId && (
                            <Text
                              type="secondary"
                              className="text-sm font-inter"
                            >
                              Order: {notification.orderId}
                            </Text>
                          )}
                          {notification.actionUrl &&
                            notification.actionText && (
                              <div>
                                <Button
                                  type="link"
                                  href={notification.actionUrl}
                                  className="p-0 font-inter text-[#0B8457] hover:text-[#0a7249] font-medium"
                                >
                                  {notification.actionText} →
                                </Button>
                              </div>
                            )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => (
                    <span className="font-inter">
                      {range[0]}-{range[1]} of {total} notifications
                    </span>
                  ),
                }}
              />
            )}
          </Card>
        </div>
      </div>

      {/* Settings Modal */}
      <Modal
        title={
          <span className="font-poppins font-semibold">
            Notification Settings
          </span>
        }
        open={showSettings}
        onCancel={() => setShowSettings(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setShowSettings(false)}
            className="font-inter"
          >
            Close
          </Button>,
        ]}
        width={600}
      >
        <div className="space-y-6">
          <div>
            <Title level={4} className="font-poppins">
              Notification Channels
            </Title>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0B8457] to-[#0a7249] rounded-lg flex items-center justify-center">
                    <BellOutlined className="text-white" />
                  </div>
                  <div>
                    <Text className="font-inter font-medium">
                      Browser Notifications
                    </Text>
                    <br />
                    <Text type="secondary" className="font-inter text-sm">
                      Get instant notifications in your browser
                    </Text>
                  </div>
                </div>
                <Switch
                  checked={settings.enablePush}
                  onChange={(checked) =>
                    updateSettings({ enablePush: checked })
                  }
                />
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F9A826] to-[#e09620] rounded-lg flex items-center justify-center">
                    <MailOutlined className="text-white" />
                  </div>
                  <div>
                    <Text className="font-inter font-medium">
                      Email Notifications
                    </Text>
                    <br />
                    <Text type="secondary" className="font-inter text-sm">
                      Receive important updates via email
                    </Text>
                  </div>
                </div>
                <Switch
                  checked={settings.enableEmail}
                  onChange={(checked) =>
                    updateSettings({ enableEmail: checked })
                  }
                />
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <Title level={4} className="font-poppins">
              Notification Types
            </Title>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <Text className="font-inter font-medium">
                      Order Updates
                    </Text>
                    <br />
                    <Text type="secondary" className="font-inter text-sm">
                      Status changes, shipping, and delivery notifications
                    </Text>
                  </div>
                </div>
                <Switch
                  checked={settings.enableOrderUpdates}
                  onChange={(checked) =>
                    updateSettings({ enableOrderUpdates: checked })
                  }
                />
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <Text className="font-inter font-medium">
                      Promotions & Offers
                    </Text>
                    <br />
                    <Text type="secondary" className="font-inter text-sm">
                      Special deals, discounts, and promotional content
                    </Text>
                  </div>
                </div>
                <Switch
                  checked={settings.enablePromotions}
                  onChange={(checked) =>
                    updateSettings({ enablePromotions: checked })
                  }
                />
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <Text className="font-inter font-medium">
                      System Notifications
                    </Text>
                    <br />
                    <Text type="secondary" className="font-inter text-sm">
                      Important system updates and maintenance alerts
                    </Text>
                  </div>
                </div>
                <Switch
                  checked={settings.enableSystem}
                  onChange={(checked) =>
                    updateSettings({ enableSystem: checked })
                  }
                />
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <Title level={4} className="font-poppins">
              Update Frequency
            </Title>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <Text className="font-inter font-medium">
                  Check for updates every
                </Text>
                <InputNumber
                  min={10}
                  max={300}
                  value={settings.pollingInterval / 1000}
                  onChange={(value) =>
                    updateSettings({ pollingInterval: (value || 30) * 1000 })
                  }
                  addonAfter="seconds"
                  className="font-inter"
                />
              </div>
              <Text type="secondary" className="text-sm font-inter">
                Lower values provide more real-time updates but may impact
                performance. WebSocket connection provides instant updates when
                available.
              </Text>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
