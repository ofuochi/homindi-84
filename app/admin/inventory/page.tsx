"use client"
import { Card, Row, Col, Statistic, Typography, Table, Tag, Button, Space, Alert, Progress } from "antd"
import {
  InboxOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  EditOutlined,
  HistoryOutlined,
} from "@ant-design/icons"
import { useProducts, useAdminStats } from "@/lib/hooks/useApi"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const { Title, Text } = Typography

export default function InventoryOverviewPage() {
  const { data: productsData, isLoading: productsLoading } = useProducts({ limit: 100 })
  const { data: statsData, isLoading: statsLoading } = useAdminStats()

  const products = productsData?.data.items || []
  const stats = statsData?.data

  // Calculate inventory metrics
  const lowStockProducts = products.filter((p) => p.stockQuantity <= 10 && p.stockQuantity > 0)
  const outOfStockProducts = products.filter((p) => p.stockQuantity === 0)
  const inStockProducts = products.filter((p) => p.stockQuantity > 10)

  const totalInventoryValue = products.reduce((sum, product) => sum + product.price * product.stockQuantity, 0)

  const lowStockColumns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
        <div>
          <Text strong className="font-roboto">
            {name}
          </Text>
          <br />
          <Text type="secondary" className="font-roboto text-sm">
            {record.category}
          </Text>
        </div>
      ),
    },
    {
      title: "Current Stock",
      dataIndex: "stockQuantity",
      key: "stock",
      render: (stock: number) => (
        <Tag color={stock === 0 ? "red" : stock <= 5 ? "orange" : "yellow"} className="font-roboto">
          {stock} units
        </Tag>
      ),
    },
    {
      title: "Value",
      dataIndex: "price",
      key: "value",
      render: (price: number, record: any) => (
        <Text className="font-roboto">{formatCurrency(price * record.stockQuantity)}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Space size="small">
          <Link href={`/admin/products?edit=${record.id}`}>
            <Button type="text" icon={<EditOutlined />} size="small">
              Edit
            </Button>
          </Link>
          <Link href={`/admin/inventory/logs?productId=${record.id}`}>
            <Button type="text" icon={<HistoryOutlined />} size="small">
              History
            </Button>
          </Link>
        </Space>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <Title level={2} className="font-roboto mb-2">
            Inventory Overview
          </Title>
          <Text type="secondary" className="font-roboto">
            Monitor your inventory levels and stock status
          </Text>
        </div>
        <Space>
          <Link href="/admin/products">
            <Button type="primary" icon={<PlusOutlined />} className="font-roboto">
              Add Product
            </Button>
          </Link>
          <Link href="/admin/inventory/logs">
            <Button icon={<HistoryOutlined />} className="font-roboto">
              View Stock History
            </Button>
          </Link>
        </Space>
      </div>

      {/* Inventory Alerts */}
      {(outOfStockProducts.length > 0 || lowStockProducts.length > 0) && (
        <div className="space-y-4">
          {outOfStockProducts.length > 0 && (
            <Alert
              message={`${outOfStockProducts.length} products are out of stock`}
              description="These products need immediate restocking to avoid lost sales."
              type="error"
              showIcon
              icon={<StopOutlined />}
              action={
                <Link href="/admin/products?stockStatus=out">
                  <Button size="small" danger>
                    View Products
                  </Button>
                </Link>
              }
            />
          )}
          {lowStockProducts.length > 0 && (
            <Alert
              message={`${lowStockProducts.length} products are running low on stock`}
              description="Consider restocking these products soon."
              type="warning"
              showIcon
              icon={<ExclamationCircleOutlined />}
              action={
                <Link href="/admin/products?stockStatus=low">
                  <Button size="small">View Products</Button>
                </Link>
              }
            />
          )}
        </div>
      )}

      {/* Inventory Metrics */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto">Total Products</span>}
              value={stats?.totalProducts || products.length}
              prefix={<InboxOutlined />}
              valueStyle={{ color: "#0B8457", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto">In Stock</span>}
              value={inStockProducts.length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto">Low Stock</span>}
              value={lowStockProducts.length}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: "#fa8c16", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto">Out of Stock</span>}
              value={outOfStockProducts.length}
              prefix={<StopOutlined />}
              valueStyle={{ color: "#ff4d4f", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Inventory Value */}
        <Col xs={24} lg={8}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto">Total Inventory Value</span>}
              value={totalInventoryValue}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#0B8457", fontFamily: "var(--font-roboto)" }}
            />
            <Text type="secondary" className="font-roboto text-sm">
              Current stock value
            </Text>
          </Card>
        </Col>

        {/* Stock Distribution */}
        <Col xs={24} lg={16}>
          <Card title={<span className="font-roboto">Stock Distribution</span>}>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text className="font-roboto">In Stock ({inStockProducts.length})</Text>
                  <Text className="font-roboto text-sm text-gray-500">
                    {((inStockProducts.length / products.length) * 100).toFixed(1)}%
                  </Text>
                </div>
                <Progress
                  percent={(inStockProducts.length / products.length) * 100}
                  strokeColor="#52c41a"
                  showInfo={false}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text className="font-roboto">Low Stock ({lowStockProducts.length})</Text>
                  <Text className="font-roboto text-sm text-gray-500">
                    {((lowStockProducts.length / products.length) * 100).toFixed(1)}%
                  </Text>
                </div>
                <Progress
                  percent={(lowStockProducts.length / products.length) * 100}
                  strokeColor="#fa8c16"
                  showInfo={false}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text className="font-roboto">Out of Stock ({outOfStockProducts.length})</Text>
                  <Text className="font-roboto text-sm text-gray-500">
                    {((outOfStockProducts.length / products.length) * 100).toFixed(1)}%
                  </Text>
                </div>
                <Progress
                  percent={(outOfStockProducts.length / products.length) * 100}
                  strokeColor="#ff4d4f"
                  showInfo={false}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Low Stock Products */}
      {lowStockProducts.length > 0 && (
        <Card
          title={<span className="font-roboto">Products Requiring Attention</span>}
          extra={
            <Link href="/admin/products?stockStatus=low">
              <Button type="link" className="font-roboto">
                View All
              </Button>
            </Link>
          }
        >
          <Table
            dataSource={[...outOfStockProducts, ...lowStockProducts].slice(0, 10)}
            columns={lowStockColumns}
            pagination={false}
            rowKey="id"
            loading={productsLoading}
            size="small"
          />
        </Card>
      )}
    </div>
  )
}
