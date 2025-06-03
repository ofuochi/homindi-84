"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Typography, Card, Row, Col, Steps, Alert, Button } from "antd"
import {
  RetweetOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons"
import { motion } from "framer-motion"
import { colors, gradients } from "@/lib/theme"
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
      description: "Email us within 30 days of delivery to initiate a return",
      icon: <MailOutlined />,
    },
    {
      title: "Get Authorization",
      description: "Receive return authorization number and shipping instructions",
      icon: <CheckCircleOutlined />,
    },
    {
      title: "Package Items",
      description: "Securely package items in original packaging if possible",
      icon: <SafetyOutlined />,
    },
    {
      title: "Ship Back",
      description: "Send items back using provided shipping label",
      icon: <RetweetOutlined />,
    },
    {
      title: "Receive Refund",
      description: "Get your refund processed within 5-10 business days",
      icon: <DollarOutlined />,
    },
  ]

  const returnPolicies = [
    {
      category: "Non-Perishable Items",
      timeLimit: "30 days",
      conditions: [
        "Items must be unopened and in original packaging",
        "Must be in resalable condition",
        "Original receipt or order number required",
        "Return shipping costs paid by customer (unless our error)",
      ],
      refundType: "Full refund to original payment method",
      color: colors.success[500],
    },
    {
      category: "Perishable Items",
      timeLimit: "48 hours",
      conditions: [
        "Only accepted if items arrive damaged or spoiled",
        "Photo evidence of damage required",
        "Must contact us immediately upon delivery",
        "Replacement or full refund available",
      ],
      refundType: "Full refund or replacement",
      color: colors.warning[500],
    },
    {
      category: "Custom Orders",
      timeLimit: "Not returnable",
      conditions: [
        "Special orders cannot be returned",
        "Items made to customer specifications",
        "Bulk orders over $500",
        "Exceptions made for quality issues only",
      ],
      refundType: "No refund (quality issues excepted)",
      color: colors.error[500],
    },
  ]

  const features = [
    {
      icon: <ClockCircleOutlined className="text-3xl" style={{ color: colors.primary[500] }} />,
      title: "30-Day Window",
      description: "You have 30 days from delivery to return non-perishable items.",
    },
    {
      icon: <SafetyOutlined className="text-3xl" style={{ color: colors.success[500] }} />,
      title: "Quality Guarantee",
      description: "We stand behind the quality of all our products and will make it right.",
    },
    {
      icon: <DollarOutlined className="text-3xl" style={{ color: colors.secondary[500] }} />,
      title: "Easy Refunds",
      description: "Refunds are processed quickly back to your original payment method.",
    },
    {
      icon: <RetweetOutlined className="text-3xl" style={{ color: colors.info[500] }} />,
      title: "Simple Process",
      description: "Our return process is straightforward and customer-friendly.",
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
                Returns & Refunds
              </Title>
              <Paragraph className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                We want you to be completely satisfied with your purchase. Learn about our return policy and process.
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

          {/* Return Process */}
          <motion.div variants={fadeInUp} custom={1} className="mb-12">
            <Card className="rounded-2xl border-0 shadow-lg" style={{ backgroundColor: colors.background.primary }}>
              <div className="p-8">
                <Title level={2} className="mb-6 text-center" style={{ color: colors.text.primary }}>
                  How to Return Items
                </Title>
                <Steps
                  direction="horizontal"
                  current={-1}
                  items={returnSteps.map((step, index) => ({
                    title: step.title,
                    description: step.description,
                    icon: step.icon,
                  }))}
                  className="mb-8"
                />
                <div className="text-center">
                  <Link href="/contact">
                    <Button
                      type="primary"
                      size="large"
                      className="rounded-xl"
                      style={{
                        background: gradients.primary,
                        borderColor: colors.primary[500],
                      }}
                    >
                      Start Return Process
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Return Policies */}
          <motion.div variants={fadeInUp} custom={2} className="mb-12">
            <Title level={2} className="mb-6 text-center" style={{ color: colors.text.primary }}>
              Return Policies by Category
            </Title>
            <Row gutter={[24, 24]}>
              {returnPolicies.map((policy, index) => (
                <Col xs={24} lg={8} key={index}>
                  <Card
                    className="h-full rounded-2xl border-0 shadow-lg"
                    style={{ backgroundColor: colors.background.primary }}
                  >
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <div
                          className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                          style={{ backgroundColor: `${policy.color}15` }}
                        >
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: policy.color }}></div>
                        </div>
                        <Title level={4} style={{ color: colors.text.primary }}>
                          {policy.category}
                        </Title>
                        <Text strong className="text-lg" style={{ color: policy.color }}>
                          {policy.timeLimit}
                        </Text>
                      </div>

                      <div className="mb-4">
                        <Text strong style={{ color: colors.text.primary }}>
                          Conditions:
                        </Text>
                        <ul className="mt-2 space-y-1">
                          {policy.conditions.map((condition, cIndex) => (
                            <li key={cIndex} style={{ color: colors.text.secondary }}>
                              • {condition}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg" style={{ backgroundColor: colors.background.secondary }}>
                        <Text strong style={{ color: colors.text.primary }}>
                          Refund Type:
                        </Text>
                        <div style={{ color: colors.text.secondary }}>{policy.refundType}</div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </motion.div>

          {/* Important Notes */}
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={12}>
              <motion.div variants={fadeInUp} custom={3}>
                <Card
                  className="h-full rounded-2xl border-0 shadow-lg"
                  style={{ backgroundColor: colors.background.primary }}
                >
                  <div className="p-8">
                    <Title level={3} className="mb-6" style={{ color: colors.text.primary }}>
                      Important Notes
                    </Title>

                    <Alert
                      message="Return Shipping"
                      description="Customers are responsible for return shipping costs unless the return is due to our error or a defective product."
                      type="info"
                      showIcon
                      className="mb-4"
                      style={{
                        backgroundColor: colors.info[50],
                        borderColor: colors.info[200],
                      }}
                    />

                    <Alert
                      message="Refund Processing"
                      description="Refunds are processed within 5-10 business days after we receive and inspect the returned items."
                      type="success"
                      showIcon
                      className="mb-4"
                      style={{
                        backgroundColor: colors.success[50],
                        borderColor: colors.success[200],
                      }}
                    />

                    <Alert
                      message="International Returns"
                      description="International customers may be subject to additional customs fees for returns. Please contact us for guidance."
                      type="warning"
                      showIcon
                      style={{
                        backgroundColor: colors.warning[50],
                        borderColor: colors.warning[200],
                      }}
                    />
                  </div>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} lg={12}>
              <motion.div variants={fadeInUp} custom={4}>
                <Card
                  className="h-full rounded-2xl border-0 shadow-lg"
                  style={{ backgroundColor: colors.background.primary }}
                >
                  <div className="p-8">
                    <Title level={3} className="mb-6" style={{ color: colors.text.primary }}>
                      Need Help with Returns?
                    </Title>

                    <Paragraph style={{ color: colors.text.secondary }}>
                      Our customer service team is here to help you with any return questions or issues.
                    </Paragraph>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: colors.background.secondary }}>
                        <div className="flex items-center space-x-3 mb-2">
                          <MailOutlined style={{ color: colors.primary[500] }} />
                          <Text strong style={{ color: colors.text.primary }}>
                            Email Support
                          </Text>
                        </div>
                        <Text style={{ color: colors.text.secondary }}>returns@homindi.com</Text>
                        <div style={{ color: colors.text.secondary, fontSize: "12px" }}>Response within 24 hours</div>
                      </div>

                      <div className="p-4 rounded-lg" style={{ backgroundColor: colors.background.secondary }}>
                        <div className="flex items-center space-x-3 mb-2">
                          <PhoneOutlined style={{ color: colors.primary[500] }} />
                          <Text strong style={{ color: colors.text.primary }}>
                            Phone Support
                          </Text>
                        </div>
                        <Text style={{ color: colors.text.secondary }}>+1 (555) 123-4567</Text>
                        <div style={{ color: colors.text.secondary, fontSize: "12px" }}>Mon-Fri 9AM-6PM EST</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link href="/contact">
                        <Button
                          type="primary"
                          block
                          size="large"
                          className="rounded-xl"
                          style={{
                            background: gradients.primary,
                            borderColor: colors.primary[500],
                          }}
                        >
                          Contact Support
                        </Button>
                      </Link>
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
