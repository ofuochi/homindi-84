"use client"

import { useState } from "react"
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  Typography,
  Switch,
  InputNumber,
  message,
  Image,
  Popconfirm,
} from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/lib/hooks/useApi"
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/lib/api/types"

const { Title, Text } = Typography
const { Search } = Input
const { TextArea } = Input

export default function AdminCategoriesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [form] = Form.useForm()

  const { data: categoriesData, isLoading } = useCategories({
    page: currentPage,
    limit: pageSize,
  })

  const createCategoryMutation = useCreateCategory()
  const updateCategoryMutation = useUpdateCategory()
  const deleteCategoryMutation = useDeleteCategory()

  const categories = categoriesData?.data.items || []
  const total = categoriesData?.data.total || 0

  const handleSubmit = async (values: CreateCategoryRequest | UpdateCategoryRequest) => {
    try {
      if (editingCategory) {
        await updateCategoryMutation.mutateAsync({
          id: editingCategory.id,
          data: values as UpdateCategoryRequest,
        })
        message.success("Category updated successfully!")
      } else {
        await createCategoryMutation.mutateAsync(values as CreateCategoryRequest)
        message.success("Category created successfully!")
      }
      setModalVisible(false)
      setEditingCategory(null)
      form.resetFields()
    } catch (error) {
      message.error("Failed to save category")
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setModalVisible(true)
    form.setFieldsValue({
      ...category,
    })
  }

  const handleAdd = () => {
    setEditingCategory(null)
    setModalVisible(true)
    form.resetFields()
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCategoryMutation.mutateAsync(id)
      message.success("Category deleted successfully!")
    } catch (error) {
      message.error("Failed to delete category")
    }
  }

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 80,
      render: (image: string, record: Category) => (
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
      title: "Category",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Category) => (
        <div>
          <Text strong className="font-roboto">
            {name}
          </Text>
          {record.description && (
            <>
              <br />
              <Text type="secondary" className="font-roboto text-sm">
                {record.description}
              </Text>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Products",
      dataIndex: "productCount",
      key: "productCount",
      render: (count: number) => <Text className="font-roboto">{count} products</Text>,
    },
    {
      title: "Sort Order",
      dataIndex: "sortOrder",
      key: "sortOrder",
      render: (order: number) => <Text className="font-roboto">{order}</Text>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (isActive: boolean) => <Switch checked={isActive} disabled size="small" />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Category) => (
        <Space size="small">
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} size="small">
            Edit
          </Button>
          <Popconfirm
            title="Delete Category"
            description="Are you sure you want to delete this category?"
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
          <Title level={2} className="font-roboto mb-2">
            Category Management
          </Title>
          <Text type="secondary" className="font-roboto">
            Organize your products into categories
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="font-roboto">
          Add Category
        </Button>
      </div>

      {/* Search */}
      <Card>
        <Search
          placeholder="Search categories..."
          allowClear
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md font-roboto"
          prefix={<SearchOutlined />}
        />
      </Card>

      {/* Categories Table */}
      <Card>
        <Table
          dataSource={categories}
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
                {range[0]}-{range[1]} of {total} categories
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

      {/* Add/Edit Category Modal */}
      <Modal
        title={<span className="font-roboto">{editingCategory ? "Edit Category" : "Add New Category"}</span>}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          setEditingCategory(null)
          form.resetFields()
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setModalVisible(false)
              setEditingCategory(null)
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
            loading={createCategoryMutation.isPending || updateCategoryMutation.isPending}
            className="font-roboto"
          >
            {editingCategory ? "Update Category" : "Create Category"}
          </Button>,
        ]}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label={<span className="font-roboto">Category Name</span>}
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="Enter category name" className="font-roboto" />
          </Form.Item>

          <Form.Item name="description" label={<span className="font-roboto">Description</span>}>
            <TextArea
              rows={3}
              placeholder="Enter category description"
              className="font-roboto"
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.Item name="image" label={<span className="font-roboto">Category Image URL</span>}>
            <Input placeholder="https://example.com/image.jpg" className="font-roboto" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="sortOrder" label={<span className="font-roboto">Sort Order</span>} initialValue={0}>
              <InputNumber min={0} placeholder="0" className="w-full font-roboto" />
            </Form.Item>

            <Form.Item
              name="isActive"
              label={<span className="font-roboto">Active</span>}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}
