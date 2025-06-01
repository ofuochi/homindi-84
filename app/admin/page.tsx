"use client"

import { useState, useEffect } from "react"
import { Card, Row, Col, Statistic, Progress, Table, Tag, Button, Space, Typography, Alert, Badge } from "antd"
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  InboxOutlined,
  AlertOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
import Link from "next/link"

const { Title, Text } = Typography

export default function AdminDashboard() {
  const { user, userRole, roleInfo, hasPermission } = useClerkAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock data - replace with real API calls
  const dashboardStats = {
    totalOrders: 1247,
    totalUsers: 892,
    totalRevenue: 45678.9,
    totalProducts: 156,
    pendingOrders: 23,
    lowStockItems: 8,
    activeUsers: 234,
    conversionRate: 3.2,
  }

  const recentOrders = [
    {
      key: "1",
      orderId: "ORD-001",
      customer: "John Doe",
      amount: 125.5,
      status: "pending",
      date: "2024-01-15",
    },
    {
      key: "2",
      orderId: "ORD-002",
      customer: "Jane Smith",
      amount: 89.99,
      status: "shipped",
      date: "2024-01-15",
    },
    {
      key: "3",
      orderId: "ORD-003",
      customer: "Mike Johnson",
      amount: 234.75,
      status: "delivered",
      date: "2024-01-14",
    },
  ]

  const lowStockProducts = [
    { key: "1", name: "Jollof Rice Mix", stock: 5, threshold: 20, category: "Spices" },
    { key: "2", name: "Palm Oil", stock: 3, threshold: 15, category: "Oils" },
    { key: "3", name: "Plantain Chips", stock: 8, threshold: 25, category: "Snacks" },
  ]

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text: string) => <Text code>{text}</Text>,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          pending: "orange",
          shipped: "blue",
          delivered: "green",
          cancelled: "red",
        }
        return <Tag color={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Tag>
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: any) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} />
          {hasPermission("orders.manage") && <Button size="small" icon={<EditOutlined />} />}
        </Space>
      ),
    },
  ]

  const stockColumns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <Tag>{category}</Tag>,
    },
    {
      title: "Current Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number, record: any) => (
        <Badge
          count={stock}
          style={{
            backgroundColor: stock <= 5 ? "#ff4d4f" : stock <= 10 ? "#faad14" : "#52c41a",
          }}
        />
      ),
    },
    {
      title: "Threshold",
      dataIndex: "threshold",
      key: "threshold",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: any) => (
        <Space>
          {hasPermission("inventory.manage") && (
            <Button size="small" type="primary">
              Restock
            </Button>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0B8457] to-[#0a7249] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <Title level={2} className="text-white mb-2 font-poppins">
              Welcome back, {user?.firstName}! 👋
            </Title>
            <Text className="text-white/80 font-inter">
              You're logged in as <strong>{roleInfo?.name}</strong>. Here's what's happening with your platform today.
            </Text>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <DollarOutlined className="text-3xl text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title="Total Orders"
              value={dashboardStats.totalOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#0B8457" }}
            />
            <div className="mt-2">
              <Text type="success">
                <RiseOutlined /> 12% from last month
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title="Total Users"
              value={dashboardStats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
            <div className="mt-2">
              <Text type="success">
                <RiseOutlined /> 8% from last month
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title="Revenue"
              value={dashboardStats.totalRevenue}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: "#52c41a" }}
            />
            <div className="mt-2">
              <Text type="danger">
                <FallOutlined /> 3% from last month
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading} className="text-center">
            <Statistic
              title="Products"
              value={dashboardStats.totalProducts}
              prefix={<InboxOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
            <div className="mt-2">
              <Text type="success">
                <RiseOutlined /> 5% from last month
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Alerts and Quick Actions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="System Alerts" extra={<Button size="small">View All</Button>}>
            <Space direction="vertical" className="w-full">
              <Alert
                message="Low Stock Alert"
                description={`${dashboardStats.lowStockItems} products are running low on stock`}
                type="warning"
                showIcon
                action={
                  <Link href="/admin/inventory/alerts">
                    <Button size="small" type="primary">
                      View Details
                    </Button>
                  </Link>
                }
              />
              <Alert
                message="Pending Orders"
                description={`${dashboardStats.pendingOrders} orders are waiting for processing`}
                type="info"
                showIcon
                action={
                  <Link href="/admin/orders?status=pending">
                    <Button size="small">Process Orders</Button>
                  </Link>
                }
              />
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick Stats">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Active Users</Text>
                  <Text strong>{dashboardStats.activeUsers}</Text>
                </div>
                <Progress percent={75} size="small" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Conversion Rate</Text>
                  <Text strong>{dashboardStats.conversionRate}%</Text>
                </div>
                <Progress percent={dashboardStats.conversionRate * 10} size="small" status="active" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <Text>Order Fulfillment</Text>
                  <Text strong>94%</Text>
                </div>
                <Progress percent={94} size="small" strokeColor="#52c41a" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders and Low Stock */}
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card
            title="Recent Orders"
            extra={
              <Link href="/admin/orders">
                <Button type="primary" size="small">
                  View All Orders
                </Button>
              </Link>
            }
          >
            <Table columns={orderColumns} dataSource={recentOrders} pagination={false} size="small" loading={loading} />
          </Card>
        </Col>
        <Col xs={24} xl={10}>
          <Card
            title={
              <span>
                <AlertOutlined className="text-orange-500 mr-2" />
                Low Stock Products
              </span>
            }
            extra={
              <Link href="/admin/inventory/alerts">
                <Button type="primary" size="small">
                  Manage Stock
                </Button>
              </Link>
            }
          >
            <Table
              columns={stockColumns}
              dataSource={lowStockProducts}
              pagination={false}
              size="small"
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
