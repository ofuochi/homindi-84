"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Typography, Card, Table, Switch, Button, Alert, Divider } from "antd"
import { CookieOutlined, SettingOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"
import { useState } from "react"

const { Title, Paragraph, Text } = Typography

export default function CookiesPage() {
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true,
  })

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  }

  const cookieTypes = [
    {
      key: "essential",
      name: "Essential Cookies",
      description: "Required for the website to function properly",
      purpose: "Authentication, security, shopping cart functionality",
      duration: "Session / 1 year",
      canDisable: false,
      enabled: cookieSettings.essential,
    },
    {
      key: "analytics",
      name: "Analytics Cookies",
      description: "Help us understand how visitors use our website",
      purpose: "Website performance analysis, user behavior tracking",
      duration: "2 years",
      canDisable: true,
      enabled: cookieSettings.analytics,
    },
    {
      key: "marketing",
      name: "Marketing Cookies",
      description: "Used to deliver personalized advertisements",
      purpose: "Targeted advertising, social media integration",
      duration: "1 year",
      canDisable: true,
      enabled: cookieSettings.marketing,
    },
    {
      key: "preferences",
      name: "Preference Cookies",
      description: "Remember your settings and preferences",
      purpose: "Language settings, theme preferences, location",
      duration: "1 year",
      canDisable: true,
      enabled: cookieSettings.preferences,
    },
  ]

  const handleCookieToggle = (key: string, checked: boolean) => {
    setCookieSettings((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  const columns = [
    {
      title: "Cookie Type",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" className="text-sm">
            {record.description}
          </Text>
        </div>
      ),
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Settings",
      key: "settings",
      render: (_, record: any) => (
        <Switch
          checked={record.enabled}
          disabled={!record.canDisable}
          onChange={(checked) => handleCookieToggle(record.key, checked)}
          checkedChildren="On"
          unCheckedChildren="Off"
        />
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <CookieOutlined className="text-3xl text-primary-500" />
            </div>
            <Title level={1} className="text-4xl font-bold mb-4">
              Cookie Policy
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about how Homindi uses cookies to improve your browsing experience and provide personalized
              services.
            </Paragraph>
            <Text type="secondary" className="text-lg">
              Last updated: December 2024
            </Text>
          </motion.div>

          {/* Cookie Settings */}
          <motion.div variants={fadeInUp} custom={1} className="mb-12">
            <Card className="border-0 shadow-lg rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <Title level={2} className="text-2xl font-bold mb-0">
                  <SettingOutlined className="mr-2" />
                  Cookie Preferences
                </Title>
                <Button type="primary" size="large" className="rounded-xl">
                  Save Preferences
                </Button>
              </div>

              <Alert
                message="Cookie Settings"
                description="You can control which types of cookies we use. Essential cookies cannot be disabled as they are required for the website to function properly."
                type="info"
                showIcon
                className="mb-6 rounded-xl"
              />

              <Table
                columns={columns}
                dataSource={cookieTypes}
                pagination={false}
                rowKey="key"
                className="rounded-xl overflow-hidden"
              />
            </Card>
          </motion.div>

          {/* What Are Cookies */}
          <motion.div variants={fadeInUp} custom={2} className="mb-12">
            <Card className="border-0 shadow-lg rounded-2xl">
              <Title level={2} className="text-2xl font-bold mb-6 text-primary-600">
                What Are Cookies?
              </Title>
              <Paragraph className="text-lg mb-4">
                Cookies are small text files that are stored on your device when you visit a website. They help websites
                remember information about your visit, which can make it easier to visit the site again and make the
                site more useful to you.
              </Paragraph>
              <Paragraph className="mb-4">Cookies perform many different functions, such as:</Paragraph>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Remembering your login status and preferences</li>
                <li>Keeping items in your shopping cart</li>
                <li>Analyzing how you use our website to improve performance</li>
                <li>Providing personalized content and advertisements</li>
                <li>Enabling social media features</li>
              </ul>
            </Card>
          </motion.div>

          {/* How We Use Cookies */}
          <motion.div variants={fadeInUp} custom={3} className="mb-12">
            <Card className="border-0 shadow-lg rounded-2xl">
              <Title level={2} className="text-2xl font-bold mb-6 text-primary-600">
                How We Use Cookies
              </Title>

              <div className="space-y-8">
                <div>
                  <Title level={3} className="text-xl font-semibold mb-3 text-green-600">
                    Essential Cookies (Always Active)
                  </Title>
                  <Paragraph className="mb-4">
                    These cookies are necessary for the website to function and cannot be switched off. They are usually
                    only set in response to actions made by you which amount to a request for services.
                  </Paragraph>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <Text strong>Examples:</Text>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Authentication and security cookies</li>
                      <li>Shopping cart functionality</li>
                      <li>Form submission and validation</li>
                      <li>Load balancing and performance</li>
                    </ul>
                  </div>
                </div>

                <Divider />

                <div>
                  <Title level={3} className="text-xl font-semibold mb-3 text-blue-600">
                    Analytics Cookies
                  </Title>
                  <Paragraph className="mb-4">
                    These cookies help us understand how visitors interact with our website by collecting and reporting
                    information anonymously.
                  </Paragraph>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <Text strong>We use analytics cookies to:</Text>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Count visits and traffic sources</li>
                      <li>Measure website performance</li>
                      <li>Understand user behavior patterns</li>
                      <li>Improve our website and services</li>
                    </ul>
                  </div>
                </div>

                <Divider />

                <div>
                  <Title level={3} className="text-xl font-semibold mb-3 text-orange-600">
                    Marketing Cookies
                  </Title>
                  <Paragraph className="mb-4">
                    These cookies track your online activity to help advertisers deliver more relevant advertising or to
                    limit how many times you see an ad.
                  </Paragraph>
                  <div className="bg-orange-50 p-4 rounded-xl">
                    <Text strong>Marketing cookies enable:</Text>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Personalized advertisements</li>
                      <li>Social media integration</li>
                      <li>Retargeting campaigns</li>
                      <li>Cross-platform tracking</li>
                    </ul>
                  </div>
                </div>

                <Divider />

                <div>
                  <Title level={3} className="text-xl font-semibold mb-3 text-purple-600">
                    Preference Cookies
                  </Title>
                  <Paragraph className="mb-4">
                    These cookies remember choices you make to give you better functionality and personal features.
                  </Paragraph>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <Text strong>Preference cookies remember:</Text>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Language and region settings</li>
                      <li>Theme and display preferences</li>
                      <li>Currency and measurement units</li>
                      <li>Accessibility settings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Managing Cookies */}
          <motion.div variants={fadeInUp} custom={4} className="mb-12">
            <Card className="border-0 shadow-lg rounded-2xl">
              <Title level={2} className="text-2xl font-bold mb-6 text-primary-600">
                Managing Your Cookie Preferences
              </Title>

              <div className="space-y-6">
                <div>
                  <Title level={3} className="text-xl font-semibold mb-3">
                    On Our Website
                  </Title>
                  <Paragraph>
                    You can manage your cookie preferences using the settings table above. Your choices will be saved
                    and applied to your future visits to our website.
                  </Paragraph>
                </div>

                <div>
                  <Title level={3} className="text-xl font-semibold mb-3">
                    In Your Browser
                  </Title>
                  <Paragraph className="mb-4">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </Paragraph>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Block all cookies</li>
                    <li>Block third-party cookies</li>
                    <li>Delete existing cookies</li>
                    <li>Set up notifications when cookies are sent</li>
                  </ul>
                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <InfoCircleOutlined className="text-yellow-600 mr-2" />
                    <Text strong className="text-yellow-700">
                      Note: Disabling cookies may affect the functionality of our website and your user experience.
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Third-Party Cookies */}
          <motion.div variants={fadeInUp} custom={5} className="mb-12">
            <Card className="border-0 shadow-lg rounded-2xl">
              <Title level={2} className="text-2xl font-bold mb-6 text-primary-600">
                Third-Party Cookies
              </Title>
              <Paragraph className="mb-4">
                Some cookies on our website are set by third-party services that appear on our pages. We use the
                following third-party services:
              </Paragraph>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Title level={4} className="mb-2">
                    Google Analytics
                  </Title>
                  <Paragraph className="text-sm text-gray-600 mb-2">
                    Helps us understand website usage and performance
                  </Paragraph>
                  <Text className="text-xs text-gray-500">Privacy Policy: policies.google.com/privacy</Text>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <Title level={4} className="mb-2">
                    Payment Processors
                  </Title>
                  <Paragraph className="text-sm text-gray-600 mb-2">
                    Secure payment processing and fraud prevention
                  </Paragraph>
                  <Text className="text-xs text-gray-500">Stripe, PayPal privacy policies apply</Text>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <Title level={4} className="mb-2">
                    Social Media
                  </Title>
                  <Paragraph className="text-sm text-gray-600 mb-2">
                    Social sharing buttons and embedded content
                  </Paragraph>
                  <Text className="text-xs text-gray-500">Facebook, Twitter, Instagram policies apply</Text>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <Title level={4} className="mb-2">
                    Customer Support
                  </Title>
                  <Paragraph className="text-sm text-gray-600 mb-2">Live chat and help desk functionality</Paragraph>
                  <Text className="text-xs text-gray-500">Third-party support tool privacy policies apply</Text>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeInUp} custom={6}>
            <Card className="border-0 shadow-lg rounded-2xl text-center bg-gradient-to-r from-primary-50 to-accent-50">
              <Title level={3} className="text-xl font-bold mb-4">
                Questions About Our Cookie Policy?
              </Title>
              <Paragraph className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you have any questions about our use of cookies or this cookie policy, please don't hesitate to
                contact us.
              </Paragraph>
              <div className="space-y-2 mb-6">
                <Paragraph className="mb-1">
                  <strong>Email:</strong> privacy@homindi.com
                </Paragraph>
                <Paragraph className="mb-1">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </Paragraph>
                <Paragraph className="mb-0">
                  <strong>Address:</strong> 123 Business Ave, New York, NY 10001
                </Paragraph>
              </div>
              <Button type="primary" size="large" className="rounded-xl">
                Contact Privacy Team
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
