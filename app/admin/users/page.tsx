"use client"

import { useState, useEffect } from "react"
import {
  Card,
  Table,
  Tag,
  Button,
  Input,
  Space,
  Typography,
  Avatar,
  Statistic,
  Row,
  Col,
  Modal,
  Descriptions,
  Select,
  Switch,
  message,
  Form,
  Popconfirm,
} from "antd"
import {
  UserOutlined,
  SearchOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  CrownOutlined,
  SafetyOutlined,
  TruckOutlined,
  ShopOutlined,
  FlagOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import { useUser, useClerk } from "@clerk/nextjs"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
import { updateUserRole, updateUserStatus, createAuditLog } from "@/lib/auth/clerk-utils"
import { getRoleInfo, canManageRole, getAvailableRoles } from "@/lib/auth/roles"
import type { ExtendedUser, UserRole } from "@/lib/types"

const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select

const roleIcons = {
  god: CrownOutlined,
  admin: SafetyOutlined,
  exporter: TruckOutlined,
  supplier: ShopOutlined,
  moderator: FlagOutlined,
  user: UserOutlined,
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ExtendedUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [createModalVisible, setCreateModalVisible] = useState(false)

  const { user: currentUser } = useUser()
  const { userRole, hasPermission } = useClerkAuth()
  const clerk = useClerk()

  const [form] = Form.useForm()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      // In a real app, you'd fetch from Clerk's API
      // For demo purposes, we'll use mock data
      const mockUsers: ExtendedUser[] = [
        {
          id: "user_1",
          firstName: "John",
          lastName: "Doe",
          emailAddresses: [{ id: "email_1", emailAddress: "john@example.com" }],
          phoneNumbers: [{ id: "phone_1", phoneNumber: "+1234567890" }],
          imageUrl: "",
          createdAt: Date.now() - 86400000 * 30,
          lastSignInAt: Date.now() - 3600000,
          publicMetadata: { role: "admin", isActive: true },
          privateMetadata: {},
          unsafeMetadata: {},
        },
        {
          id: "user_2",
          firstName: "Jane",
          lastName: "Smith",
          emailAddresses: [{ id: "email_2", emailAddress: "jane@example.com" }],
          phoneNumbers: [{ id: "phone_2", phoneNumber: "+1234567891" }],
          imageUrl: "",
          createdAt: Date.now() - 86400000 * 15,
          lastSignInAt: Date.now() - 7200000,
          publicMetadata: { role: "exporter", isActive: true },
          privateMetadata: {},
          unsafeMetadata: {},
        },
        {
          id: "user_3",
          firstName: "Bob",
          lastName: "Wilson",
          emailAddresses: [{ id: "email_3", emailAddress: "bob@example.com" }],
          phoneNumbers: [{ id: "phone_3", phoneNumber: "+1234567892" }],
          imageUrl: "",
          createdAt: Date.now() - 86400000 * 7,
          lastSignInAt: null,
          publicMetadata: { role: "user", isActive: false },
          privateMetadata: {},
          unsafeMetadata: {},
        },
      ]
      setUsers(mockUsers)
    } catch (error) {
      message.error("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const handleRoleUpdate = async (userId: string, newRole: UserRole) => {
    try {
      const result = await updateUserRole(userId, newRole, currentUser?.id || "")
      if (result.success) {
        message.success("User role updated successfully!")
        await createAuditLog(currentUser?.id || "", "role_update", "user", {
          targetUserId: userId,
          newRole,
          userEmail: currentUser?.emailAddresses[0]?.emailAddress,
        })
        loadUsers()
        setEditModalVisible(false)
        setSelectedUser(null)
      } else {
        message.error(result.error || "Failed to update user role")
      }
    } catch (error) {
      message.error("Failed to update user role")
    }
  }

  const handleStatusUpdate = async (userId: string, isActive: boolean) => {
    try {
      const result = await updateUserStatus(userId, isActive)
      if (result.success) {
        message.success(`User ${isActive ? "activated" : "deactivated"} successfully!`)
        await createAuditLog(currentUser?.id || "", "status_update", "user", {
          targetUserId: userId,
          isActive,
          userEmail: currentUser?.emailAddresses[0]?.emailAddress,
        })
        loadUsers()
      } else {
        message.error(result.error || "Failed to update user status")
      }
    } catch (error) {
      message.error("Failed to update user status")
    }
  }

  const canEditUser = (user: ExtendedUser) => {
    if (!hasPermission("users.manage")) return false
    return canManageRole(userRole, user.publicMetadata.role)
  }

  const getRoleColor = (role: UserRole) => {
    const roleInfo = getRoleInfo(role)
    return roleInfo.color
  }

  const RoleIcon = ({ role }: { role: UserRole }) => {
    const IconComponent = roleIcons[role]
    return <IconComponent />
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.emailAddresses[0]?.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.publicMetadata.role === roleFilter

    return matchesSearch && matchesRole
  })

  const getUserStats = () => {
    const totalUsers = users.length
    const roleStats = users.reduce(
      (acc, user) => {
        acc[user.publicMetadata.role] = (acc[user.publicMetadata.role] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const activeUsers = users.filter((user) => user.publicMetadata.isActive !== false).length
    const recentUsers = users.filter((user) => {
      const createdDate = new Date(user.createdAt)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return createdDate > thirtyDaysAgo
    }).length

    return { totalUsers, roleStats, activeUsers, recentUsers }
  }

  const stats = getUserStats()

  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: ExtendedUser) => (
        <div className="flex items-center space-x-3">
          <Avatar size={40} icon={<RoleIcon role={record.publicMetadata.role} />} src={record.imageUrl} />
          <div>
            <Text strong className="font-roboto">
              {`${record.firstName || ""} ${record.lastName || ""}`.trim() || "No Name"}
            </Text>
            <br />
            <Text type="secondary" className="font-roboto text-sm">
              {record.emailAddresses[0]?.emailAddress}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_: any, record: ExtendedUser) => {
        const roleInfo = getRoleInfo(record.publicMetadata.role)
        return (
          <Tag
            color={getRoleColor(record.publicMetadata.role)}
            icon={<RoleIcon role={record.publicMetadata.role} />}
            className="font-roboto"
          >
            {roleInfo.name}
          </Tag>
        )
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: ExtendedUser) => (
        <div>
          <Tag color={record.publicMetadata.isActive !== false ? "green" : "red"} className="font-roboto">
            {record.publicMetadata.isActive !== false ? "Active" : "Inactive"}
          </Tag>
          <br />
          <Text type="secondary" className="font-roboto text-xs">
            {record.emailAddresses.length > 0 ? "✓ Email" : "✗ Email"}
            {" | "}
            {record.phoneNumbers.length > 0 ? "✓ Phone" : "✗ Phone"}
          </Text>
        </div>
      ),
    },
    {
      title: "Last Login",
      dataIndex: "lastSignInAt",
      key: "lastLogin",
      render: (date: number | null) => (
        <Text className="font-roboto text-sm">{date ? new Date(date).toLocaleDateString() : "Never"}</Text>
      ),
    },
    {
      title: "Member Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: number) => <Text className="font-roboto text-sm">{new Date(date).toLocaleDateString()}</Text>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ExtendedUser) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} onClick={() => setSelectedUser(record)} size="small">
            View
          </Button>
          {canEditUser(record) && (
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedUser(record)
                setEditModalVisible(true)
              }}
              size="small"
            >
              Edit
            </Button>
          )}
          {hasPermission("users.delete") && record.id !== currentUser?.id && (
            <Popconfirm
              title="Delete User"
              description="Are you sure you want to delete this user?"
              onConfirm={() => handleStatusUpdate(record.id, false)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" danger icon={<DeleteOutlined />} size="small">
                Delete
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={2} className="font-roboto mb-2">
            User Management
          </Title>
          <Text type="secondary" className="font-roboto">
            Manage and view all registered users
          </Text>
        </div>
        {hasPermission("users.create") && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
            className="font-roboto"
          >
            Create User
          </Button>
        )}
      </div>

      {/* User Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto text-sm">Total Users</span>}
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ fontSize: "20px", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto text-sm">Active Users</span>}
              value={stats.activeUsers}
              valueStyle={{ fontSize: "20px", color: "#52c41a", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto text-sm">Admins</span>}
              value={stats.roleStats.admin || 0}
              prefix={<SafetyOutlined />}
              valueStyle={{ fontSize: "20px", color: "#ff4d4f", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="text-center">
            <Statistic
              title={<span className="font-roboto text-sm">New (30 days)</span>}
              value={stats.recentUsers}
              valueStyle={{ fontSize: "20px", color: "#1890ff", fontFamily: "var(--font-roboto)" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <Search
            placeholder="Search users by name or email..."
            allowClear
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 font-roboto"
            prefix={<SearchOutlined />}
          />
          <Select value={roleFilter} onChange={setRoleFilter} className="w-full sm:w-48 font-roboto">
            <Option value="all">All Roles</Option>
            <Option value="god">God Admin</Option>
            <Option value="admin">Administrator</Option>
            <Option value="exporter">Exporter</Option>
            <Option value="supplier">Supplier</Option>
            <Option value="moderator">Moderator</Option>
            <Option value="user">Customer</Option>
          </Select>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => (
              <span className="font-roboto">
                {range[0]}-{range[1]} of {total} users
              </span>
            ),
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* User Details Modal */}
      <Modal
        title={<span className="font-roboto">User Details</span>}
        open={!!selectedUser && !editModalVisible}
        onCancel={() => setSelectedUser(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedUser(null)} className="font-roboto">
            Close
          </Button>,
          ...(selectedUser && canEditUser(selectedUser)
            ? [
              <Button key="edit" type="primary" onClick={() => setEditModalVisible(true)} className="font-roboto">
                Edit User
              </Button>,
            ]
            : []),
        ]}
        width={600}
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="text-center">
              <Avatar
                size={80}
                icon={<RoleIcon role={selectedUser.publicMetadata.role} />}
                src={selectedUser.imageUrl}
                className="mb-4"
              />
              <Title level={4} className="font-roboto mb-1">
                {`${selectedUser.firstName || ""} ${selectedUser.lastName || ""}`.trim() || "No Name"}
              </Title>
              <Tag
                color={getRoleColor(selectedUser.publicMetadata.role)}
                icon={<RoleIcon role={selectedUser.publicMetadata.role} />}
                className="font-roboto"
              >
                {getRoleInfo(selectedUser.publicMetadata.role).name}
              </Tag>
            </div>

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label={<span className="font-roboto font-medium">Email</span>}>
                <div className="flex items-center space-x-2">
                  <MailOutlined className="text-gray-500" />
                  <Text className="font-roboto">{selectedUser.emailAddresses[0]?.emailAddress}</Text>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label={<span className="font-roboto font-medium">Phone</span>}>
                <div className="flex items-center space-x-2">
                  <PhoneOutlined className="text-gray-500" />
                  <Text className="font-roboto">{selectedUser.phoneNumbers[0]?.phoneNumber || "Not provided"}</Text>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label={<span className="font-roboto font-medium">Status</span>}>
                <Tag color={selectedUser.publicMetadata.isActive !== false ? "green" : "red"}>
                  {selectedUser.publicMetadata.isActive !== false ? "Active" : "Inactive"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={<span className="font-roboto font-medium">Last Login</span>}>
                <Text className="font-roboto">
                  {selectedUser.lastSignInAt ? new Date(selectedUser.lastSignInAt).toLocaleString() : "Never"}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className="font-roboto font-medium">Member Since</span>}>
                <Text className="font-roboto">{new Date(selectedUser.createdAt).toLocaleString()}</Text>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Edit User Modal */}
      <Modal
        title={<span className="font-roboto">Edit User</span>}
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false)
          setSelectedUser(null)
        }}
        footer={null}
        width={500}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Avatar
                size={60}
                icon={<RoleIcon role={selectedUser.publicMetadata.role} />}
                src={selectedUser.imageUrl}
                className="mb-2"
              />
              <Title level={5} className="font-roboto mb-0">
                {`${selectedUser.firstName || ""} ${selectedUser.lastName || ""}`.trim() || "No Name"}
              </Title>
            </div>

            <div>
              <Text strong className="font-roboto">
                Role:
              </Text>
              <Select
                value={selectedUser.publicMetadata.role}
                onChange={(newRole) => handleRoleUpdate(selectedUser.id, newRole)}
                className="w-full mt-2 font-roboto"
                disabled={!canEditUser(selectedUser)}
              >
                {getAvailableRoles(userRole).map((role) => (
                  <Option key={role} value={role}>
                    <RoleIcon role={role} /> {getRoleInfo(role).name}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <Text strong className="font-roboto">
                Account Status:
              </Text>
              <div className="mt-2">
                <Switch
                  checked={selectedUser.publicMetadata.isActive !== false}
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                  onChange={(checked) => handleStatusUpdate(selectedUser.id, checked)}
                  disabled={!canEditUser(selectedUser)}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Create User Modal */}
      <Modal
        title={<span className="font-roboto">Create New User</span>}
        open={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false)
          form.resetFields()
        }}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            // In a real app, you'd create the user via Clerk's API
            message.info("User creation would be implemented here")
            setCreateModalVisible(false)
            form.resetFields()
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="user@example.com" />
          </Form.Item>

          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please input the first name!" }]}
          >
            <Input placeholder="John" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input placeholder="Doe" />
          </Form.Item>

          <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select a role!" }]}>
            <Select placeholder="Select a role">
              {getAvailableRoles(userRole).map((role) => (
                <Option key={role} value={role}>
                  <RoleIcon role={role} /> {getRoleInfo(role).name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setCreateModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Create User
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
