"use client"

import { Typography, Card, Row, Col, Input, Collapse, Button, Tag } from "antd"
import {
  SearchOutlined,
  QuestionCircleOutlined,
  ShoppingOutlined,
  TruckOutlined,
  CreditCardOutlined,
  UserOutlined,
  SafetyOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  }

  const helpCategories = [
    {
      icon: <ShoppingOutlined className="text-3xl text-primary-500" />,
      title: "Orders & Shopping",
      description: "How to place orders, modify orders, and shopping tips",
      count: 12,
      color: "blue",
    },
    {
      icon: <TruckOutlined className="text-3xl text-primary-500" />,
      title: "Shipping & Delivery",
      description: "Shipping rates, delivery times, and tracking information",
      count: 8,
      color: "green",
    },
    {
      icon: <CreditCardOutlined className="text-3xl text-primary-500" />,
      title: "Payment & Billing",
      description: "Payment methods, billing issues, and refunds",
      count: 6,
      color: "orange",
    },
    {
      icon: <UserOutlined className="text-3xl text-primary-500" />,
      title: "Account Management",
      description: "Account settings, password reset, and profile updates",
      count: 5,
      color: "purple",
    },
    {
      icon: <SafetyOutlined className="text-3xl text-primary-500" />,
      title: "Product Quality",
      description: "Product information, quality standards, and storage tips",
      count: 10,
      color: "red",
    },
    {
      icon: <QuestionCircleOutlined className="text-3xl text-primary-500" />,
      title: "General Questions",
      description: "About Homindi, policies, and general inquiries",
      count: 7,
      color: "cyan",
    },
  ]

  const popularQuestions = [
    {
      category: "Orders",
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'My Orders' section. You'll also receive tracking information via email once your order ships.",
    },
    {
      category: "Shipping",
      question: "What are your shipping rates and delivery times?",
      answer:
        "Shipping rates vary by location. Standard shipping is $9.99 for North America (3-5 days), $14.99 for Europe (5-7 days). Free shipping is available on orders over the regional threshold.",
    },
    {
      category: "Products",
      question: "How do you ensure product freshness?",
      answer:
        "We use temperature-controlled packaging and work with trusted suppliers. Frozen items are shipped with dry ice, and refrigerated items use insulated packaging to maintain freshness.",
    },
    {
      category: "Returns",
      question: "Can I return perishable food items?",
      answer:
        "Due to food safety regulations, we generally cannot accept returns of perishable items unless they arrive damaged or defective. Contact us within 7 days if you receive damaged items.",
    },
    {
      category: "Payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are processed securely through encrypted payment gateways.",
    },
    {
      category: "Account",
      question: "How do I reset my password?",
      answer:
        "Click 'Forgot Password' on the login page and enter your email address. You'll receive a password reset link within a few minutes. Check your spam folder if you don't see it.",
    },
  ]

  const filteredQuestions = popularQuestions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <Title level={1} className="text-4xl font-bold mb-4">
              Help Center
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions or get in touch with our support team. We're here to help you have the
              best experience with Homindi.
            </Paragraph>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Input
                size="large"
                placeholder="Search for help articles, FAQs, or topics..."
                prefix={<SearchOutlined className="text-gray-400" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-xl h-14 text-lg"
              />
            </div>
          </motion.div>

          {/* Help Categories */}
          <motion.div variants={fadeInUp} custom={1} className="mb-12">
            <Title level={2} className="text-2xl font-bold mb-8 text-center">
              Browse by Category
            </Title>
            <Row gutter={[24, 24]}>
              {helpCategories.map((category, index) => (
                <Col key={index} xs={24} sm={12} lg={8}>
                  <Card className="h-full border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                    <div className="text-center">
                      <div className="mb-4">{category.icon}</div>
                      <Title level={4} className="mb-2">
                        {category.title}
                      </Title>
                      <Paragraph className="text-gray-600 mb-4">{category.description}</Paragraph>
                      <Tag color={category.color}>{category.count} articles</Tag>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </motion.div>

          {/* Popular Questions */}
          <motion.div variants={fadeInUp} custom={2} className="mb-12">
            <Card className="border-0 shadow-lg rounded-2xl">
              <Title level={2} className="text-2xl font-bold mb-8 text-center">
                {searchTerm ? `Search Results (${filteredQuestions.length})` : "Frequently Asked Questions"}
              </Title>

              {filteredQuestions.length > 0 ? (
                <Collapse ghost expandIconPosition="end" className="bg-transparent">
                  {filteredQuestions.map((item, index) => (
                    <Panel
                      header={
                        <div className="flex items-center space-x-3">
                          <Tag color="blue">{item.category}</Tag>
                          <Text strong className="text-lg">
                            {item.question}
                          </Text>
                        </div>
                      }
                      key={index}
                      className="mb-4 bg-gray-50 rounded-xl"
                    >
                      <Paragraph className="text-gray-700 leading-relaxed pl-4">{item.answer}</Paragraph>
                    </Panel>
                  ))}
                </Collapse>
              ) : (
                <div className="text-center py-12">
                  <QuestionCircleOutlined className="text-6xl text-gray-300 mb-4" />
                  <Title level={4} className="text-gray-500 mb-2">
                    No results found
                  </Title>
                  <Paragraph className="text-gray-400">Try different keywords or browse our categories above</Paragraph>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeInUp} custom={3} className="mb-12">
            <Title level={2} className="text-2xl font-bold mb-8 text-center">
              Quick Actions
            </Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={6}>
                <Link href="/dashboard/orders">
                  <Card className="text-center h-full border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                    <TruckOutlined className="text-3xl text-primary-500 mb-3" />
                    <Title level={4} className="mb-2">
                      Track Order
                    </Title>
                    <Text className="text-gray-600">Check your order status</Text>
                  </Card>
                </Link>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Link href="/returns">
                  <Card className="text-center h-full border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                    <SafetyOutlined className="text-3xl text-primary-500 mb-3" />
                    <Title level={4} className="mb-2">
                      Return Item
                    </Title>
                    <Text className="text-gray-600">Start a return process</Text>
                  </Card>
                </Link>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Link href="/dashboard/settings">
                  <Card className="text-center h-full border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                    <UserOutlined className="text-3xl text-primary-500 mb-3" />
                    <Title level={4} className="mb-2">
                      Account Settings
                    </Title>
                    <Text className="text-gray-600">Manage your account</Text>
                  </Card>
                </Link>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Link href="/contact">
                  <Card className="text-center h-full border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                    <MailOutlined className="text-3xl text-primary-500 mb-3" />
                    <Title level={4} className="mb-2">
                      Contact Us
                    </Title>
                    <Text className="text-gray-600">Get personalized help</Text>
                  </Card>
                </Link>
              </Col>
            </Row>
          </motion.div>

          {/* Contact Support */}
          <motion.div variants={fadeInUp} custom={4}>
            <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50">
              <Row gutter={[32, 32]} className="items-center">
                <Col xs={24} lg={16}>
                  <Title level={3} className="text-xl font-bold mb-4">
                    Still Need Help?
                  </Title>
                  <Paragraph className="text-lg text-gray-600 mb-6">
                    Can't find what you're looking for? Our customer support team is available to help you with any
                    questions or concerns. We typically respond within 24 hours.
                  </Paragraph>

                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <div className="flex items-center space-x-3 p-4 bg-white rounded-xl">
                        <MailOutlined className="text-2xl text-primary-500" />
                        <div>
                          <Text strong className="block">
                            Email Support
                          </Text>
                          <Text type="secondary">support@homindi.com</Text>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={12}>
                      <div className="flex items-center space-x-3 p-4 bg-white rounded-xl">
                        <PhoneOutlined className="text-2xl text-primary-500" />
                        <div>
                          <Text strong className="block">
                            Phone Support
                          </Text>
                          <Text type="secondary">+1 (555) 123-4567</Text>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col xs={24} lg={8}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary-500 rounded-full mx-auto flex items-center justify-center mb-4">
                      <MailOutlined className="text-3xl text-white" />
                    </div>
                    <Link href="/contact">
                      <Button size="large" type="primary" className="w-full h-12 text-lg font-semibold rounded-xl">
                        Contact Support
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card>
          </motion.div>
        </motion.div>
      </div>

    </div>
  )
}
