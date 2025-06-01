"use client"

import { Card, Button, Typography, Row, Col, Table, Tag, Modal, Form, Input, Select, message, Alert } from "antd"
import { CreditCardOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons"
import { useState } from "react"

const { Title, Text } = Typography
const { Option } = Select

export default function BillingSettingsPage() {
  const [addCardModalVisible, setAddCardModalVisible] = useState(false)
  const [editCardModalVisible, setEditCardModalVisible] = useState(false)

  const paymentMethods = [
    {
      key: "1",
      type: "Visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      key: "2",
      type: "Mastercard",
      last4: "8888",
      expiry: "08/26",
      isDefault: false,
    },
  ]

  const billingHistory = [
    {
      key: "1",
      date: "2024-01-15",
      orderId: "ORD-001",
      amount: 89.99,
      status: "Paid",
      method: "Visa ****4242",
    },
    {
      key: "2",
      date: "2024-01-10",
      orderId: "ORD-002",
      amount: 156.5,
      status: "Paid",
      method: "Mastercard ****8888",
    },
    {
      key: "3",
      date: "2024-01-05",
      orderId: "ORD-003",
      amount: 67.25,
      status: "Refunded",
      method: "Visa ****4242",
    },
  ]

  const paymentMethodColumns = [
    {
      title: "Card Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <div className="flex items-center space-x-2">
          <CreditCardOutlined />
          <span className="font-inter">{type}</span>
        </div>
      ),
    },
    {
      title: "Card Number",
      dataIndex: "last4",
      key: "last4",
      render: (last4: string) => <span className="font-inter">**** **** **** {last4}</span>,
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
      key: "expiry",
      render: (expiry: string) => <span className="font-inter">{expiry}</span>,
    },
    {
      title: "Status",
      dataIndex: "isDefault",
      key: "isDefault",
      render: (isDefault: boolean) => (
        <Tag color={isDefault ? "green" : "default"} className="font-inter">
          {isDefault ? "Default" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <div className="space-x-2">
          <Button size="small" icon={<EditOutlined />} onClick={() => setEditCardModalVisible(true)}>
            Edit
          </Button>
          <Button size="small" danger icon={<DeleteOutlined />}>
            Remove
          </Button>
        </div>
      ),
    },
  ]

  const billingHistoryColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => <span className="font-inter">{date}</span>,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (orderId: string) => <span className="font-inter font-medium text-[#0B8457]">{orderId}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => <span className="font-inter font-medium">${amount.toFixed(2)}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Paid" ? "green" : status === "Refunded" ? "orange" : "red"} className="font-inter">
          {status}
        </Tag>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "method",
      key: "method",
      render: (method: string) => <span className="font-inter text-sm">{method}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Button size="small" icon={<DownloadOutlined />} className="font-inter">
          Invoice
        </Button>
      ),
    },
  ]

  const handleAddCard = () => {
    message.success("Payment method added successfully!")
    setAddCardModalVisible(false)
  }

  const handleEditCard = () => {
    message.success("Payment method updated successfully!")
    setEditCardModalVisible(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <Title level={2} className="font-poppins mb-2">
          Billing & Payment
        </Title>
        <Text type="secondary" className="font-inter">
          Manage your payment methods and billing history
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Payment Methods */}
        <Col xs={24}>
          <Card
            title={<span className="font-poppins">Payment Methods</span>}
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setAddCardModalVisible(true)}
                className="font-inter"
              >
                Add Card
              </Button>
            }
          >
            <Table dataSource={paymentMethods} columns={paymentMethodColumns} pagination={false} className="mb-4" />

            <Alert
              message="Secure Payment Processing"
              description="All payment information is encrypted and processed securely through our PCI-compliant payment processor."
              type="info"
              showIcon
              className="font-inter"
            />
          </Card>
        </Col>

        {/* Billing Summary */}
        <Col xs={24} lg={8}>
          <Card title={<span className="font-poppins">Billing Summary</span>}>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <Text className="font-inter">Current Month</Text>
                <Text className="font-inter font-semibold text-[#0B8457]">$245.75</Text>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <Text className="font-inter">Last Month</Text>
                <Text className="font-inter font-semibold">$189.50</Text>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <Text className="font-inter">Total Spent</Text>
                <Text className="font-inter font-semibold">$1,456.25</Text>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <Text className="font-inter">Loyalty Points</Text>
                <Text className="font-inter font-semibold text-[#F9A826]">2,450 pts</Text>
              </div>
            </div>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col xs={24} lg={16}>
          <Card title={<span className="font-poppins">Quick Actions</span>}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <DownloadOutlined className="text-2xl text-blue-500 mb-2" />
                  <Text className="font-inter font-medium block">Download Invoices</Text>
                  <Button size="small" className="mt-2 font-inter">
                    Download
                  </Button>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CreditCardOutlined className="text-2xl text-green-500 mb-2" />
                  <Text className="font-inter font-medium block">Update Billing</Text>
                  <Button size="small" className="mt-2 font-inter">
                    Update
                  </Button>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <EditOutlined className="text-2xl text-orange-500 mb-2" />
                  <Text className="font-inter font-medium block">Tax Settings</Text>
                  <Button size="small" className="mt-2 font-inter">
                    Configure
                  </Button>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <PlusOutlined className="text-2xl text-purple-500 mb-2" />
                  <Text className="font-inter font-medium block">Auto-Pay</Text>
                  <Button size="small" className="mt-2 font-inter">
                    Setup
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Billing History */}
        <Col xs={24}>
          <Card title={<span className="font-poppins">Billing History</span>}>
            <Table
              dataSource={billingHistory}
              columns={billingHistoryColumns}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => (
                  <span className="font-inter">
                    {range[0]}-{range[1]} of {total} transactions
                  </span>
                ),
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Add Card Modal */}
      <Modal
        title={<span className="font-poppins">Add Payment Method</span>}
        open={addCardModalVisible}
        onCancel={() => setAddCardModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setAddCardModalVisible(false)} className="font-inter">
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddCard} className="font-inter">
            Add Card
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label={<span className="font-inter">Card Number</span>}>
            <Input placeholder="1234 5678 9012 3456" className="font-inter" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={<span className="font-inter">Expiry Date</span>}>
                <Input placeholder="MM/YY" className="font-inter" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span className="font-inter">CVV</span>}>
                <Input placeholder="123" className="font-inter" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label={<span className="font-inter">Cardholder Name</span>}>
            <Input placeholder="John Doe" className="font-inter" />
          </Form.Item>
          <Form.Item label={<span className="font-inter">Billing Country</span>}>
            <Select placeholder="Select country" className="font-inter">
              <Option value="US">United States</Option>
              <Option value="CA">Canada</Option>
              <Option value="UK">United Kingdom</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Card Modal */}
      <Modal
        title={<span className="font-poppins">Edit Payment Method</span>}
        open={editCardModalVisible}
        onCancel={() => setEditCardModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditCardModalVisible(false)} className="font-inter">
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditCard} className="font-inter">
            Update Card
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label={<span className="font-inter">Expiry Date</span>}>
            <Input defaultValue="12/25" className="font-inter" />
          </Form.Item>
          <Form.Item label={<span className="font-inter">Cardholder Name</span>}>
            <Input defaultValue="John Doe" className="font-inter" />
          </Form.Item>
          <Form.Item label={<span className="font-inter">Set as Default</span>}>
            <Select defaultValue="no" className="font-inter">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
