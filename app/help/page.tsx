"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Typography, Card, Row, Col, Input, Button, Collapse, Tag } from "antd"
import {
  SearchOutlined,
  QuestionCircleOutlined,
  ShoppingOutlined,
  TruckOutlined,
  SafetyOutlined,
  UserOutlined,
  CreditCardOutlined,
  GlobalOutlined,
} from "@ant-design/icons"
import { motion } from "framer-motion"
import { colors, gradients } from "@/lib/theme"
import Link from "next/link"
import { useState } from "react"

const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse

export default function HelpPage() {
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
      icon: <ShoppingOutlined className="text-2xl" style={{ color: colors.primary[500] }} />,
      title: "Orders & Shopping",
      description: "Help with placing orders, product information, and shopping",
      link: "/faq#ordering",
      count: 12,
    },
    {
      icon: <TruckOutlined className="text-2xl" style={{ color: colors.info[500] }} />,
      title: "Shipping & Delivery",
      description: "Information about shipping rates, delivery times, and tracking",
      link: "/shipping",
      count: 8,
    },
    {
      icon: <SafetyOutlined className="text-2xl" style={{ color: colors.success[500] }} />,
      title: "Returns & Refunds",
      description: "Return policy, refund process, and exchange information",
      link: "/returns",
      count: 6,
    },
    {
      icon: <UserOutlined className="text-2xl" style={{ color: colors.secondary[500] }} />,
      title: "Account & Profile",
      description: "Managing your account, profile settings, and preferences",
      link: "/faq#account",
      count: 10,
    },
    {
      icon: <CreditCardOutlined className="text-2xl" style={{ color: colors.warning[500] }} />,
      title: "Payment & Billing",
      description: "Payment methods, billing issues, and transaction help",
      link: "/faq#payment",
      count: 7,
    },
    {
      icon: <GlobalOutlined className="text-2xl" style={{ color: colors.error[500] }} />,
      title: "International Orders",
      description: "Customs, duties, and international shipping information",
      link: "/faq#international",
      count: 9,
    },
  ]

  const quickHelp = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and viewing your order history, or by using the tracking number sent to your email.",
      category: "shipping",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay for secure checkout.",
      category: "payment",
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by location. Standard shipping takes 3-15 business days depending on your country.",
      category: "shipping",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "You can cancel your order within 2 hours of placing it. After that, please contact customer service for assistance.",
      category: "orders",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 35 countries worldwide. Shipping costs and delivery times vary by destination.",
      category: "international",
    },
  ]

  const filteredHelp = quickHelp.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background.secondary }}>
      <Header />

      {/* Hero Section */}
      <section className="py-16" style={{ background: gradients.primary }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                How Can We Help You?
              </Title>
              <Paragraph className="text-xl text-green-100 mb-8 leading-relaxed">
                Find answers to common questions or get in touch with our support team.
              </Paragraph>

              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <Input
                  size="large"
                  placeholder="Search for help..."
                  prefix={<SearchOutlined style={{ color: colors.text.secondary }} />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-xl"
                  style={{
                    backgroundColor: colors.background.primary,
                    border: "none",
                  }}
                />
              </div>
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
          {/* Help Categories */}
          <motion.div variants={fadeInUp} className="mb-12">
            <Title level={2} className="mb-8 text-center" style={{ color: colors.text.primary }}>
              Browse Help Topics
            </Title>
            <Row gutter={[24, 24]}>
              {helpCategories.map((category, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Link href={category.link}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Card
                        className="h-full border-0 rounded-2xl shadow-lg cursor-pointer transition-all duration-300"
                        style={{ backgroundColor: colors.background.primary }}
                        hoverable
                      >
                        <div className="p-6">
                          <div className="flex items-start space-x-4">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${colors.primary[500]}10` }}
                            >
                              {category.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <Title level={5} style={{ color: colors.text.primary }}>
                                  {category.title}
                                </Title>
                                <Tag
                                  style={{
                                    backgroundColor: colors.primary[100],
                                    color: colors.primary[700],
                                    border: "none",
                                  }}
                                >
                                  {category.count} articles
                                </Tag>
                              </div>
                              <Paragraph style={{ color: colors.text.secondary }} className="mb-0">
                                {category.description}
                              </Paragraph>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </Link>
                </Col>
              ))}
            </Row>
          </motion.div>

          {/* Quick Help / Search Results */}
          <motion.div variants={fadeInUp} custom={1} className="mb-12">
            <Card className="rounded-2xl border-0 shadow-lg" style={{ backgroundColor: colors.background.primary }}>
              <div className="p-8">
                <Title level={3} className="mb-6" style={{ color: colors.text.primary }}>
                  {searchTerm ? `Search Results (${filteredHelp.length})` : "Quick Help"}
                </Title>

                {filteredHelp.length > 0 ? (
                  <Collapse ghost expandIconPosition="end" className="help-collapse">
                    {filteredHelp.map((item, index) => (
                      <Panel
                        header={
                          <div className="flex items-center space-x-3">
                            <QuestionCircleOutlined style={{ color: colors.primary[500] }} />
                            <Text strong style={{ color: colors.text.primary }}>
                              {item.question}
                            </Text>
                          </div>
                        }
                        key={index}
                      >
                        <div className="pl-8">
                          <Paragraph style={{ color: colors.text.secondary }}>{item.answer}</Paragraph>
                          <Tag
                            style={{
                              backgroundColor: colors.background.secondary,
                              color: colors.text.secondary,
                              border: "none",
                              textTransform: "capitalize",
                            }}
                          >
                            {item.category}
                          </Tag>
                        </div>
                      </Panel>
                    ))}
                  </Collapse>
                ) : searchTerm ? (
                  <div className="text-center py-8">
                    <QuestionCircleOutlined className="text-4xl mb-4" style={{ color: colors.text.tertiary }} />
                    <Title level={4} style={{ color: colors.text.secondary }}>
                      No results found for "{searchTerm}"
                    </Title>
                    <Paragraph style={{ color: colors.text.secondary }}>
                      Try searching with different keywords or browse our help categories above.
                    </Paragraph>
                  </div>
                ) : null}
              </div>
            </Card>
          </motion.div>

          {/* Contact Support */}
          <motion.div variants={fadeInUp} custom={2}>
            <Row gutter={[32, 32]}>
              <Col xs={24} lg={12}>
                <Card
                  className="h-full rounded-2xl border-0 shadow-lg text-center"
                  style={{ backgroundColor: colors.background.primary }}
                >
                  <div className="p-8">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: colors.primary[100] }}
                    >
                      <QuestionCircleOutlined className="text-2xl" style={{ color: colors.primary[500] }} />
                    </div>
                    <Title level={4} className="mb-4" style={{ color: colors.text.primary }}>
                      Still Need Help?
                    </Title>
                    <Paragraph style={{ color: colors.text.secondary }} className="mb-6">
                      Can't find what you're looking for? Our support team is here to help you with any questions.
                    </Paragraph>
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
                        Contact Support
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card
                  className="h-full rounded-2xl border-0 shadow-lg text-center"
                  style={{ backgroundColor: colors.background.primary }}
                >
                  <div className="p-8">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: colors.secondary[100] }}
                    >
                      <SearchOutlined className="text-2xl" style={{ color: colors.secondary[500] }} />
                    </div>
                    <Title level={4} className="mb-4" style={{ color: colors.text.primary }}>
                      Browse All FAQs
                    </Title>
                    <Paragraph style={{ color: colors.text.secondary }} className="mb-6">
                      Explore our comprehensive FAQ section with detailed answers to common questions.
                    </Paragraph>
                    <Link href="/faq">
                      <Button
                        size="large"
                        className="rounded-xl"
                        style={{
                          borderColor: colors.secondary[500],
                          color: colors.secondary[500],
                        }}
                      >
                        View All FAQs
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Col>
            </Row>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
