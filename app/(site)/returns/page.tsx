"use client"

import { Typography, Card, Row, Col, Steps, Alert, Button } from "antd"
import {
  RetweetOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  MailOutlined,
} from "@ant-design/icons"
import { motion } from "framer-motion"
import Link from "next/link"

const { Title, Paragraph, Text } = Typography

export default function ReturnsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  }

  const returnSteps = [
    {
      title: "Contact Us",
      description: "Email us within 7 days of delivery with your order number and reason for return",
    },
    {
      title: "Return Authorization",
      description: "We'll provide a return authorization number and shipping instructions",
    },
    {
      title: "Package & Ship",
      description: "Securely package the items and ship using our provided label",
    },
    {
      title: "Inspection",
      description: "We inspect returned items to ensure they meet our return policy",
    },
    {
      title: "Refund Processed",
      description: "Approved refunds are processed within 5-10 business days",
    },
  ]

  const returnableItems = [
    {
      category: "Damaged Items",
      description: "Items that arrived damaged or defective",
      timeframe: "7 days",
      refundType: "Full refund + shipping costs",
      icon: "🔧",
    },
    {
      category: "Wrong Items",
      description: "Items that don't match your order",
      timeframe: "7 days",
      refundType: "Full refund + shipping costs",
      icon: "📦",
    },
    {
      category: "Quality Issues",
      description: "Items that don't meet quality standards",
      timeframe: "7 days",
      refundType: "Full refund",
      icon: "⭐",
    },
  ]

  const nonReturnableItems = [
    "Perishable food items (unless defective)",
    "Items consumed or used",
    "Items returned after 7 days",
    "Items without original packaging",
    "Custom or personalized items",
  ]

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
              Returns & Refunds
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
              We want you to be completely satisfied with your purchase. Learn about our return policy and how to return
              items if needed.
            </Paragraph>
          </motion.div>

          {/* Key Points Alert */}
          <motion.div variants={fadeInUp} custom={1} className="mb-12">
            <Alert
              message="Important Return Information"
              description="Due to the nature of food products, we have specific return policies. Please read carefully and contact us if you have any questions."
              type="info"
              showIcon
              className="rounded-xl"
            />
          </motion.div>

          {/* Return Process */}
          <motion.div variants={fadeInUp} custom={2} className="mb-12">
            <Card className="border-0 shadow-lg rounded-2xl">
              <Title level={2} className="text-2xl font-bold mb-8 text-center">
                Return Process
              </Title>
              <Steps
                direction="vertical"
                current={-1}
                items={returnSteps.map((step, index) => ({
                  title: step.title,
                  description: step.description,
                  icon: (
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  ),
                }))}
              />
            </Card>
          </motion.div>

          <Row gutter={[32, 32]} className="mb-12">
            {/* Returnable Items */}
            <Col xs={24} lg={12}>
              <motion.div variants={fadeInUp} custom={3}>
                <Card className="h-full border-0 shadow-lg rounded-2xl">
                  <Title level={3} className="text-xl font-bold mb-6 text-primary-600">
                    <CheckCircleOutlined className="mr-2" />
                    What Can Be Returned
                  </Title>
                  <div className="space-y-6">
                    {returnableItems.map((item, index) => (
                      <div key={index} className="p-4 bg-green-50 rounded-xl">
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1">
                            <Title level={4} className="text-lg font-semibold mb-1">
                              {item.category}
                            </Title>
                            <Paragraph className="text-gray-600 mb-2">{item.description}</Paragraph>
                            <div className="flex justify-between text-sm">
                              <Text strong className="text-primary-600">
                                Timeframe: {item.timeframe}
                              </Text>
                              <Text strong className="text-green-600">
                                {item.refundType}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </Col>

            {/* Non-Returnable Items */}
            <Col xs={24} lg={12}>
              <motion.div variants={fadeInUp} custom={4}>
                <Card className="h-full border-0 shadow-lg rounded-2xl">
                  <Title level={3} className="text-xl font-bold mb-6 text-error-600">
                    <ClockCircleOutlined className="mr-2" />
                    What Cannot Be Returned
                  </Title>
                  <div className="space-y-3">
                    {nonReturnableItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <span className="text-error-500">✗</span>
                        <Text className="text-gray-700">{item}</Text>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-orange-50 rounded-xl">
                    <Text strong className="text-orange-600">
                      💡 Note: Even if an item is typically non-returnable, we may make exceptions for quality issues or
                      our errors. Contact us to discuss your specific situation.
                    </Text>
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>

          {/* Refund Information */}
          <motion.div variants={fadeInUp} custom={5} className="mb-12">
            <Card className="border-0 shadow-lg rounded-2xl">
              <Title level={2} className="text-2xl font-bold mb-8 text-center">
                Refund Information
              </Title>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <DollarOutlined className="text-2xl text-primary-500" />
                    </div>
                    <Title level={4} className="mb-2">
                      Refund Method
                    </Title>
                    <Paragraph className="text-gray-600 mb-0">
                      Refunds are processed to your original payment method (credit card, PayPal, etc.)
                    </Paragraph>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-accent-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <ClockCircleOutlined className="text-2xl text-accent-500" />
                    </div>
                    <Title level={4} className="mb-2">
                      Processing Time
                    </Title>
                    <Paragraph className="text-gray-600 mb-0">
                      Approved refunds are processed within 5-10 business days after we receive the returned item
                    </Paragraph>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <SafetyOutlined className="text-2xl text-green-500" />
                    </div>
                    <Title level={4} className="mb-2">
                      Refund Amount
                    </Title>
                    <Paragraph className="text-gray-600 mb-0">
                      Full product price refunded. Original shipping costs refunded only for our errors or defective
                      items
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            </Card>
          </motion.div>

          {/* Exchange Policy */}
          <motion.div variants={fadeInUp} custom={6} className="mb-12">
            <Card className="border-0 shadow-lg rounded-2xl">
              <Title level={2} className="text-2xl font-bold mb-6">
                Exchange Policy
              </Title>
              <Row gutter={[24, 24]} className="items-center">
                <Col xs={24} lg={16}>
                  <Paragraph className="text-lg mb-4">
                    We currently do not offer direct exchanges due to the perishable nature of our products and
                    inventory management. However, we can process a return and refund, and you can place a new order for
                    the desired items.
                  </Paragraph>
                  <Paragraph className="mb-4">
                    <strong>For faster service:</strong> If you need a replacement for a damaged or incorrect item, we
                    can often ship the replacement immediately while processing your return in parallel.
                  </Paragraph>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <Text strong className="text-blue-600">
                      💡 Pro Tip: Contact our customer service team for expedited replacement processing on damaged or
                      incorrect items.
                    </Text>
                  </div>
                </Col>
                <Col xs={24} lg={8}>
                  <div className="text-center">
                    <RetweetOutlined className="text-6xl text-primary-500 mb-4" />
                    <Title level={4}>Quick Replacement</Title>
                    <Paragraph className="text-gray-600">
                      Fast replacement service for damaged or incorrect items
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeInUp} custom={7}>
            <Card className="border-0 shadow-lg rounded-2xl text-center bg-gradient-to-r from-primary-50 to-accent-50">
              <Title level={3} className="text-xl font-bold mb-4">
                Need to Start a Return?
              </Title>
              <Paragraph className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our customer service team is ready to help you with your return. Contact us with your order number and
                we'll guide you through the process.
              </Paragraph>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-white rounded-xl">
                  <MailOutlined className="text-2xl text-primary-500 mb-2" />
                  <Title level={4} className="mb-1">
                    Email Support
                  </Title>
                  <Text>returns@homindi.com</Text>
                  <br />
                  <Text type="secondary">Response within 24 hours</Text>
                </div>
                <div className="p-4 bg-white rounded-xl">
                  <ClockCircleOutlined className="text-2xl text-primary-500 mb-2" />
                  <Title level={4} className="mb-1">
                    Phone Support
                  </Title>
                  <Text>+1 (555) 123-4567</Text>
                  <br />
                  <Text type="secondary">Mon-Fri, 9 AM - 6 PM EST</Text>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="large" type="primary" className="h-12 px-8 text-lg font-semibold rounded-xl">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/dashboard/orders">
                  <Button
                    size="large"
                    className="h-12 px-8 text-lg font-semibold rounded-xl border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300"
                  >
                    View My Orders
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

    </div>
  )
}
