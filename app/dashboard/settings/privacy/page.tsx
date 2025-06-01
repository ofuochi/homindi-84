"use client"

import { Card, Switch, Button, Typography, Row, Col, Modal, Input, message, Alert } from "antd"
import { SafetyOutlined, EyeOutlined, LockOutlined, DeleteOutlined, WarningOutlined } from "@ant-design/icons"
import { useState } from "react"

const { Title, Text } = Typography
const { Password } = Input

export default function PrivacySettingsPage() {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false)
  const [exportModalVisible, setExportModalVisible] = useState(false)

  const handleChangePassword = () => {
    message.success("Password changed successfully!")
    setChangePasswordModalVisible(false)
  }

  const handleExportData = () => {
    message.success("Data export request submitted. You'll receive an email when ready.")
    setExportModalVisible(false)
  }

  const handleDeleteAccount = () => {
    message.error("Account deletion cancelled")
    setDeleteModalVisible(false)
  }

  const privacySettings = [
    {
      title: "Profile Visibility",
      description: "Make your profile visible to other users",
      enabled: true,
      icon: <EyeOutlined className="text-blue-500" />,
    },
    {
      title: "Order History Privacy",
      description: "Keep your order history private",
      enabled: false,
      icon: <SafetyOutlined className="text-green-500" />,
    },
    {
      title: "Analytics Tracking",
      description: "Allow us to collect usage analytics",
      enabled: true,
      icon: <EyeOutlined className="text-orange-500" />,
    },
    {
      title: "Marketing Personalization",
      description: "Use your data to personalize marketing content",
      enabled: false,
      icon: <EyeOutlined className="text-purple-500" />,
    },
  ]

  const securitySettings = [
    {
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account",
      enabled: false,
      icon: <LockOutlined className="text-green-500" />,
    },
    {
      title: "Login Notifications",
      description: "Get notified when someone logs into your account",
      enabled: true,
      icon: <SafetyOutlined className="text-blue-500" />,
    },
    {
      title: "Session Management",
      description: "Automatically log out inactive sessions",
      enabled: true,
      icon: <LockOutlined className="text-orange-500" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <Title level={2} className="font-poppins mb-2">
          Privacy & Security
        </Title>
        <Text type="secondary" className="font-inter">
          Manage your privacy settings and account security
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Privacy Settings */}
        <Col xs={24} lg={12}>
          <Card title={<span className="font-poppins">Privacy Settings</span>}>
            <div className="space-y-6">
              {privacySettings.map((setting, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {setting.icon}
                    </div>
                    <div className="flex-1">
                      <Text className="font-inter font-semibold text-gray-900">{setting.title}</Text>
                      <br />
                      <Text type="secondary" className="font-inter text-sm">
                        {setting.description}
                      </Text>
                    </div>
                  </div>
                  <Switch defaultChecked={setting.enabled} className="ml-4" />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Security Settings */}
        <Col xs={24} lg={12}>
          <Card title={<span className="font-poppins">Security Settings</span>}>
            <div className="space-y-6">
              {securitySettings.map((setting, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {setting.icon}
                    </div>
                    <div className="flex-1">
                      <Text className="font-inter font-semibold text-gray-900">{setting.title}</Text>
                      <br />
                      <Text type="secondary" className="font-inter text-sm">
                        {setting.description}
                      </Text>
                    </div>
                  </div>
                  <Switch defaultChecked={setting.enabled} className="ml-4" />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Account Actions */}
        <Col xs={24}>
          <Card title={<span className="font-poppins">Account Management</span>}>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <LockOutlined className="text-4xl text-blue-500 mb-4" />
                  <Title level={4} className="font-poppins mb-2">
                    Change Password
                  </Title>
                  <Text type="secondary" className="font-inter mb-4 block">
                    Update your account password for better security
                  </Text>
                  <Button type="primary" onClick={() => setChangePasswordModalVisible(true)} className="font-inter">
                    Change Password
                  </Button>
                </div>
              </Col>

              <Col xs={24} md={8}>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <EyeOutlined className="text-4xl text-green-500 mb-4" />
                  <Title level={4} className="font-poppins mb-2">
                    Export Data
                  </Title>
                  <Text type="secondary" className="font-inter mb-4 block">
                    Download a copy of all your account data
                  </Text>
                  <Button onClick={() => setExportModalVisible(true)} className="font-inter">
                    Export Data
                  </Button>
                </div>
              </Col>

              <Col xs={24} md={8}>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <DeleteOutlined className="text-4xl text-red-500 mb-4" />
                  <Title level={4} className="font-poppins mb-2">
                    Delete Account
                  </Title>
                  <Text type="secondary" className="font-inter mb-4 block">
                    Permanently delete your account and all data
                  </Text>
                  <Button danger onClick={() => setDeleteModalVisible(true)} className="font-inter">
                    Delete Account
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Data Usage Information */}
        <Col xs={24}>
          <Card title={<span className="font-poppins">Data Usage & Rights</span>}>
            <Alert
              message="Your Privacy Rights"
              description={
                <div className="font-inter">
                  <p className="mb-2">
                    We respect your privacy and are committed to protecting your personal data. You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Access and review your personal data</li>
                    <li>Correct inaccurate or incomplete data</li>
                    <li>Delete your personal data (right to be forgotten)</li>
                    <li>Restrict or object to data processing</li>
                    <li>Data portability - export your data</li>
                  </ul>
                </div>
              }
              type="info"
              showIcon
              className="mb-4"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Text className="font-inter font-semibold block">Data Collected</Text>
                <Text type="secondary" className="font-inter text-sm">
                  Profile info, orders, preferences
                </Text>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Text className="font-inter font-semibold block">Data Retention</Text>
                <Text type="secondary" className="font-inter text-sm">
                  Kept for 7 years after account closure
                </Text>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Text className="font-inter font-semibold block">Data Sharing</Text>
                <Text type="secondary" className="font-inter text-sm">
                  Only with trusted partners
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Change Password Modal */}
      <Modal
        title={<span className="font-poppins">Change Password</span>}
        open={changePasswordModalVisible}
        onCancel={() => setChangePasswordModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setChangePasswordModalVisible(false)} className="font-inter">
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleChangePassword} className="font-inter">
            Change Password
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <div>
            <Text className="font-inter font-medium">Current Password</Text>
            <Password placeholder="Enter current password" className="font-inter" />
          </div>
          <div>
            <Text className="font-inter font-medium">New Password</Text>
            <Password placeholder="Enter new password" className="font-inter" />
          </div>
          <div>
            <Text className="font-inter font-medium">Confirm New Password</Text>
            <Password placeholder="Confirm new password" className="font-inter" />
          </div>
        </div>
      </Modal>

      {/* Export Data Modal */}
      <Modal
        title={<span className="font-poppins">Export Your Data</span>}
        open={exportModalVisible}
        onCancel={() => setExportModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setExportModalVisible(false)} className="font-inter">
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleExportData} className="font-inter">
            Request Export
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <Text className="font-inter">We'll prepare a comprehensive export of all your account data including:</Text>
          <ul className="list-disc list-inside space-y-1 font-inter text-sm">
            <li>Profile information</li>
            <li>Order history</li>
            <li>Notification preferences</li>
            <li>Address book</li>
            <li>Account activity logs</li>
          </ul>
          <Alert
            message="Processing Time"
            description="Data exports typically take 24-48 hours to process. You'll receive an email when your export is ready for download."
            type="info"
            showIcon
          />
        </div>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        title={
          <span className="font-poppins flex items-center">
            <WarningOutlined className="text-red-500 mr-2" />
            Delete Account
          </span>
        }
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)} className="font-inter">
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDeleteAccount} className="font-inter">
            Delete Account
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <Alert
            message="This action cannot be undone"
            description="Deleting your account will permanently remove all your data, including orders, preferences, and account history."
            type="error"
            showIcon
          />
          <Text className="font-inter">To confirm deletion, please type "DELETE" in the field below:</Text>
          <Input placeholder="Type DELETE to confirm" className="font-inter" />
        </div>
      </Modal>
    </div>
  )
}
