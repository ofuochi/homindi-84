"use client"

import { Card, Switch, Select, Button, Typography, Row, Col, Divider, message, InputNumber } from "antd"
import { BellOutlined, MailOutlined, PhoneOutlined, DesktopOutlined, MobileOutlined } from "@ant-design/icons"
import { useNotificationStore } from "@/store/useNotificationStore"

const { Title, Text } = Typography
const { Option } = Select

export default function NotificationSettingsPage() {
  const { settings, updateSettings } = useNotificationStore()

  const handleSave = () => {
    message.success("Notification settings saved successfully!")
  }

  const notificationChannels = [
    {
      key: "push",
      title: "Push Notifications",
      description: "Get instant notifications in your browser",
      icon: <BellOutlined className="text-[#0B8457]" />,
      enabled: settings.enablePush,
      onChange: (checked: boolean) => updateSettings({ enablePush: checked }),
    },
    {
      key: "email",
      title: "Email Notifications",
      description: "Receive important updates via email",
      icon: <MailOutlined className="text-[#F9A826]" />,
      enabled: settings.enableEmail,
      onChange: (checked: boolean) => updateSettings({ enableEmail: checked }),
    },
    {
      key: "sms",
      title: "SMS Notifications",
      description: "Get urgent alerts via text message",
      icon: <PhoneOutlined className="text-blue-500" />,
      enabled: false,
      onChange: (checked: boolean) => console.log("SMS:", checked),
    },
  ]

  const notificationTypes = [
    {
      key: "orderUpdates",
      title: "Order Updates",
      description: "Status changes, shipping, and delivery notifications",
      icon: "📦",
      enabled: settings.enableOrderUpdates,
      onChange: (checked: boolean) => updateSettings({ enableOrderUpdates: checked }),
    },
    {
      key: "promotions",
      title: "Promotions & Offers",
      description: "Special deals, discounts, and promotional content",
      icon: "🎉",
      enabled: settings.enablePromotions,
      onChange: (checked: boolean) => updateSettings({ enablePromotions: checked }),
    },
    {
      key: "system",
      title: "System Notifications",
      description: "Important system updates and maintenance alerts",
      icon: "⚙️",
      enabled: settings.enableSystem,
      onChange: (checked: boolean) => updateSettings({ enableSystem: checked }),
    },
    {
      key: "security",
      title: "Security Alerts",
      description: "Login attempts, password changes, and security updates",
      icon: "🔒",
      enabled: true,
      onChange: (checked: boolean) => console.log("Security:", checked),
      disabled: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={2} className="font-poppins mb-2">
            Notification Settings
          </Title>
          <Text type="secondary" className="font-inter">
            Customize how and when you receive notifications
          </Text>
        </div>
        <Button type="primary" onClick={handleSave} className="font-inter">
          Save Settings
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {/* Notification Channels */}
        <Col xs={24} lg={12}>
          <Card title={<span className="font-poppins">Notification Channels</span>}>
            <div className="space-y-6">
              {notificationChannels.map((channel) => (
                <div key={channel.key} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {channel.icon}
                    </div>
                    <div className="flex-1">
                      <Text className="font-inter font-semibold text-gray-900">{channel.title}</Text>
                      <br />
                      <Text type="secondary" className="font-inter text-sm">
                        {channel.description}
                      </Text>
                    </div>
                  </div>
                  <Switch checked={channel.enabled} onChange={channel.onChange} className="ml-4" />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Notification Types */}
        <Col xs={24} lg={12}>
          <Card title={<span className="font-poppins">Notification Types</span>}>
            <div className="space-y-6">
              {notificationTypes.map((type) => (
                <div key={type.key} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm text-xl">
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <Text className="font-inter font-semibold text-gray-900">{type.title}</Text>
                      <br />
                      <Text type="secondary" className="font-inter text-sm">
                        {type.description}
                      </Text>
                    </div>
                  </div>
                  <Switch checked={type.enabled} onChange={type.onChange} disabled={type.disabled} className="ml-4" />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Frequency Settings */}
        <Col xs={24}>
          <Card title={<span className="font-poppins">Frequency & Timing</span>}>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <div className="space-y-4">
                  <div>
                    <Text className="font-inter font-medium block mb-3">Update Frequency</Text>
                    <div className="flex items-center space-x-4">
                      <Text className="font-inter text-sm">Check every</Text>
                      <InputNumber
                        min={10}
                        max={300}
                        value={settings.pollingInterval / 1000}
                        onChange={(value) => updateSettings({ pollingInterval: (value || 30) * 1000 })}
                        className="font-inter"
                      />
                      <Text className="font-inter text-sm">seconds</Text>
                    </div>
                    <Text type="secondary" className="font-inter text-xs mt-2 block">
                      Lower values provide more real-time updates
                    </Text>
                  </div>

                  <Divider />

                  <div>
                    <Text className="font-inter font-medium block mb-3">Quiet Hours</Text>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Text className="font-inter">Enable quiet hours</Text>
                        <Switch />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Text className="font-inter text-sm">Start time</Text>
                          <Select defaultValue="22:00" className="w-full font-inter">
                            <Option value="21:00">9:00 PM</Option>
                            <Option value="22:00">10:00 PM</Option>
                            <Option value="23:00">11:00 PM</Option>
                          </Select>
                        </div>
                        <div>
                          <Text className="font-inter text-sm">End time</Text>
                          <Select defaultValue="08:00" className="w-full font-inter">
                            <Option value="07:00">7:00 AM</Option>
                            <Option value="08:00">8:00 AM</Option>
                            <Option value="09:00">9:00 AM</Option>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div className="space-y-4">
                  <div>
                    <Text className="font-inter font-medium block mb-3">Device Preferences</Text>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <DesktopOutlined className="text-gray-600" />
                          <Text className="font-inter">Desktop notifications</Text>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MobileOutlined className="text-gray-600" />
                          <Text className="font-inter">Mobile notifications</Text>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <Text className="font-inter font-medium block mb-3">Priority Settings</Text>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Text className="font-inter text-sm">High priority only</Text>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Text className="font-inter text-sm">Group similar notifications</Text>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Text className="font-inter text-sm">Sound alerts</Text>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
