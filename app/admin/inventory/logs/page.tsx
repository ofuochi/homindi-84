"use client"

import { useState } from "react"
import {
  Card,
  Table,
  Button,
  Select,
  DatePicker,
  Typography,
  Tag,
  Modal,
  Form,
  InputNumber,
  Input,
  message,
} from "antd"
import {
  HistoryOutlined,
  PlusOutlined,
  MinusOutlined,
  EditOutlined,
  ShoppingOutlined,
  UndoOutlined,
} from "@ant-design/icons"
import { useInventoryLogs, useAdjustStock, useProducts } from "@/lib/hooks/useApi"
import type { InventoryLog, StockAdjustmentRequest } from "@/lib/api/types"
import dayjs from "dayjs"

const { Title, Text } = Typography
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

export default function InventoryLogsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [productFilter, setProductFilter] = useState<string>("all")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()

  const { data: logsData, isLoading } = useInventoryLogs({
    page: currentPage,
    limit: pageSize,
    productId: productFilter === "all" ? undefined : productFilter,
  })

  const { data: productsData } = useProducts({ limit: 100 })
  const adjustStockMutation = useAdjustStock()

  const logs = logsData?.data.items || []
  const total = logsData?.data.total || 0
  const products = productsData?.data.items || []

  const handleStockAdjustment = async (values: StockAdjustmentRequest) => {
    try {
      await adjustStockMutation.mutateAsync(values)
      message.success("Stock adjustment completed successfully!")
      setModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error("Failed to adjust stock")
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "stock_in":
        return <PlusOutlined className="text-green-500" />
      case "stock_out":
        return <MinusOutlined className="text-red-500" />
      case "adjustment":
        return <EditOutlined className="text-blue-500" />
      case "sale":
        return <ShoppingOutlined className="text-purple-500" />
      case "return":
        return <UndoOutlined className="text-orange-500" />
      default:
        return <HistoryOutlined />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "stock_in":
        return "green"
      case "stock_out":
        return "red"
      case "adjustment":
        return "blue"
      case "sale":
        return "purple"
      case "return":
        return "orange"
      default:
        return "default"
    }
  }

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date: string) => <Text className="font-roboto text-sm">{dayjs(date).format("MMM DD, YYYY HH:mm")}</Text>,
    },
    {
      title: "Product",
      dataIndex: "productId",
      key: "product",
      render: (productId: string) => {
        const product = products.find((p) => p.id === productId)
        return (
          <div>
            <Text strong className="font-roboto">
              {product?.name || `Product ${productId}`}
            </Text>
            <br />
            <Text type="secondary" className="font-roboto text-sm">
              {product?.category}
            </Text>
          </div>
        )
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action: string) => (
        <Tag color={getActionColor(action)} icon={getActionIcon(action)} className="font-roboto">
          {action.replace("_", " ").toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, record: InventoryLog) => (
        <Text className={`font-roboto font-medium ${quantity > 0 ? "text-green-600" : "text-red-600"}`}>
          {quantity > 0 ? "+" : ""}
          {quantity}
        </Text>
      ),
    },
    {
      title: "Stock Change",
      key: "stockChange",
      render: (record: InventoryLog) => (
        <div className="font-roboto text-sm">
          <Text>{record.previousStock}</Text>
          <Text type="secondary"> → </Text>
          <Text strong>{record.newStock}</Text>
        </div>
      ),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: (reason: string) => <Text className="font-roboto text-sm">{reason || "-"}</Text>,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <Title level={2} className="font-roboto mb-2">
            Stock History
          </Title>
          <Text type="secondary" className="font-roboto">
            Track all inventory movements and adjustments
          </Text>
        </div>
        <Button type="primary" icon={<EditOutlined />} onClick={() => setModalVisible(true)} className="font-roboto">
          Adjust Stock
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            value={productFilter}
            onChange={setProductFilter}
            className="w-full sm:w-48 font-roboto"
            placeholder="Filter by product"
          >
            <Option value="all">All Products</Option>
            {products.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
          <Select
            value={actionFilter}
            onChange={setActionFilter}
            className="w-full sm:w-48 font-roboto"
            placeholder="Filter by action"
          >
            <Option value="all">All Actions</Option>
            <Option value="stock_in">Stock In</Option>
            <Option value="stock_out">Stock Out</Option>
            <Option value="adjustment">Adjustment</Option>
            <Option value="sale">Sale</Option>
            <Option value="return">Return</Option>
          </Select>
          <RangePicker className="font-roboto" />
        </div>
      </Card>

      {/* Logs Table */}
      <Card>
        <Table
          dataSource={logs}
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
                {range[0]}-{range[1]} of {total} records
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

      {/* Stock Adjustment Modal */}
      <Modal
        title={<span className="font-roboto">Adjust Stock</span>}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setModalVisible(false)
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
            loading={adjustStockMutation.isPending}
            className="font-roboto"
          >
            Adjust Stock
          </Button>,
        ]}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleStockAdjustment}>
          <Form.Item
            name="productId"
            label={<span className="font-roboto">Product</span>}
            rules={[{ required: true, message: "Please select a product" }]}
          >
            <Select placeholder="Select product" className="font-roboto">
              {products.map((product) => (
                <Option key={product.id} value={product.id}>
                  {product.name} (Current: {product.stockQuantity})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="action"
            label={<span className="font-roboto">Action Type</span>}
            rules={[{ required: true, message: "Please select an action" }]}
          >
            <Select placeholder="Select action" className="font-roboto">
              <Option value="stock_in">Stock In</Option>
              <Option value="stock_out">Stock Out</Option>
              <Option value="adjustment">Adjustment</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label={<span className="font-roboto">Quantity</span>}
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <InputNumber placeholder="Enter quantity" className="w-full font-roboto" min={1} />
          </Form.Item>

          <Form.Item name="reason" label={<span className="font-roboto">Reason (Optional)</span>}>
            <TextArea
              rows={3}
              placeholder="Enter reason for stock adjustment"
              className="font-roboto"
              maxLength={200}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
