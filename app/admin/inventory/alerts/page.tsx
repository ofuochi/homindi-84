"use client"

import { useState } from "react"
import { Card, Table, Button, Tag, Space, Input, Select, Badge, Alert, Typography, Row, Col, Statistic } from "antd"
import {
  AlertOutlined,
  SearchOutlined,
  ReloadOutlined,
  ExportOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
} from "@ant-design/icons"

const { Title } = Typography
const { Search } = Input

export default function LowStockAlertsPage() {
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Mock data - replace with real API calls
  const lowStockData = [
    {
      key: "1",
      id: "PRD-001",
      name: "Jollof Rice Mix",
      category: "Spices & Seasonings",
      currentStock: 5,
      threshold: 20,
      supplier: "African Spice Co.",
      lastRestocked: "2024-01-10",
      status: "critical",
      estimatedDaysLeft: 2,
    },
    {
      key: "2",
      id: "PRD-002",
      name: "Palm Oil (500ml)",
      category: "Oils & Vinegars",
      currentStock: 3,
      threshold: 15,
      supplier: "West African Imports",
      lastRestocked: "2024-01-08",
      status: "critical",
      estimatedDaysLeft: 1,
    },
    {
      key: "3",
      id: "PRD-003",
      name: "Plantain Chips",
      category: "Snacks",
      currentStock: 8,
      threshold: 25,
      supplier: "Tropical Snacks Ltd",
      lastRestocked: "2024-01-12",
      status: "low",
      estimatedDaysLeft: 5,
    },
    {
      key: "4",
      id: "PRD-004",
      name: "Cassava Flour",
      category: "Flours & Grains",
      currentStock: 12,
      threshold: 30,
      supplier: "African Grains Co.",
      lastRestocked: "2024-01-09",
      status: "low",
      estimatedDaysLeft: 7,
    },
    {
      key: "5",
      id: "PRD-005",
      name: "Scotch Bonnet Peppers",
      category: "Fresh Produce",
      currentStock: 2,
      threshold: 10,
      supplier: "Fresh African Produce",
      lastRestocked: "2024-01-14",
      status: "critical",
      estimatedDaysLeft: 1,
    },
  ]

  const columns = [
    {
      title: "Product",
      key: "product",
      render: (record: any) => (
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-xs text-gray-500">{record.id}</div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <Tag>{category}</Tag>,
    },
    {
      title: "Stock Level",
      key: "stock",
      render: (record: any) => (
        <div className="text-center">
          <Badge
            count={record.currentStock}
            style={{
              backgroundColor: record.status === "critical" ? "#ff4d4f" : "#faad14",
            }}
          />
          <div className="text-xs text-gray-500 mt-1">Threshold: {record.threshold}</div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const config = {
          critical: { color: "red", icon: <WarningOutlined /> },
          low: { color: "orange", icon: <AlertOutlined /> },
        }
        const { color, icon } = config[status as keyof typeof config]
        return (
          <Tag color={color} icon={icon}>
            {status.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: "Days Left",
      dataIndex: "estimatedDaysLeft",
      key: "estimatedDaysLeft",
      render: (days: number) => (
        <span className={days <= 2 ? "text-red-600 font-bold" : days <= 5 ? "text-orange-600" : ""}>{days} days</span>
      ),
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "Last Restocked",
      dataIndex: "lastRestocked",
      key: "lastRestocked",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Button type="primary" size="small" icon={<ShoppingCartOutlined />}>
            Reorder
          </Button>
          <Button size="small">Edit</Button>
        </Space>
      ),
    },
  ]

  const criticalItems = lowStockData.filter((item) => item.status === "critical").length
  const lowItems = lowStockData.filter((item) => item.status === "low").length
  const totalValue = lowStockData.reduce((sum, item) => sum + item.currentStock * 15.99, 0) // Mock calculation

  const handleReorderAll = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const filteredData = lowStockData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.id.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Title level={2} className="mb-2 font-roboto">
            <AlertOutlined className="text-orange-500 mr-2" />
            Low Stock Alerts
          </Title>
          <p className="text-gray-600 font-roboto">Monitor and manage products that are running low on inventory</p>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
            Refresh
          </Button>
          <Button icon={<ExportOutlined />}>Export Report</Button>
          <Button type="primary" loading={loading} onClick={handleReorderAll}>
            Reorder All Critical
          </Button>
        </Space>
      </div>

      {/* Alert Summary */}
      <Alert
        message="Immediate Action Required"
        description={`${criticalItems} products are critically low and need immediate restocking. ${lowItems} additional products are below recommended levels.`}
        type="warning"
        showIcon
        className="mb-6"
      />

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Critical Items"
              value={criticalItems}
              valueStyle={{ color: "#ff4d4f" }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Low Stock Items"
              value={lowItems}
              valueStyle={{ color: "#faad14" }}
              prefix={<AlertOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Value at Risk"
              value={totalValue}
              precision={2}
              prefix="$"
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Card>
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search products..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              style={{ width: "100%" }}
              placeholder="Filter by category"
              value={categoryFilter}
              onChange={setCategoryFilter}
            >
              <Select.Option value="all">All Categories</Select.Option>
              <Select.Option value="Spices & Seasonings">Spices & Seasonings</Select.Option>
              <Select.Option value="Oils & Vinegars">Oils & Vinegars</Select.Option>
              <Select.Option value="Snacks">Snacks</Select.Option>
              <Select.Option value="Flours & Grains">Flours & Grains</Select.Option>
              <Select.Option value="Fresh Produce">Fresh Produce</Select.Option>
            </Select>
          </Col>
        </Row>

        {/* Low Stock Table */}
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  )
}
