"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Typography, Card, Row, Col, Timeline, Table, Tag, Alert } from "antd"
import { TruckOutlined, ClockCircleOutlined, GlobalOutlined, SafetyOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"

const { Title, Paragraph, Text } = Typography

export default function ShippingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  }

  const shippingZones = [
    {
      zone: "Zone 1 - North America",
      countries: ["United States", "Canada"],
      standardDelivery: "3-5 business days",
      expressDelivery: "1-2 business days",
      standardCost: "$9.99",
      expressCost: "$24.99",
      freeShippingThreshold: "$75",
    },
    {
      zone: "Zone 2 - Europe",
      countries: ["United Kingdom", "Germany", "France", "Netherlands", "Belgium"],
      standardDelivery: "5-7 business days",
      expressDelivery: "2-3 business days",
      standardCost: "$14.99",
      expressCost: "$34.99",
      freeShippingThreshold: "$100",
    },
    {
      zone: "Zone 3 - Australia & New Zealand",
      countries: ["Australia", "New Zealand"],
      standardDelivery: "7-10 business days",
      expressDelivery: "3-5 business days",
      standardCost: "$19.99",
      expressCost: "$44.99",
      freeShippingThreshold: "$125",
    },
    {
      zone: "Zone 4 - Other Countries",
      countries: ["Other supported countries"],
      standardDelivery: "10-15 business days",
      expressDelivery: "5-7 business days",
      standardCost: "$24.99",
      expressCost: "$54.99",
      freeShippingThreshold: "$150",
    },
  ]

  const trackingSteps = [
    {
      title: "Order Confirmed",
      description: "Your order has been received and is being prepared",
      icon: <ClockCircleOutlined className="text-primary-500" />,
    },
    {
      title: "Processing",
      description: "Items are being picked and packed in our warehouse",
      icon: <SafetyOutlined className="text-primary-500" />,
    },
    {
      title: "Shipped",
      description: "Your order is on its way to you",
      icon: <TruckOutlined className="text-primary-500" />,
    },
    {
      title: "Delivered",
      description: "Your order has been delivered successfully",
      icon: <GlobalOutlined className="text-primary-500" />,
    },
  ]

  const columns = [
    {
      title: "Shipping Zone",
      dataIndex: "zone",
      key: "zone",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Countries",
      dataIndex: "countries",
      key: "countries",
      render: (countries: string[]) => (
        <div>
          {countries.map((country, index) => (
            <Tag key={index} color="blue" className="mb-1">
              {country}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Standard Delivery",
      dataIndex: "standardDelivery",
      key: "standardDelivery",
    },
    {
      title: "Standard Cost",
      dataIndex: "standardCost",
      key: "standardCost",
      render: (cost: string) => (
        <Text strong className="text-primary-600">
          {cost}
        </Text>
      ),
    },
    {
      title: "Free Shipping Threshold",
      dataIndex: "freeShippingThreshold",
      key: "freeShippingThreshold",
      render: (threshold: string) => (
        <Text strong className="text-accent-600">
          {threshold}
        </Text>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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
              Shipping Information
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fast, reliable delivery of authentic African ingredients to your doorstep, anywhere in the world.
            </Paragraph>
          </motion.div>

          {/* Key Features */}
          <motion.div variants={fadeInUp} custom={1} className="mb-12">
            <Row gutter={[24, 24]}>
              {[
                {
                  icon: <TruckOutlined className="text-3xl text-primary-500" />,
                  title: "Fast Delivery",
                  description: "Express shipping available to most countries",
                },
                {
                  icon: <GlobalOutlined className="text-3xl text-primary-500" />,
                  title: "Worldwide Shipping",
                  description: "We deliver to 25+ countries globally",
                },
                {
                  icon: <SafetyOutlined className="text-3xl text-primary-500" />,
                  title: "Secure Packaging",
                  description: "Temperature-controlled packaging for freshness",
                },
                {
                  icon: <ClockCircleOutlined className="text-3xl text-primary-500" />,
                  title: "Real-time Tracking",
                  description: "Track your order from warehouse to doorstep",
                },
              ].map((feature, index) => (
                <Col key={index} xs={24} sm={12} lg={6}>
                  <Card className="text-center h-full border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
                    <div className="mb-4">{feature.icon}</div>
                    <Title level={4} className="mb-2">
                      {feature.title}
                    </Title>
                    <Paragraph className="text-gray-600 mb-0">{feature.description}</Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </motion.div>

          {/* Free Shipping Alert */}
          <motion.div variants={fadeInUp} custom={2} className="mb-12">
            <Alert
              message="Free Shipping Available!"
              description="Enjoy free standard shipping on orders above the threshold for your region. Express shipping discounts also available for larger orders."
              type="success"
              showIcon
              className="rounded-xl text-center"
            />
          </motion.div>

          {/* Shipping Zones Table */}
          <motion.div variants={fadeInUp} custom={3} className="mb-12">
            <Card className="border-0 shadow-lg rounded-2xl">
              <Title level={2} className="text-2xl font-bold mb-6 text-center">
                Shipping Zones & Rates
              </Title>
              <Table
                columns={columns}
                dataSource={shippingZones}
                pagination={false}
                rowKey="zone"
                className="rounded-xl overflow-hidden"
              />
            </Card>
          </motion.div>

          <Row gutter={[32, 32]}>
            {/* Order Tracking */}
            <Col xs={24} lg={12}>
              <motion.div variants={fadeInUp} custom={4}>
                <Card className="h-full border-0 shadow-lg rounded-2xl">
                  <Title level={3} className="text-xl font-bold mb-6">
                    Order Tracking Process
                  </Title>
                  <Timeline
                    items={trackingSteps.map((step, index) => ({
                      dot: step.icon,
                      children: (
                        <div>
                          <Text strong className="block mb-1">
                            {step.title}
                          </Text>
                          <Text type="secondary">{step.description}</Text>
                        </div>
                      ),
                    }))}
                  />
                  <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                    <Text strong className="text-primary-600">
                      💡 Tip: You'll receive email notifications at each step, plus SMS updates for express deliveries.
                    </Text>
                  </div>
                </Card>
              </motion.div>
            </Col>

            {/* Shipping Policies */}
            <Col xs={24} lg={12}>
              <motion.div variants={fadeInUp} custom={5}>
                <Card className="h-full border-0 shadow-lg rounded-2xl">
                  <Title level={3} className="text-xl font-bold mb-6">
                    Shipping Policies
                  </Title>

                  <div className="space-y-6">
                    <div>
                      <Title level={4} className="text-lg font-semibold mb-2 text-primary-600">
                        Processing Time
                      </Title>
                      <Paragraph className="mb-0">
                        Orders are typically processed within 1-2 business days. Orders placed on weekends or holidays
                        will be processed the next business day.
                      </Paragraph>
                    </div>

                    <div>
                      <Title level={4} className="text-lg font-semibold mb-2 text-primary-600">
                        Delivery Attempts
                      </Title>
                      <Paragraph className="mb-0">
                        Our carriers will make up to 3 delivery attempts. If unsuccessful, packages will be held at the
                        local facility for pickup or returned to sender.
                      </Paragraph>
                    </div>

                    <div>
                      <Title level={4} className="text-lg font-semibold mb-2 text-primary-600">
                        Customs & Duties
                      </Title>
                      <Paragraph className="mb-0">
                        International customers are responsible for any customs duties, taxes, or fees imposed by their
                        country. These are not included in our shipping costs.
                      </Paragraph>
                    </div>

                    <div>
                      <Title level={4} className="text-lg font-semibold mb-2 text-primary-600">
                        Damaged Packages
                      </Title>
                      <Paragraph className="mb-0">
                        If your package arrives damaged, please contact us within 48 hours with photos. We'll arrange a
                        replacement or refund immediately.
                      </Paragraph>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>

          {/* Special Handling */}
          <motion.div variants={fadeInUp} custom={6} className="mb-12">
            <Card className="border-0 shadow-lg rounded-2xl">
              <Title level={3} className="text-xl font-bold mb-6 text-center">
                Special Handling & Temperature Control
              </Title>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <span className="text-2xl">❄️</span>
                    </div>
                    <Title level={4} className="mb-2">
                      Frozen Items
                    </Title>
                    <Paragraph className="text-gray-600 mb-0">
                      Shipped with dry ice in insulated packaging to maintain frozen temperatures during transit.
                    </Paragraph>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <span className="text-2xl">🌡️</span>
                    </div>
                    <Title level={4} className="mb-2">
                      Refrigerated Items
                    </Title>
                    <Paragraph className="text-gray-600 mb-0">
                      Temperature-controlled packaging ensures freshness for perishable items during delivery.
                    </Paragraph>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <span className="text-2xl">📦</span>
                    </div>
                    <Title level={4} className="mb-2">
                      Dry Goods
                    </Title>
                    <Paragraph className="text-gray-600 mb-0">
                      Carefully packaged to prevent damage and maintain quality during standard shipping.
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            </Card>
          </motion.div>

          {/* Contact for Shipping Questions */}
          <motion.div variants={fadeInUp} custom={7}>
            <Card className="border-0 shadow-lg rounded-2xl text-center bg-gradient-to-r from-primary-50 to-accent-50">
              <Title level={3} className="text-xl font-bold mb-4">
                Have Shipping Questions?
              </Title>
              <Paragraph className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our customer service team is here to help with any shipping-related questions or concerns. We're
                committed to getting your authentic African ingredients to you safely and on time.
              </Paragraph>
              <div className="space-y-2">
                <Paragraph className="mb-1">
                  <strong>Email:</strong> shipping@homindi.com
                </Paragraph>
                <Paragraph className="mb-1">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </Paragraph>
                <Paragraph className="mb-0">
                  <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
                </Paragraph>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
