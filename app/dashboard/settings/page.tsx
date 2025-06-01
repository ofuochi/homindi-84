"use client"

import { useState } from "react"
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Select,
  DatePicker,
  Switch,
  Divider,
  message,
  Row,
  Col,
  Typography,
} from "antd"
import { UserOutlined, CameraOutlined, SaveOutlined, EditOutlined } from "@ant-design/icons"
import { useAuthStore } from "@/store/useAuthStore"
import { COUNTRIES } from "@/lib/constants"
import dayjs from "dayjs"

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select

export default function SettingsPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const { user, updateUser } = useAuthStore()

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      updateUser({
        ...values,
        dateOfBirth: values.dateOfBirth?.format("YYYY-MM-DD"),
      })

      message.success("Profile updated successfully!")
      setEditing(false)
    } catch (error) {
      message.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={2} className="font-poppins mb-2">
            Profile Settings
          </Title>
          <Text type="secondary" className="font-inter">
            Manage your personal information and account preferences
          </Text>
        </div>
        <Button
          type={editing ? "default" : "primary"}
          icon={editing ? <SaveOutlined /> : <EditOutlined />}
          onClick={() => (editing ? form.submit() : setEditing(!editing))}
          loading={loading}
          className="font-inter"
        >
          {editing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {/* Profile Information */}
        <Col xs={24} lg={16}>
          <Card title={<span className="font-poppins">Personal Information</span>}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                name: user?.name,
                email: user?.email,
                phone: user?.phone,
                preferredCountry: user?.preferredCountry,
                dateOfBirth: user?.dateOfBirth ? dayjs(user.dateOfBirth) : null,
                bio: user?.bio || "",
                website: user?.website || "",
                company: user?.company || "",
                jobTitle: user?.jobTitle || "",
              }}
              disabled={!editing}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label={<span className="font-inter font-medium">Full Name</span>}
                    rules={[{ required: true, message: "Please enter your full name" }]}
                  >
                    <Input placeholder="Enter your full name" className="font-inter" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label={<span className="font-inter font-medium">Email Address</span>}
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input placeholder="Enter your email" className="font-inter" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    label={<span className="font-inter font-medium">Phone Number</span>}
                    rules={[{ required: true, message: "Please enter your phone number" }]}
                  >
                    <Input placeholder="Enter your phone number" className="font-inter" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="dateOfBirth" label={<span className="font-inter font-medium">Date of Birth</span>}>
                    <DatePicker placeholder="Select date of birth" className="w-full font-inter" format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="preferredCountry"
                    label={<span className="font-inter font-medium">Country</span>}
                    rules={[{ required: true, message: "Please select your country" }]}
                  >
                    <Select placeholder="Select your country" className="font-inter">
                      {COUNTRIES.map((country) => (
                        <Option key={country} value={country}>
                          {country}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="website" label={<span className="font-inter font-medium">Website</span>}>
                    <Input placeholder="https://yourwebsite.com" className="font-inter" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item name="company" label={<span className="font-inter font-medium">Company</span>}>
                    <Input placeholder="Enter your company name" className="font-inter" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="jobTitle" label={<span className="font-inter font-medium">Job Title</span>}>
                    <Input placeholder="Enter your job title" className="font-inter" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="bio" label={<span className="font-inter font-medium">Bio</span>}>
                <TextArea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="font-inter"
                  maxLength={500}
                  showCount
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Profile Picture & Quick Settings */}
        <Col xs={24} lg={8}>
          <div className="space-y-6">
            {/* Profile Picture */}
            <Card title={<span className="font-poppins">Profile Picture</span>}>
              <div className="text-center space-y-4">
                <Avatar size={120} icon={<UserOutlined />} src={user?.avatar} className="mx-auto shadow-lg" />
                <Upload
                  name="avatar"
                  listType="picture"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleAvatarUpload}
                  disabled={!editing}
                >
                  <Button icon={<CameraOutlined />} disabled={!editing} className="font-inter">
                    Change Photo
                  </Button>
                </Upload>
                <Text type="secondary" className="text-sm font-inter block">
                  JPG, PNG or GIF. Max size 2MB.
                </Text>
              </div>
            </Card>

            {/* Quick Settings */}
            <Card title={<span className="font-poppins">Quick Settings</span>}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Text className="font-inter font-medium">Email Notifications</Text>
                    <br />
                    <Text type="secondary" className="text-sm font-inter">
                      Receive order updates via email
                    </Text>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Divider className="my-3" />

                <div className="flex justify-between items-center">
                  <div>
                    <Text className="font-inter font-medium">Marketing Emails</Text>
                    <br />
                    <Text type="secondary" className="text-sm font-inter">
                      Receive promotional offers
                    </Text>
                  </div>
                  <Switch />
                </div>

                <Divider className="my-3" />

                <div className="flex justify-between items-center">
                  <div>
                    <Text className="font-inter font-medium">Two-Factor Auth</Text>
                    <br />
                    <Text type="secondary" className="text-sm font-inter">
                      Extra security for your account
                    </Text>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            {/* Account Stats */}
            <Card title={<span className="font-poppins">Account Statistics</span>}>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text className="font-inter">Member since:</Text>
                  <Text className="font-inter font-medium">
                    {user?.createdAt ? dayjs(user.createdAt).format("MMM YYYY") : "N/A"}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text className="font-inter">Total orders:</Text>
                  <Text className="font-inter font-medium">12</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="font-inter">Loyalty points:</Text>
                  <Text className="font-inter font-medium text-[#0B8457]">2,450</Text>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  )
}
