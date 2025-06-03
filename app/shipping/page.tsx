"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Typography, Card, Row, Col, Table, Tag, Timeline, Alert } from "antd"
import {
  TruckOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  SafetyOutlined,
  DollarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"
import { motion } from "framer-motion"
import { colors, gradients } from "@/lib/theme"

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
      countries: ["United States", "Canada", "Mexico"],
      standardTime: "3-5 business days",
      expressTime: "1-2 business days",
      standardCost: "$9.99",
      expressCost: "$24.99",
      freeShippingThreshold: "$75",
    },
    {
      zone: "Zone 2 - Europe",
      countries: ["United Kingdom", "Germany", "France", "Netherlands", "Belgium", "Italy", "Spain"],
      standardTime: "5-7 business days",
      expressTime: "2-3 business days",
      standardCost: "$14.99",
      expressCost: "$34.99",
      freeShippingThreshold: "$100",
    },
    {
      zone: "Zone 3 - Australia & New Zealand",
      countries: ["Australia", "New Zealand"],
      standardTime: "7-10 business days",
      expressTime: "3-5 business days",
      standardCost: "$19.99",
      expressCost: "$44.99",
      freeShippingThreshold: "$125",
    },
    {
      zone: "Zone 4 - Other Countries",
      countries: ["All other supported countries"],
      standardTime: "10-15 business days",
      expressTime: "5-7 business days",
      standardCost: "$24.99",
      expressCost: "$54.99",
      freeShippingThreshold: "$150",
    },
  ]

  const columns = [
    {
      title: "Shipping Zone",
      dataIndex: "zone",
      key: "zone",
      render: (text: string) => (
        <Text strong style={{ color: colors.primary[500] }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Countries",
      dataIndex: "countries",
      key: "countries",
      render: (countries: string[]) => (
        <div>
          {countries.map((country, index) => (
            <Tag
              key={index}
              style={{ marginBottom: 4, backgroundColor: colors.background.secondary, color: colors.text.primary }}
            >
              {country}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Standard Shipping",
      key: "standard",
      render: (record: any) => (
        <div>
          <div style={{ color: colors.text.primary }}>{record.standardCost}</div>
          <div style={{ color: colors.text.secondary, fontSize: "12px" }}>{record.standardTime}</div>
        </div>
      ),
    },
    {
      title: "Express Shipping",
      key: "express",
      render: (record: any) => (
        <div>
          <div style={{ color: colors.text.primary }}>{record.expressCost}</div>
          <div style={{ color: colors.text.secondary, fontSize: "12px" }}>{record.expressTime}</div>
        </div>
      ),
    },
    {
      title: "Free Shipping",
      dataIndex: "freeShippingThreshold",
      key: "freeShippingThreshold",
      render: (text: string) => (
        <Tag
          style={{
            backgroundColor: colors.success[100],
            color: colors.success[700],
            border: `1px solid ${colors.success[300]}`,
          }}
        >
          Orders over {text}
        </Tag>
      ),
    },
  ]

  const shippingProcess = [
    {
      title: "Order Placed",
      description: "Your order is received and payment is confirmed",
      icon: <CheckCircleOutlined style={{ color: colors.success[500] }} />,
    },
    {
      title: "Processing",
      description: "We prepare and package your items (1-2 business days)",
      icon: <ClockCircleOutlined style={{ color: colors.warning[500] }} />,
    },
    {
      title: "Shipped",
      description: "Your package is handed over to our shipping partner",
      icon: <TruckOutlined style={{ color: colors.info[500] }} />,
    },
    {
      title: "In Transit",
      description: "Your package is on its way to you",
      icon: <GlobalOutlined style={{ color: colors.primary[500] }} />,
    },
    {
      title: "Delivered",
      description: "Your package arrives at your doorstep",
      icon: <SafetyOutlined style={{ color: colors.success[500] }} />,
    },
  ]

  const features = [
    {
      icon: <TruckOutlined className="text-3xl" style={{ color: colors.primary[500] }} />,
      title: "Fast & Reliable",
      description: "Express shipping options available to most countries with tracking included.",
    },
    {
      icon: <SafetyOutlined className="text-3xl" style={{ color: colors.success[500] }} />,
      title: "Secure Packaging",
      description: "All items are carefully packaged to ensure they arrive fresh and undamaged.",
    },
    {
      icon: <DollarOutlined className="text-3xl" style={{ color: colors.secondary[500] }} />,
      title: "Free Shipping",
      description: "Enjoy free standard shipping on orders above the threshold for your region.",
    },
    {
      icon: <GlobalOutlined className="text-3xl" style={{ color: colors.info[500] }} />,
      title: "Worldwide Delivery",
      description: "We ship to over 35 countries across North America, Europe, and beyond.",
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background.secondary }}>
      <Header />

      {/* Hero Section */}
      <section className="py-16" style={{ background: gradients.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.div variants={fadeInUp}>
              <Title level={1} className="text-white mb-4 text-4xl lg:text-5xl font-bold">
                Shipping Information
              </Title>
              <Paragraph className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                Fast, reliable, and secure delivery of authentic African ingredients to your doorstep worldwide.
              </Paragraph>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
          {/* Features */}
          <motion.div variants={fadeInUp} className="mb-12">
            <Row gutter={[24, 24]}>
              {features.map((feature, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <Card
                    className="h-full text-center border-0 rounded-2xl shadow-lg"
                    style={{ backgroundColor: colors.background.primary }}
                  >
                    <div className="p-6">
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                        style={{ backgroundColor: `${colors.primary[500]}10` }}
                      >
                        {feature.icon}
                      </div>
                      <Title level={4} className="mb-3" style={{ color: colors.text.primary }}>
                        {feature.title}
                      </Title>
                      <Paragraph style={{ color: colors.text.secondary }}>{feature.description}</Paragraph>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </motion.div>

          {/* Shipping Zones Table */}
          <motion.div variants={fadeInUp} custom={1} className="mb-12">
            <Card className="rounded-2xl border-0 shadow-lg" style={{ backgroundColor: colors.background.primary }}>
              <div className="p-8">
                <Title level={2} className="mb-6" style={{ color: colors.text.primary }}>
                  Shipping Zones & Rates
                </Title>
                <Table
                  dataSource={shippingZones}
                  columns={columns}
                  pagination={false}
                  rowKey="zone"
                  className="shipping-table"
                />
              </div>
            </Card>
          </motion.div>

          {/* Shipping Process */}
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={12}>
              <motion.div variants={fadeInUp} custom={2}>
                <Card
                  className="h-full rounded-2xl border-0 shadow-lg"
                  style={{ backgroundColor: colors.background.primary }}
                >
                  <div className="p-8">
                    <Title level={3} className="mb-6" style={{ color: colors.text.primary }}>
                      How Shipping Works
                    </Title>
                    <Timeline
                      items={shippingProcess.map((step, index) => ({
                        dot: step.icon,
                        children: (
                          <div>
                            <Title level={5} style={{ color: colors.text.primary }}>
                              {step.title}
                            </Title>
                            <Paragraph style={{ color: colors.text.secondary }}>{step.description}</Paragraph>
                          </div>
                        ),
                      }))}
                    />
                  </div>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} lg={12}>
              <motion.div variants={fadeInUp} custom={3}>
                <Card
                  className="h-full rounded-2xl border-0 shadow-lg"
                  style={{ backgroundColor: colors.background.primary }}
                >
                  <div className="p-8">
                    <Title level={3} className="mb-6" style={{ color: colors.text.primary }}>
                      Important Information
                    </Title>

                    <Alert
                      message="Processing Time"
                      description="All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day."
                      type="info"
                      showIcon
                      className="mb-4"
                      style={{
                        backgroundColor: colors.info[50],
                        borderColor: colors.info[200],
                      }}
                    />

                    <Alert
                      message="Customs & Duties"
                      description="International customers may be responsible for customs duties and taxes imposed by their country. These fees are not included in our shipping costs."
                      type="warning"
                      showIcon
                      className="mb-4"
                      style={{
                        backgroundColor: colors.warning[50],
                        borderColor: colors.warning[200],
                      }}
                    />

                    <Alert
                      message="Perishable Items"
                      description="Fresh and perishable items are shipped with special packaging and expedited shipping to ensure quality upon arrival."
                      type="success"
                      showIcon
                      style={{
                        backgroundColor: colors.success[50],
                        borderColor: colors.success[200],
                      }}
                    />

                    <div className="mt-6">
                      <Title level={5} style={{ color: colors.text.primary }}>
                        Need Help?
                      </Title>
                      <Paragraph style={{ color: colors.text.secondary }}>
                        If you have questions about shipping or need to track your order, contact our customer service
                        team:
                      </Paragraph>
                      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: colors.background.secondary }}>
                        <Paragraph className="mb-2" style={{ color: colors.text.primary }}>
                          <Text strong>Email:</Text> shipping@homindi.com
                        </Paragraph>
                        <Paragraph className="mb-0" style={{ color: colors.text.primary }}>
                          <Text strong>Phone:</Text> +1 (555) 123-4567
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
