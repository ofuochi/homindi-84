"use client"

import { useEffect, useState } from "react"
import { Card, Table, Tag, Button, Typography, Space, Modal, Timeline, Spin, message, Input } from "antd"
import {
  EyeOutlined,
  ReloadOutlined,
  StopOutlined,
  SearchOutlined,
  TruckOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import { useOrderStore } from "@/store/useOrderStore"
import { useCartStore } from "@/store/useCartStore"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ORDER_STATUSES } from "@/lib/constants"
import type { Order } from "@/lib/types"

const { Title, Text } = Typography
const { Search } = Input

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [trackingModalOpen, setTrackingModalOpen] = useState(false)
  const [trackingData, setTrackingData] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const { orders, isLoading, error, fetchOrders, cancelOrder, reorder, trackOrder, clearError } = useOrderStore()

  const { addItem, clearCart } = useCartStore()

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  useEffect(() => {
    if (error) {
      message.error(error)
      clearError()
    }
  }, [error, clearError])

  const handleReorder = async (orderId: string) => {
    try {
      const items = reorder(orderId)
      if (items.length > 0) {
        clearCart()
        items.forEach((item) => {
          addItem(item.product, item.quantity)
        })
        message.success("Items added to cart successfully!")
      }
    } catch (error) {
      message.error("Failed to reorder items")
    }
  }

  const handleCancelOrder = async (orderId: string) => {
    Modal.confirm({
      title: "Cancel Order",
      content: "Are you sure you want to cancel this order?",
      okText: "Yes, Cancel",
      okType: "danger",
      onOk: async () => {
        try {
          await cancelOrder(orderId)
          message.success("Order cancelled successfully")
        } catch (error) {
          message.error("Failed to cancel order")
        }
      },
    })
  }

  const handleTrackOrder = async (orderId: string) => {
    try {
      setTrackingModalOpen(true)
      const data = await trackOrder(orderId)
      setTrackingData(data)
    } catch (error) {
      message.error("Failed to fetch tracking information")
      setTrackingModalOpen(false)
    }
  }

  const getStatusColor = (status: string) => {
    const statusConfig = ORDER_STATUSES.find((s) => s.value === status)
    return statusConfig?.color || "default"
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <Text strong className="text-[#0B8457]">
          {id}
        </Text>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: any[]) => (
        <div>
          <Text>{items.length} item(s)</Text>
          <br />
          <Text type="secondary" className="text-xs">
            {items[0]?.product.name}
            {items.length > 1 && ` +${items.length - 1} more`}
          </Text>
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: number) => <Text strong>{formatCurrency(total)}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>
      ),
    },
    {
      title: "Tracking",
      dataIndex: "trackingNumber",
      key: "trackingNumber",
      render: (trackingNumber: string) => (
        <Text type="secondary" className="text-xs">
          {trackingNumber || "N/A"}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Order) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} onClick={() => setSelectedOrder(record)} size="small">
            View
          </Button>
          {record.trackingNumber && (
            <Button type="text" icon={<TruckOutlined />} onClick={() => handleTrackOrder(record.id)} size="small">
              Track
            </Button>
          )}
          <Button type="text" icon={<ReloadOutlined />} onClick={() => handleReorder(record.id)} size="small">
            Reorder
          </Button>
          {(record.status === "pending" || record.status === "processing") && (
            <Button
              type="text"
              danger
              icon={<StopOutlined />}
              onClick={() => handleCancelOrder(record.id)}
              size="small"
            >
              Cancel
            </Button>
          )}
        </Space>
      ),
    },
  ]

  if (isLoading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={2}>My Orders</Title>
          <Text type="secondary">Track and manage your orders</Text>
        </div>
        <Button icon={<ReloadOutlined />} onClick={fetchOrders} loading={isLoading}>
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <Search
            placeholder="Search orders or products..."
            allowClear
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
            prefix={<SearchOutlined />}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B8457]"
          >
            <option value="all">All Status</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <Table
          dataSource={filteredOrders}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} orders`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Order Details Modal */}
      <Modal
        title={`Order Details - ${selectedOrder?.id}`}
        open={!!selectedOrder}
        onCancel={() => setSelectedOrder(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedOrder(null)}>
            Close
          </Button>,
          selectedOrder?.trackingNumber && (
            <Button
              key="track"
              type="primary"
              icon={<TruckOutlined />}
              onClick={() => {
                handleTrackOrder(selectedOrder.id)
                setSelectedOrder(null)
              }}
            >
              Track Order
            </Button>
          ),
        ]}
        width={600}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text strong>Order Date:</Text>
                <br />
                <Text>{formatDate(selectedOrder.createdAt)}</Text>
              </div>
              <div>
                <Text strong>Status:</Text>
                <br />
                <Tag color={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </Tag>
              </div>
              <div>
                <Text strong>Total:</Text>
                <br />
                <Text strong className="text-lg text-[#0B8457]">
                  {formatCurrency(selectedOrder.total)}
                </Text>
              </div>
              <div>
                <Text strong>Tracking Number:</Text>
                <br />
                <Text>{selectedOrder.trackingNumber || "N/A"}</Text>
              </div>
            </div>

            <div>
              <Text strong>Shipping Address:</Text>
              <div className="mt-2 p-3 bg-gray-50 rounded">
                <Text>{selectedOrder.shippingAddress.fullName}</Text>
                <br />
                <Text>{selectedOrder.shippingAddress.streetAddress}</Text>
                <br />
                <Text>
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}
                </Text>
                <br />
                <Text>{selectedOrder.shippingAddress.country}</Text>
              </div>
            </div>

            <div>
              <Text strong>Items:</Text>
              <div className="mt-2 space-y-2">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <Text strong>{item.product.name}</Text>
                      <br />
                      <Text type="secondary">
                        Qty: {item.quantity} × {formatCurrency(item.product.price)}
                      </Text>
                    </div>
                    <Text strong>{formatCurrency(item.product.price * item.quantity)}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Tracking Modal */}
      <Modal
        title="Order Tracking"
        open={trackingModalOpen}
        onCancel={() => {
          setTrackingModalOpen(false)
          setTrackingData(null)
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setTrackingModalOpen(false)
              setTrackingData(null)
            }}
          >
            Close
          </Button>,
        ]}
        width={600}
      >
        {trackingData ? (
          <div className="space-y-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Text strong className="text-lg">
                Current Status: {trackingData.status}
              </Text>
              <br />
              <Text type="secondary">Location: {trackingData.location}</Text>
              <br />
              <Text type="secondary">Estimated Delivery: {formatDate(trackingData.estimatedDelivery)}</Text>
            </div>

            <div>
              <Text strong className="text-lg mb-4 block">
                Tracking History
              </Text>
              <Timeline
                items={trackingData.updates.map((update: any, index: number) => ({
                  dot: index === 0 ? <ClockCircleOutlined className="text-[#0B8457]" /> : undefined,
                  color: index === 0 ? "#0B8457" : "gray",
                  children: (
                    <div>
                      <Text strong>{update.status}</Text>
                      <br />
                      <Text type="secondary">{formatDate(update.date)}</Text>
                      <br />
                      <Text type="secondary">{update.location}</Text>
                      <br />
                      <Text>{update.description}</Text>
                    </div>
                  ),
                }))}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Spin size="large" />
            <br />
            <Text type="secondary">Loading tracking information...</Text>
          </div>
        )}
      </Modal>
    </div>
  )
}
