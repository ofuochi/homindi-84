"use client"

import { useState, useEffect } from "react"
import { Card, Table, Tag, Input, Space, Typography, Avatar, DatePicker, Select, Button } from "antd"
import { SearchOutlined, UserOutlined, FilterOutlined, DownloadOutlined, ReloadOutlined } from "@ant-design/icons"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
import type { AuditLog } from "@/lib/types"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

const { Title, Text } = Typography
const { Search } = Input
const { RangePicker } = DatePicker
const { Option } = Select

export default function AuditLogsPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [dateRange, setDateRange] = useState<[any, any] | null>(null)

  const { user } = useClerkAuth()

  useEffect(() => {
    loadAuditLogs()
  }, [])

  const loadAuditLogs = async () => {
    try {
      setLoading(true)
      // Mock audit logs data
      const mockLogs: AuditLog[] = [
        {
          id: "audit_1",
          userId: "user_1",
          userEmail: "admin@diasporabasket.com",
          action: "role_update",
          resource: "user",
          details: { targetUserId: "user_2", newRole: "exporter", previousRole: "user" },
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          ipAddress: "192.168.1.1",
          userAgent: "Mozilla/5.0...",
        },
        {
          id: "audit_2",
          userId: "user_1",
          userEmail: "admin@diasporabasket.com",
          action: "user_create",
          resource: "user",
          details: { newUserId: "user_3", role: "user" },
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          ipAddress: "192.168.1.1",
          userAgent: "Mozilla/5.0...",
        },
        {
          id: "audit_3",
          userId: "user_2",
          userEmail: "exporter@diasporabasket.com",
          action: "order_update",
          resource: "order",
          details: { orderId: "order_123", status: "shipped", previousStatus: "processing" },
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          ipAddress: "192.168.1.2",
          userAgent: "Mozilla/5.0...",
        },
      ]
      setAuditLogs(mockLogs)
    } catch (error) {
      console.error("Failed to load audit logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      role_update: "orange",
      user_create: "green",
      user_delete: "red",
      status_update: "blue",
      order_update: "purple",
      product_create: "cyan",
      product_update: "geekblue",
      product_delete: "volcano",
    }
    return colors[action] || "default"
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAction = actionFilter === "all" || log.action === actionFilter

    let matchesDate = true
    if (dateRange && dateRange[0] && dateRange[1]) {
      const logDate = new Date(log.timestamp)
      matchesDate = logDate >= dateRange[0].toDate() && logDate <= dateRange[1].toDate()
    }

    return matchesSearch && matchesAction && matchesDate
  })

  const columns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp: string) => <Text className="font-inter text-sm">{new Date(timestamp).toLocaleString()}</Text>,
      sorter: (a: AuditLog, b: AuditLog) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      defaultSortOrder: "descend" as const,
    },
    {
      title: "User",
      dataIndex: "userEmail",
      key: "user",
      render: (email: string, record: AuditLog) => (
        <div className="flex items-center space-x-2">
          <Avatar size="small" icon={<UserOutlined />} />
          <Text className="font-inter text-sm">{email}</Text>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action: string) => (
        <Tag color={getActionColor(action)} className="font-inter">
          {action.replace("_", " ").toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Resource",
      dataIndex: "resource",
      key: "resource",
      render: (resource: string) => <Tag className="font-inter">{resource.toUpperCase()}</Tag>,
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (details: Record<string, any>) => (
        <div className="max-w-xs">
          <Text className="font-inter text-sm text-gray-600">
            {Object.entries(details)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")}
          </Text>
        </div>
      ),
    },
    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
      render: (ip: string) => <Text className="font-inter text-sm font-mono">{ip}</Text>,
    },
  ]

  return (
    <ProtectedRoute requiredPermission="audit.view">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2} className="font-poppins mb-2">
              Audit Logs
            </Title>
            <Text type="secondary" className="font-inter">
              Track all administrative actions and system changes
            </Text>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={loadAuditLogs} loading={loading} className="font-inter">
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              className="font-inter"
              onClick={() => {
                // Export functionality would be implemented here
                console.log("Exporting audit logs...")
              }}
            >
              Export
            </Button>
          </Space>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Search
              placeholder="Search logs..."
              allowClear
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="font-inter"
              prefix={<SearchOutlined />}
            />

            <Select
              value={actionFilter}
              onChange={setActionFilter}
              className="font-inter"
              placeholder="Filter by action"
            >
              <Option value="all">All Actions</Option>
              <Option value="role_update">Role Update</Option>
              <Option value="user_create">User Create</Option>
              <Option value="user_delete">User Delete</Option>
              <Option value="status_update">Status Update</Option>
              <Option value="order_update">Order Update</Option>
              <Option value="product_create">Product Create</Option>
              <Option value="product_update">Product Update</Option>
              <Option value="product_delete">Product Delete</Option>
            </Select>

            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              className="font-inter"
              placeholder={["Start Date", "End Date"]}
            />

            <Button
              icon={<FilterOutlined />}
              onClick={() => {
                setSearchTerm("")
                setActionFilter("all")
                setDateRange(null)
              }}
              className="font-inter"
            >
              Clear Filters
            </Button>
          </div>
        </Card>

        {/* Audit Logs Table */}
        <Card>
          <Table
            dataSource={filteredLogs}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 20,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => (
                <span className="font-inter">
                  {range[0]}-{range[1]} of {total} logs
                </span>
              ),
            }}
            scroll={{ x: 1000 }}
            size="small"
          />
        </Card>
      </div>
    </ProtectedRoute>
  )
}
