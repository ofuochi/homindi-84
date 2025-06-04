"use client"

import { useState } from "react"
import {
  Card,
  Table,
  Tag,
  Button,
  Select,
  Input,
  Space,
  Modal,
  Form,
  Typography,
  Row,
  Col,
  Statistic,
  message,
  Alert,
} from "antd"
import {
  EyeOutlined,
  EditOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  ReloadOutlined,
} from "@ant-design/icons"
import { useOrders, useUpdateOrderStatus } from "@/lib/hooks/useApi"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { Order, UpdateOrderStatusRequest } from "@/lib/api/types"

const { Title, Text } = Typography
const { Option } = Select
const { Search } = Input

export default function AdminOrdersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusModalVisible, setStatusModalVisible] = useState(false)
  const [form] = Form.useForm()

  const {
    data: ordersData,
    isLoading,
    error,
    refetch,
  } = useOrders({
    page: currentPage,
    limit: pageSize,
    status: statusFilter === "all" ? undefined : statusFilter,
  })

  const updateOrderStatusMutation = useUpdateOrderStatus()

  const orders = ordersData?.data.items || []
  const total = ordersData?.data.total || 0

  const handleStatusUpdate = async (values: UpdateOrderStatusRequest) => {
    if (!selectedOrder) return

    try {
      await updateOrderStatusMutation.mutateAsync({
        id: selectedOrder.id,
        data: values,
      })
      message.success("Order status updated successfully!")
      setStatusModalVisible(false)
      setSelectedOrder(null)
      form.resetFields()
    } catch (error) {
      message.error("Failed to update order status")
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "orange",
      processing: "blue",
      shipped: "purple",
      delivered: "green",
      cancelled: "red",
    }
    return colors[status as keyof typeof colors] || "default"
  }

  const getStatusCounts = () => {
    const counts = {
      all: total,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    }

    orders.forEach((order) => {
      if (order.status in counts) {
        counts[order.status as keyof typeof counts]++
      }
    })

    return counts
  }

  const statusCounts = getStatusCounts()

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <Text strong className="text-[#0B8457] font-roboto">
          {id}
        </Text>
      ),
    },
    {
      title: "Customer",
      dataIndex: "shippingAddress",
      key: "customer",
      render: (address: any) => (
        <div>
          <Text className="font-roboto font-medium">{address.fullName}</Text>
          <br />
          <Text type="secondary" className="font-roboto text-sm">
            {address.email}
          </Text>
        </div>
      ),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: any[]) => (
        <div>
          <Text className="font-roboto">{items.length} item(s)</Text>
          <br />
          <Text type="secondary" className="font-roboto text-sm">
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
      render: (total: number) => (
        <Text strong className="font-roboto">
          {formatCurrency(total)}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)} className="font-roboto">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => <Text className="font-roboto text-sm">{formatDate(date)}</Text>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Order) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} onClick={() => setSelectedOrder(record)} size="small">
            View
          </Button>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedOrder(record)
              setStatusModalVisible(true)
              form.setFieldsValue({
                status: record.status,
                trackingNumber: record.trackingNumber,
              })
            }}
            size="small"
          >
            Update
          </Button>
        </Space>
      ),
    },
  ]

  if (error) {
    return (
      <Alert
        message="Error Loading Orders"
        description="Failed to load orders. Please try again."
        type="error"
        showIcon
        action={
          <Button size="small" onClick={() => refetch()}>
            Retry
          </Button>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <Title level={2} className="font-roboto mb-2">
            Order Management
          </Title>
          <Text type="secondary" className="font-roboto">
            Manage and track all customer orders
          </Text>
        </div>
        <Space wrap>
          <Button icon={<ExportOutlined />} className="font-roboto">
            Export
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => refetch()} loading={isLoading} className="font-roboto">
            Refresh
          </Button>
        </Space>
      </div>

      {/* Status Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} lg={4}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto text-sm">Total</span>}
              value={statusCounts.all}
              valueStyle={{ fontSize: "20px", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto text-sm">Pending</span>}
              value={statusCounts.pending}
              valueStyle={{ fontSize: "20px", color: "#fa8c16", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto text-sm">Processing</span>}
              value={statusCounts.processing}
              valueStyle={{ fontSize: "20px", color: "#1890ff", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto text-sm">Shipped</span>}
              value={statusCounts.shipped}
              valueStyle={{ fontSize: "20px", color: "#722ed1", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto text-sm">Delivered</span>}
              value={statusCounts.delivered}
              valueStyle={{ fontSize: "20px", color: "#52c41a", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto text-sm">Cancelled</span>}
              value={statusCounts.cancelled}
              valueStyle={{ fontSize: "20px", color: "#ff4d4f", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <Search
            placeholder="Search orders..."
            allowClear
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 font-roboto"
            prefix={<SearchOutlined />}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-full sm:w-48 font-roboto"
            prefix={<FilterOutlined />}
          >
            <Option value="all">All Status</Option>
            <Option value="pending">Pending</Option>
            <Option value="processing">Processing</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => (
              <span className="font-roboto">
                {range[0]}-{range[1]} of {total} orders
              </span>
            ),
            onChange: (page, size) => {
              setCurrentPage(page)
              setPageSize(size || 10)
            },
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Order Details Modal */}
      <Modal
        title={<span className="font-roboto">Order Details - {selectedOrder?.id}</span>}
        open={!!selectedOrder && !statusModalVisible}
        onCancel={() => setSelectedOrder(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedOrder(null)} className="font-roboto">
            Close
          </Button>,
          <Button
            key="update"
            type="primary"
            onClick={() => {
              setStatusModalVisible(true)
              form.setFieldsValue({
                status: selectedOrder?.status,
                trackingNumber: selectedOrder?.trackingNumber,
              })
            }}
            className="font-roboto"
          >
            Update Status
          </Button>,
        ]}
        width={700}
      >
        {selectedOrder && (
          <div className="space-y-6">
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <div>
                  <Text strong className="font-roboto">
                    Order Date:
                  </Text>
                  <br />
                  <Text className="font-roboto">{formatDate(selectedOrder.createdAt)}</Text>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong className="font-roboto">
                    Status:
                  </Text>
                  <br />
                  <Tag color={getStatusColor(selectedOrder.status)} className="font-roboto">
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Tag>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong className="font-roboto">
                    Total:
                  </Text>
                  <br />
                  <Text strong className="text-lg text-[#0B8457] font-roboto">
                    {formatCurrency(selectedOrder.total)}
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong className="font-roboto">
                    Tracking Number:
                  </Text>
                  <br />
                  <Text className="font-roboto">{selectedOrder.trackingNumber || "N/A"}</Text>
                </div>
              </Col>
            </Row>

            <div>
              <Text strong className="font-roboto">
                Customer Information:
              </Text>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <Text className="font-roboto">{selectedOrder.shippingAddress.fullName}</Text>
                <br />
                <Text className="font-roboto">{selectedOrder.shippingAddress.email}</Text>
                <br />
                <Text className="font-roboto">{selectedOrder.shippingAddress.phone}</Text>
                <br />
                <Text className="font-roboto">
                  {selectedOrder.shippingAddress.streetAddress}, {selectedOrder.shippingAddress.city}
                </Text>
                <br />
                <Text className="font-roboto">
                  {selectedOrder.shippingAddress.postalCode}, {selectedOrder.shippingAddress.country}
                </Text>
              </div>
            </div>

            <div>
              <Text strong className="font-roboto">
                Order Items:
              </Text>
              <div className="mt-2 space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <Text strong className="font-roboto">
                        {item.product.name}
                      </Text>
                      <br />
                      <Text type="secondary" className="font-roboto text-sm">
                        Qty: {item.quantity} × {formatCurrency(item.product.price)}
                      </Text>
                    </div>
                    <Text strong className="font-roboto">
                      {formatCurrency(item.product.price * item.quantity)}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Update Status Modal */}
      <Modal
        title={<span className="font-roboto">Update Order Status</span>}
        open={statusModalVisible}
        onCancel={() => {
          setStatusModalVisible(false)
          form.resetFields()
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setStatusModalVisible(false)
              form.resetFields()
            }}
            className="font-roboto"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            loading={updateOrderStatusMutation.isPending}
            className="font-roboto"
          >
            Update Status
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleStatusUpdate}>
          <Form.Item
            name="status"
            label={<span className="font-roboto">Order Status</span>}
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select className="font-roboto">
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="shipped">Shipped</Option>
              <Option value="delivered">Delivered</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
          <Form.Item name="trackingNumber" label={<span className="font-roboto">Tracking Number</span>}>
            <Input placeholder="Enter tracking number" className="font-roboto" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
