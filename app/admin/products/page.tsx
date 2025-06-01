"use client"

import { useState, useEffect } from "react"
import {
  Card,
  Table,
  Button,
  Select,
  Input,
  Space,
  Modal,
  Form,
  Typography,
  InputNumber,
  Switch,
  Upload,
  message,
  Tag,
  Image,
  Popconfirm,
} from "antd"
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, useCategories } from "@/lib/hooks/useApi"
import { formatCurrency } from "@/lib/utils"
import type { Product, CreateProductRequest, UpdateProductRequest } from "@/lib/api/types"
import { useSearchParams } from "next/navigation"

const { Title, Text } = Typography
const { Option } = Select
const { Search } = Input
const { TextArea } = Input

export default function AdminProductsPage() {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [stockFilter, setStockFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form] = Form.useForm()

  // Handle URL parameters
  useEffect(() => {
    const stockStatus = searchParams.get("stockStatus")
    const editId = searchParams.get("edit")

    if (stockStatus) {
      setStockFilter(stockStatus)
    }

    if (editId) {
      // Find and edit product
      // This would typically fetch the product by ID
      setModalVisible(true)
    }
  }, [searchParams])

  const { data: productsData, isLoading } = useProducts({
    page: currentPage,
    limit: pageSize,
    category: categoryFilter === "all" ? undefined : categoryFilter,
    search: searchTerm || undefined,
    stockStatus: stockFilter === "all" ? undefined : stockFilter,
  })

  const { data: categoriesData } = useCategories({ limit: 100 })

  const createProductMutation = useCreateProduct()
  const updateProductMutation = useUpdateProduct()
  const deleteProductMutation = useDeleteProduct()

  const products = productsData?.data.items || []
  const total = productsData?.data.total || 0
  const categories = categoriesData?.data.items || []

  const handleSubmit = async (values: CreateProductRequest | UpdateProductRequest) => {
    try {
      if (editingProduct) {
        await updateProductMutation.mutateAsync({
          id: editingProduct.id,
          data: values as UpdateProductRequest,
        })
        message.success("Product updated successfully!")
      } else {
        await createProductMutation.mutateAsync(values as CreateProductRequest)
        message.success("Product created successfully!")
      }
      setModalVisible(false)
      setEditingProduct(null)
      form.resetFields()
    } catch (error) {
      message.error("Failed to save product")
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setModalVisible(true)
    form.setFieldsValue({
      ...product,
      inStock: product.inStock,
    })
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setModalVisible(true)
    form.resetFields()
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProductMutation.mutateAsync(id)
      message.success("Product deleted successfully!")
    } catch (error) {
      message.error("Failed to delete product")
    }
  }

  const getStockStatus = (product: Product) => {
    if (product.stockQuantity === 0) {
      return { color: "red", icon: <StopOutlined />, text: "Out of Stock" }
    } else if (product.stockQuantity <= 10) {
      return { color: "orange", icon: <ExclamationCircleOutlined />, text: "Low Stock" }
    } else {
      return { color: "green", icon: <CheckCircleOutlined />, text: "In Stock" }
    }
  }

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 80,
      render: (image: string, record: Product) => (
        <Image
          src={image || "/placeholder.svg"}
          alt={record.name}
          width={50}
          height={50}
          className="rounded-lg object-cover"
          fallback="/placeholder.svg?height=50&width=50"
        />
      ),
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Product) => (
        <div>
          <Text strong className="font-inter">
            {name}
          </Text>
          <br />
          <Text type="secondary" className="font-inter text-sm">
            {record.category}
          </Text>
          {record.sku && (
            <>
              <br />
              <Text type="secondary" className="font-inter text-xs">
                SKU: {record.sku}
              </Text>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number, record: Product) => (
        <div>
          <Text strong className="font-inter">
            {formatCurrency(price)}
          </Text>
          <br />
          <Text type="secondary" className="font-inter text-sm">
            {record.unit}
          </Text>
          {record.discount && (
            <>
              <br />
              <Text type="secondary" className="font-inter text-xs text-red-500">
                -{record.discount}% off
              </Text>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stockQuantity",
      key: "stock",
      render: (stock: number, record: Product) => {
        const status = getStockStatus(record)
        return (
          <div>
            <Text className="font-inter">{stock} units</Text>
            <br />
            <Tag color={status.color} size="small" className="font-inter" icon={status.icon}>
              {status.text}
            </Tag>
          </div>
        )
      },
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
      render: (origin: string) => <Text className="font-inter text-sm">{origin}</Text>,
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      render: (featured: boolean) => <Switch checked={featured} disabled size="small" />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Product) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => window.open(`/products/${record.id}`, "_blank")}
          >
            View
          </Button>
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} size="small">
            Edit
          </Button>
          <Popconfirm
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <Title level={2} className="font-poppins mb-2">
            Product Management
          </Title>
          <Text type="secondary" className="font-inter">
            Manage your product catalog and inventory
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="font-inter">
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <Search
            placeholder="Search products..."
            allowClear
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 font-inter"
            prefix={<SearchOutlined />}
          />
          <Select value={categoryFilter} onChange={setCategoryFilter} className="w-full sm:w-48 font-inter">
            <Option value="all">All Categories</Option>
            {categories.map((category) => (
              <Option key={category.id} value={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
          <Select value={stockFilter} onChange={setStockFilter} className="w-full sm:w-48 font-inter">
            <Option value="all">All Stock Status</Option>
            <Option value="in">In Stock</Option>
            <Option value="low">Low Stock</Option>
            <Option value="out">Out of Stock</Option>
          </Select>
        </div>
      </Card>

      {/* Products Table */}
      <Card>
        <Table
          dataSource={products}
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
              <span className="font-inter">
                {range[0]}-{range[1]} of {total} products
              </span>
            ),
            onChange: (page, size) => {
              setCurrentPage(page)
              setPageSize(size || 10)
            },
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Add/Edit Product Modal */}
      <Modal
        title={<span className="font-poppins">{editingProduct ? "Edit Product" : "Add New Product"}</span>}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          setEditingProduct(null)
          form.resetFields()
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setModalVisible(false)
              setEditingProduct(null)
              form.resetFields()
            }}
            className="font-inter"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            loading={createProductMutation.isPending || updateProductMutation.isPending}
            className="font-inter"
          >
            {editingProduct ? "Update Product" : "Create Product"}
          </Button>,
        ]}
        width={900}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label={<span className="font-inter">Product Name</span>}
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input placeholder="Enter product name" className="font-inter" />
            </Form.Item>

            <Form.Item name="sku" label={<span className="font-inter">SKU (Optional)</span>}>
              <Input placeholder="Enter SKU" className="font-inter" />
            </Form.Item>

            <Form.Item
              name="category"
              label={<span className="font-inter">Category</span>}
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select placeholder="Select category" className="font-inter">
                {categories.map((category) => (
                  <Option key={category.id} value={category.name}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="price"
              label={<span className="font-inter">Price ($)</span>}
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                placeholder="0.00"
                className="w-full font-inter"
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item
              name="unit"
              label={<span className="font-inter">Unit</span>}
              rules={[{ required: true, message: "Please enter unit" }]}
            >
              <Input placeholder="e.g., per 1kg, per bottle" className="font-inter" />
            </Form.Item>

            <Form.Item
              name="stockQuantity"
              label={<span className="font-inter">Stock Quantity</span>}
              rules={[{ required: true, message: "Please enter stock quantity" }]}
            >
              <InputNumber min={0} placeholder="0" className="w-full font-inter" />
            </Form.Item>

            <Form.Item
              name="origin"
              label={<span className="font-inter">Origin</span>}
              rules={[{ required: true, message: "Please enter origin" }]}
            >
              <Input placeholder="e.g., Lagos State, Nigeria" className="font-inter" />
            </Form.Item>

            <Form.Item name="weight" label={<span className="font-inter">Weight (Optional)</span>}>
              <Input placeholder="e.g., 1kg, 500g" className="font-inter" />
            </Form.Item>

            <Form.Item name="discount" label={<span className="font-inter">Discount % (Optional)</span>}>
              <InputNumber min={0} max={100} placeholder="0" className="w-full font-inter" />
            </Form.Item>

            <Form.Item
              name="minOrderQuantity"
              label={<span className="font-inter">Min Order Qty</span>}
              initialValue={1}
            >
              <InputNumber min={1} placeholder="1" className="w-full font-inter" />
            </Form.Item>

            <Form.Item name="maxOrderQuantity" label={<span className="font-inter">Max Order Qty (Optional)</span>}>
              <InputNumber min={1} placeholder="No limit" className="w-full font-inter" />
            </Form.Item>

            <Form.Item
              name="featured"
              label={<span className="font-inter">Featured Product</span>}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label={<span className="font-inter">Description</span>}
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea
              rows={4}
              placeholder="Enter product description"
              className="font-inter"
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="image"
            label={<span className="font-inter">Product Image URL</span>}
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input placeholder="https://example.com/image.jpg" className="font-inter" />
          </Form.Item>

          <Form.Item name="tags" label={<span className="font-inter">Tags (Optional)</span>}>
            <Select mode="tags" placeholder="Add tags" className="font-inter" tokenSeparators={[","]} />
          </Form.Item>

          <Form.Item label={<span className="font-inter">Upload Image (Alternative)</span>}>
            <Upload
              name="productImage"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div className="font-inter mt-2">Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
