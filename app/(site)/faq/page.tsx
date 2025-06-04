"use client"

import { useState } from "react"
import { Collapse, Input, Typography, Row, Col, Card, Button, Space, Tag } from "antd"
import {
  SearchOutlined,
  QuestionCircleOutlined,
  ShoppingOutlined,
  TruckOutlined,
  CreditCardOutlined,
  SafetyOutlined,
  CustomerServiceOutlined,
  GlobalOutlined,
} from "@ant-design/icons"
import { motion } from "framer-motion"
import Link from "next/link"

const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse
const { Search } = Input

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { key: "all", label: "All Questions", icon: QuestionCircleOutlined },
    { key: "ordering", label: "Ordering", icon: ShoppingOutlined },
    { key: "shipping", label: "Shipping", icon: TruckOutlined },
    { key: "payment", label: "Payment", icon: CreditCardOutlined },
    { key: "products", label: "Products", icon: SafetyOutlined },
    { key: "account", label: "Account", icon: CustomerServiceOutlined },
    { key: "international", label: "International", icon: GlobalOutlined },
  ]

  const faqs = [
    {
      id: 1,
      category: "ordering",
      question: "How do I place an order on Homindi?",
      answer:
        "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase. Follow the step-by-step checkout process to enter your shipping and payment information.",
    },
    {
      id: 2,
      category: "ordering",
      question: "Can I modify or cancel my order after placing it?",
      answer:
        "You can modify or cancel your order within 2 hours of placing it, provided it hasn't been processed for shipping. Contact our customer service team immediately at support@homindi.com or through your account dashboard to make changes.",
    },
    {
      id: 3,
      category: "ordering",
      question: "What is the minimum order amount?",
      answer:
        "Our minimum order amount is $25 USD to ensure cost-effective shipping. Some specialty items may have their own minimum quantity requirements, which will be clearly displayed on the product page.",
    },
    {
      id: 4,
      category: "shipping",
      question: "Which countries do you ship to?",
      answer:
        "We ship to over 25 countries worldwide, including the United States, Canada, United Kingdom, Germany, France, Australia, and many more. You can check if we deliver to your location during checkout or contact our support team for specific country availability.",
    },
    {
      id: 5,
      category: "shipping",
      question: "How long does shipping take?",
      answer:
        "Shipping times vary by destination: Standard shipping takes 5-7 business days within the US, 7-10 business days to Canada and Europe, and 10-14 business days to other international destinations. Express shipping options are available for faster delivery.",
    },
    {
      id: 6,
      category: "shipping",
      question: "How much does shipping cost?",
      answer:
        "Shipping costs are calculated based on weight, dimensions, and destination. Standard shipping starts at $8.99 for domestic orders and $15.99 for international orders. Free shipping is available on orders over $75 within the US and $150 internationally.",
    },
    {
      id: 7,
      category: "shipping",
      question: "Can I track my order?",
      answer:
        "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order status in real-time through your account dashboard. We provide updates at every step of the delivery process.",
    },
    {
      id: 8,
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through encrypted payment gateways.",
    },
    {
      id: 9,
      category: "payment",
      question: "Is my payment information secure?",
      answer:
        "We use industry-standard SSL encryption and PCI DSS compliant payment processors to ensure your payment information is completely secure. We never store your credit card details on our servers.",
    },
    {
      id: 10,
      category: "payment",
      question: "Can I pay in my local currency?",
      answer:
        "We accept payments in USD, EUR, GBP, CAD, and AUD. Prices will be automatically converted to your local currency during checkout, and your bank may apply additional conversion fees.",
    },
    {
      id: 11,
      category: "products",
      question: "Are your products authentic and fresh?",
      answer:
        "Yes! We source all our products directly from trusted suppliers in Nigeria and other African countries. We maintain strict quality control standards and ensure all perishable items are fresh with adequate shelf life before shipping.",
    },
    {
      id: 12,
      category: "products",
      question: "Do you have organic or specialty diet options?",
      answer:
        "We offer a wide range of organic, gluten-free, and vegan African food products. Use our advanced filters on the products page to find items that meet your dietary requirements. All products are clearly labeled with ingredients and certifications.",
    },
    {
      id: 13,
      category: "products",
      question: "What if a product is out of stock?",
      answer:
        "If a product is temporarily out of stock, you can sign up for restock notifications on the product page. We'll email you as soon as it's available again. We typically restock popular items within 2-3 weeks.",
    },
    {
      id: 14,
      category: "products",
      question: "Can you recommend products for specific recipes?",
      answer:
        "Our customer service team includes African cuisine experts who can recommend the right ingredients for any traditional recipe. Contact us with your recipe, and we'll help you find everything you need.",
    },
    {
      id: 15,
      category: "account",
      question: "How do I create an account?",
      answer:
        "Click 'Sign Up' in the top right corner of our website. You can create an account using your email address or sign up instantly with Google or Facebook. Account creation is free and gives you access to order tracking, wishlist, and exclusive offers.",
    },
    {
      id: 16,
      category: "account",
      question: "I forgot my password. How do I reset it?",
      answer:
        "Click 'Sign In' and then 'Forgot Password' on the login page. Enter your email address, and we'll send you a secure link to reset your password. The link expires after 24 hours for security.",
    },
    {
      id: 17,
      category: "account",
      question: "Can I save my favorite products?",
      answer:
        "Yes! Use the wishlist feature to save products you love. Click the heart icon on any product to add it to your wishlist. You can access your saved items anytime from your account dashboard.",
    },
    {
      id: 18,
      category: "international",
      question: "Do you handle customs and import duties?",
      answer:
        "We handle all export documentation, but import duties and taxes in your country are the customer's responsibility. We provide detailed customs declarations to help minimize delays. Some countries may require additional documentation.",
    },
    {
      id: 19,
      category: "international",
      question: "What happens if my package is delayed at customs?",
      answer:
        "Customs delays are beyond our control, but we provide full tracking and will assist with any required documentation. If your package is significantly delayed, contact our support team for assistance with customs authorities.",
    },
    {
      id: 20,
      category: "international",
      question: "Can I ship to a different address than my billing address?",
      answer:
        "Yes! You can ship to any address worldwide (where we deliver). During checkout, simply enter a different shipping address. This is perfect for sending gifts to family and friends abroad.",
    },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    const matchesSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B8457] to-[#0a7249] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
            <Title level={1} className="!text-white !mb-6 font-roboto">
              Frequently Asked Questions
            </Title>
            <Paragraph className="text-xl text-green-100 max-w-3xl mx-auto font-roboto leading-relaxed">
              Find answers to common questions about ordering, shipping, payments, and more. Can't find what you're
              looking for? Our support team is here to help!
            </Paragraph>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Categories */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={1} className="mb-12">
          <div className="text-center mb-8">
            <Search
              placeholder="Search frequently asked questions..."
              allowClear
              size="large"
              prefix={<SearchOutlined />}
              className="max-w-2xl mx-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.key}
                  variants={fadeInUp}
                  custom={index + 2}
                  initial="hidden"
                  animate="visible"
                >
                  <Button
                    type={activeCategory === category.key ? "primary" : "default"}
                    icon={<Icon />}
                    onClick={() => setActiveCategory(category.key)}
                    className={`rounded-full font-roboto font-medium ${
                      activeCategory === category.key
                        ? "bg-[#0B8457] border-[#0B8457]"
                        : "hover:border-[#0B8457] hover:text-[#0B8457]"
                    }`}
                  >
                    {category.label}
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <Row gutter={[32, 32]}>
          {/* FAQ List */}
          <Col xs={24} lg={16}>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={3}>
              <div className="mb-6 flex items-center justify-between">
                <Title level={3} className="!mb-0 font-roboto">
                  {activeCategory === "all" ? "All Questions" : categories.find((c) => c.key === activeCategory)?.label}
                </Title>
                <Tag color="blue" className="font-roboto">
                  {filteredFAQs.length} questions
                </Tag>
              </div>

              {filteredFAQs.length === 0 ? (
                <Card className="text-center py-12">
                  <QuestionCircleOutlined className="text-4xl text-gray-400 mb-4" />
                  <Title level={4} className="text-gray-500">
                    No questions found
                  </Title>
                  <Paragraph className="text-gray-400">
                    Try adjusting your search terms or browse different categories.
                  </Paragraph>
                </Card>
              ) : (
                <Collapse
                  ghost
                  expandIconPosition="end"
                  className="bg-white rounded-xl shadow-sm border border-gray-100"
                >
                  {filteredFAQs.map((faq, index) => (
                    <Panel
                      key={faq.id}
                      header={<div className="font-roboto font-medium text-gray-900 pr-4">{faq.question}</div>}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-roboto text-gray-700 leading-relaxed pl-4">{faq.answer}</div>
                    </Panel>
                  ))}
                </Collapse>
              )}
            </motion.div>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={4} className="space-y-6">
              {/* Quick Help */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <div className="text-center p-4">
                  <CustomerServiceOutlined className="text-4xl text-[#0B8457] mb-4" />
                  <Title level={4} className="!mb-3 font-roboto">
                    Need More Help?
                  </Title>
                  <Paragraph className="text-gray-600 mb-6 font-roboto">
                    Can't find the answer you're looking for? Our friendly support team is ready to help!
                  </Paragraph>
                  <Space direction="vertical" className="w-full">
                    <Link href="/contact">
                      <Button type="primary" block size="large" className="bg-[#0B8457] font-roboto">
                        Contact Support
                      </Button>
                    </Link>
                    <Button block size="large" className="font-roboto">
                      Live Chat
                    </Button>
                  </Space>
                </div>
              </Card>

              {/* Popular Topics */}
              <Card title="Popular Topics" className="border-0 shadow-lg rounded-2xl">
                <div className="space-y-3">
                  {[
                    { label: "Order Tracking", href: "/dashboard/orders" },
                    { label: "Shipping Information", href: "/shipping" },
                    { label: "Return Policy", href: "/returns" },
                    { label: "Product Authenticity", href: "/about" },
                    { label: "Account Settings", href: "/dashboard/settings" },
                  ].map((topic, index) => (
                    <Link key={index} href={topic.href}>
                      <Button
                        type="text"
                        block
                        className="text-left justify-start font-roboto hover:bg-gray-50 hover:text-[#0B8457]"
                      >
                        {topic.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </Card>

              {/* Contact Info */}
              <Card className="bg-gradient-to-br from-[#0B8457] to-[#0a7249] text-white border-0 rounded-2xl">
                <div className="p-4">
                  <Title level={4} className="!text-white !mb-4 font-roboto">
                    Contact Information
                  </Title>
                  <div className="space-y-3 font-roboto">
                    <div>
                      <Text className="text-green-100 block">Email Support</Text>
                      <Text className="text-white font-medium">support@homindi.com</Text>
                    </div>
                    <div>
                      <Text className="text-green-100 block">Phone Support</Text>
                      <Text className="text-white font-medium">+1 (555) 123-4567</Text>
                    </div>
                    <div>
                      <Text className="text-green-100 block">Business Hours</Text>
                      <Text className="text-white font-medium">Mon-Fri: 8AM-6PM EST</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Still Have Questions CTA */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={5} className="mt-16 text-center">
          <Card className="bg-gray-50 border-0 rounded-2xl">
            <div className="py-12 px-8">
              <Title level={2} className="!mb-4 font-roboto">
                Still Have Questions?
              </Title>
              <Paragraph className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-roboto">
                Our customer support team is available to help you with any questions about our products, orders, or
                services.
              </Paragraph>
              <Space size="large" wrap>
                <Link href="/contact">
                  <Button type="primary" size="large" className="bg-[#0B8457] px-8 font-roboto">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="large" className="px-8 font-roboto">
                    Browse Products
                  </Button>
                </Link>
              </Space>
            </div>
          </Card>
        </motion.div>
      </div>

    </div>
  )
}
