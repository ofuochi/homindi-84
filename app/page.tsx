"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button, Card, Typography, Row, Col, Statistic, Avatar, Input, Badge } from "antd"
import {
  CheckCircleOutlined,
  TruckOutlined,
  ShoppingOutlined,
  StarFilled,
  SafetyOutlined,
  GlobalOutlined,
  HeartOutlined,
  RocketOutlined,
  PlayCircleOutlined,
  SendOutlined,
  MailOutlined,
  ClockCircleOutlined,
  ShieldCheckOutlined,
  CrownOutlined,
  GiftOutlined,
  ThunderboltOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import Image from "next/image"
import ProductCard from "@/components/product/ProductCard"
import { mockProducts } from "@/lib/mockData"
import { motion } from "framer-motion"
import { colors, gradients } from "@/lib/theme"

const { Title, Paragraph, Text } = Typography

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 6)
  const bestSellers = mockProducts.slice(6, 10)

  const testimonials = [
    {
      name: "Adunni Okafor",
      location: "Toronto, Canada 🇨🇦",
      text: "Finally found authentic Nigerian ingredients! The palm oil tastes just like home. Delivery was super fast and everything was fresh.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      name: "Emeka Johnson",
      location: "London, UK 🇬🇧",
      text: "Fast delivery and excellent quality. My jollof rice has never tasted better! Customer service is outstanding.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      name: "Fatima Adebayo",
      location: "Houston, USA 🇺🇸",
      text: "Homindi connects me to my roots. Highly recommend to all Nigerians abroad! The packaging is also eco-friendly.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      name: "Kemi Adeleke",
      location: "Sydney, Australia 🇦🇺",
      text: "Amazing selection of products and the freshness is unmatched. It's like having a piece of Nigeria delivered to my door.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
  ]

  const stats = [
    { title: "Happy Customers", value: 15000, suffix: "+", icon: TeamOutlined },
    { title: "Products Available", value: 8000, suffix: "+", icon: ShoppingOutlined },
    { title: "Countries Served", value: 35, suffix: "+", icon: GlobalOutlined },
    { title: "Years of Experience", value: 10, suffix: "", icon: CrownOutlined },
  ]

  const features = [
    {
      icon: <SafetyOutlined className="text-4xl" style={{ color: colors.primary[500] }} />,
      title: "Quality Guaranteed",
      description:
        "All products are sourced directly from trusted suppliers and undergo rigorous quality checks before shipping.",
      highlight: "100% Authentic",
    },
    {
      icon: <GlobalOutlined className="text-4xl" style={{ color: colors.primary[500] }} />,
      title: "Worldwide Shipping",
      description:
        "We deliver authentic African ingredients to over 35 countries worldwide with express shipping options.",
      highlight: "35+ Countries",
    },
    {
      icon: <HeartOutlined className="text-4xl" style={{ color: colors.primary[500] }} />,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We're here to help you connect with your roots through authentic flavors.",
      highlight: "24/7 Support",
    },
    {
      icon: <RocketOutlined className="text-4xl" style={{ color: colors.primary[500] }} />,
      title: "Fast Delivery",
      description:
        "Quick and reliable shipping with real-time tracking for all your orders. Most orders ship within 24 hours.",
      highlight: "Express Delivery",
    },
  ]

  const benefits = [
    {
      icon: <ShieldCheckOutlined className="text-2xl" style={{ color: colors.success[500] }} />,
      title: "Secure Shopping",
      description: "SSL encrypted checkout and secure payment processing",
    },
    {
      icon: <GiftOutlined className="text-2xl" style={{ color: colors.secondary[500] }} />,
      title: "Loyalty Rewards",
      description: "Earn points with every purchase and get exclusive discounts",
    },
    {
      icon: <ThunderboltOutlined className="text-2xl" style={{ color: colors.warning[500] }} />,
      title: "Flash Sales",
      description: "Weekly flash sales with up to 50% off on selected items",
    },
    {
      icon: <ClockCircleOutlined className="text-2xl" style={{ color: colors.info[500] }} />,
      title: "Same Day Processing",
      description: "Orders placed before 2 PM are processed the same day",
    },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden" style={{ background: gradients.primary }}>
        <div className="absolute inset-0 african-pattern opacity-10"></div>

        {/* Floating background elements */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: colors.white }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: colors.white }}
        ></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <motion.div className="mb-6">
                <Badge.Ribbon text="🔥 Trending Now" color={colors.secondary[500]}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <motion.h1
                      className="text-white mb-6 text-4xl lg:text-6xl font-bold leading-tight"
                      variants={fadeInUp}
                    >
                      Bringing Nigerian Food to Your <span style={{ color: colors.secondary[500] }}>Doorstep</span>
                    </motion.h1>
                  </div>
                </Badge.Ribbon>
              </motion.div>

              <motion.div variants={fadeInUp} custom={1}>
                <Paragraph className="text-xl text-green-100 mb-8 leading-relaxed">
                  Authentic Nigerian ingredients delivered worldwide. Connect with your roots through the flavors of
                  home. Experience the taste of tradition, no matter where you are.
                </Paragraph>
              </motion.div>

              {/* Quick stats */}
              <motion.div variants={fadeInUp} custom={2} className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Products", value: "8000+" },
                  { label: "Countries", value: "35+" },
                  { label: "Customers", value: "15K+" },
                ].map((stat, index) => (
                  <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-green-100">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} custom={3} className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <motion.div {...scaleOnHover}>
                    <Button
                      size="large"
                      style={{
                        background: gradients.secondary,
                        borderColor: colors.secondary[500],
                        color: colors.white,
                      }}
                      className="h-14 px-8 text-lg font-semibold rounded-xl shadow-lg"
                    >
                      <ShoppingOutlined className="mr-2" />
                      Shop Now
                    </Button>
                  </motion.div>
                </Link>
                <motion.div {...scaleOnHover}>
                  <Button
                    size="large"
                    ghost
                    className="h-14 px-8 text-lg font-semibold rounded-xl border-2 hover:bg-white hover:text-green-700 transition-all duration-300"
                  >
                    <PlayCircleOutlined className="mr-2" />
                    Watch Story
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div className="relative h-96 lg:h-[600px]" variants={fadeInUp} custom={4}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl z-10"></div>
              <Image
                src="/nigerian-food-display.png"
                alt="Nigerian food products"
                fill
                className="object-cover rounded-2xl shadow-2xl"
                priority
              />

              {/* Floating elements with enhanced animations */}
              <motion.div
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.success[500] }}></div>
                  <Text style={{ color: colors.primary[500] }} className="font-bold">
                    ✨ Fresh & Authentic
                  </Text>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.secondary[500] }}></div>
                  <Text style={{ color: colors.primary[500] }} className="font-bold">
                    🚚 Fast Delivery
                  </Text>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.error[500] }}></div>
                  <Text style={{ color: colors.primary[500] }} className="font-bold">
                    🔥 Best Sellers
                  </Text>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 relative" style={{ backgroundColor: colors.background.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <Row gutter={[32, 32]} className="text-center">
              {stats.map((stat, index) => (
                <Col xs={12} sm={6} key={index}>
                  <motion.div variants={fadeInUp} custom={index}>
                    <Card
                      className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 h-full"
                      style={{ borderColor: colors.border.light }}
                    >
                      <div className="text-center">
                        <div
                          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                          style={{ backgroundColor: `${colors.primary[500]}15` }}
                        >
                          <stat.icon className="text-2xl" style={{ color: colors.primary[500] }} />
                        </div>
                        <Statistic
                          title={
                            <span className="font-inter text-base" style={{ color: colors.text.secondary }}>
                              {stat.title}
                            </span>
                          }
                          value={stat.value}
                          suffix={stat.suffix}
                          valueStyle={{
                            color: colors.primary[500],
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            fontSize: "2rem",
                          }}
                        />
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16" style={{ backgroundColor: colors.background.secondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-4 text-3xl font-bold" style={{ color: colors.text.primary }}>
                Why Thousands Choose Homindi
              </Title>
            </motion.div>
          </motion.div>

          <Row gutter={[24, 24]}>
            {benefits.map((benefit, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div variants={fadeInUp} custom={index} className="h-full">
                  <Card
                    className="h-full border-0 shadow-md rounded-xl hover:shadow-lg transition-all duration-300 text-center p-4"
                    style={{ backgroundColor: colors.background.primary }}
                  >
                    <div className="mb-4">
                      <div
                        className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${colors.primary[500]}10` }}
                      >
                        {benefit.icon}
                      </div>
                    </div>
                    <Title level={5} className="mb-2" style={{ color: colors.text.primary }}>
                      {benefit.title}
                    </Title>
                    <Paragraph style={{ color: colors.text.secondary }} className="text-sm">
                      {benefit.description}
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: colors.background.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-4 text-4xl font-bold" style={{ color: colors.text.primary }}>
                How It Works
              </Title>
              <Paragraph className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.text.secondary }}>
                Getting authentic Nigerian food delivered to your door is simple with Homindi. Follow these three easy
                steps to taste home.
              </Paragraph>
            </motion.div>
          </motion.div>

          <Row gutter={[32, 32]} className="items-stretch">
            {[
              {
                icon: ShoppingOutlined,
                title: "1. Browse & Order",
                description:
                  "Browse our curated selection of authentic Nigerian products and add them to your cart. Filter by category, dietary preferences, or search for specific ingredients.",
                color: colors.primary[500],
              },
              {
                icon: CheckCircleOutlined,
                title: "2. We Process",
                description:
                  "We carefully package your order with fresh, quality ingredients sourced directly from Nigeria. Each item undergoes quality checks before shipping.",
                color: colors.secondary[500],
              },
              {
                icon: TruckOutlined,
                title: "3. Fast Delivery",
                description:
                  "Receive your authentic Nigerian ingredients at your doorstep, anywhere in the world. Track your order in real-time from our warehouse to your door.",
                color: colors.primary[500],
              },
            ].map((step, i) => (
              <Col xs={24} md={8} key={i}>
                <motion.div variants={fadeInUp} custom={i} className="h-full">
                  <motion.div {...scaleOnHover}>
                    <Card
                      className="text-center h-full border-0 rounded-2xl p-6 transition-all duration-300"
                      style={{
                        backgroundColor: colors.background.primary,
                        boxShadow: `0 4px 6px -1px ${colors.shadow.light}, 0 2px 4px -1px ${colors.shadow.light}`,
                      }}
                    >
                      <div className="mb-6">
                        <div
                          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4"
                          style={{ backgroundColor: `${step.color}15` }}
                        >
                          <step.icon className="text-4xl" style={{ color: step.color }} />
                        </div>
                      </div>
                      <Title level={4} className="mb-4 text-xl" style={{ color: colors.text.primary }}>
                        {step.title}
                      </Title>
                      <Paragraph style={{ color: colors.text.secondary }} className="leading-relaxed">
                        {step.description}
                      </Paragraph>
                    </Card>
                  </motion.div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: colors.background.secondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-4 text-4xl font-bold" style={{ color: colors.text.primary }}>
                Why Choose Homindi?
              </Title>
              <Paragraph className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.text.secondary }}>
                We're more than just a marketplace. We're your connection to authentic African culture and cuisine,
                delivered with care and passion.
              </Paragraph>
            </motion.div>
          </motion.div>

          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div variants={fadeInUp} custom={index} className="h-full">
                  <motion.div {...scaleOnHover}>
                    <Card
                      className="h-full border-0 rounded-2xl transition-all duration-300 text-center p-6"
                      style={{
                        backgroundColor: colors.background.primary,
                        boxShadow: `0 4px 6px -1px ${colors.shadow.light}, 0 2px 4px -1px ${colors.shadow.light}`,
                      }}
                    >
                      <div className="mb-6">
                        <div
                          className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
                          style={{ backgroundColor: `${colors.primary[500]}10` }}
                        >
                          {feature.icon}
                        </div>
                        <Badge
                          count={feature.highlight}
                          style={{
                            backgroundColor: colors.secondary[500],
                            color: colors.white,
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        />
                      </div>
                      <Title level={4} className="mb-3 text-lg" style={{ color: colors.text.primary }}>
                        {feature.title}
                      </Title>
                      <Paragraph style={{ color: colors.text.secondary }} className="leading-relaxed">
                        {feature.description}
                      </Paragraph>
                    </Card>
                  </motion.div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20" style={{ backgroundColor: colors.background.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-4 text-4xl font-bold" style={{ color: colors.text.primary }}>
                Featured Products
              </Title>
              <Paragraph className="text-xl leading-relaxed" style={{ color: colors.text.secondary }}>
                Discover our most popular Nigerian ingredients, loved by customers worldwide
              </Paragraph>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer}>
            <Row gutter={[24, 24]}>
              {featuredProducts.map((product, index) => (
                <Col key={product.id} xs={24} sm={12} lg={8} xl={6}>
                  <motion.div variants={fadeInUp} custom={index}>
                    <ProductCard product={product} />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>

          <motion.div variants={fadeInUp} custom={6} className="text-center mt-12">
            <Link href="/products">
              <motion.div {...scaleOnHover}>
                <Button
                  type="primary"
                  size="large"
                  className="h-14 px-8 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300"
                  style={{ background: gradients.primary, borderColor: colors.primary[500] }}
                >
                  View All Products
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20" style={{ backgroundColor: colors.background.secondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge.Ribbon text="🔥 Hot" color={colors.error[500]}>
                <Title level={2} className="mb-4 text-4xl font-bold" style={{ color: colors.text.primary }}>
                  Best Sellers This Week
                </Title>
              </Badge.Ribbon>
              <Paragraph className="text-xl leading-relaxed mt-4" style={{ color: colors.text.secondary }}>
                Don't miss out on these customer favorites flying off our shelves
              </Paragraph>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer}>
            <Row gutter={[24, 24]}>
              {bestSellers.map((product, index) => (
                <Col key={product.id} xs={24} sm={12} lg={6}>
                  <motion.div variants={fadeInUp} custom={index}>
                    <ProductCard product={product} />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20" style={{ backgroundColor: colors.background.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-4 text-4xl font-bold" style={{ color: colors.text.primary }}>
                What Our Customers Say
              </Title>
              <Paragraph className="text-xl leading-relaxed" style={{ color: colors.text.secondary }}>
                Join thousands of satisfied customers who trust Homindi for authentic Nigerian ingredients
              </Paragraph>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer}>
            <Row gutter={[24, 24]}>
              {testimonials.map((testimonial, index) => (
                <Col key={index} xs={24} md={12} lg={6}>
                  <motion.div variants={fadeInUp} custom={index}>
                    <motion.div {...scaleOnHover}>
                      <Card
                        className="h-full border-0 rounded-2xl p-6 transition-all duration-300"
                        style={{
                          backgroundColor: colors.background.primary,
                          boxShadow: `0 4px 6px -1px ${colors.shadow.light}, 0 2px 4px -1px ${colors.shadow.light}`,
                        }}
                      >
                        <div className="text-center">
                          <div className="relative mb-4">
                            <Avatar size={64} src={testimonial.avatar} />
                            {testimonial.verified && (
                              <div
                                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: colors.success[500] }}
                              >
                                <CheckCircleOutlined className="text-white text-xs" />
                              </div>
                            )}
                          </div>
                          <div className="mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <StarFilled key={i} className="text-xl mr-1" style={{ color: colors.secondary[500] }} />
                            ))}
                          </div>
                          <Paragraph
                            style={{ color: colors.text.secondary }}
                            className="mb-6 italic text-lg leading-relaxed"
                          >
                            "{testimonial.text}"
                          </Paragraph>
                          <Title level={5} className="mb-1 text-lg" style={{ color: colors.text.primary }}>
                            {testimonial.name}
                          </Title>
                          <Text style={{ color: colors.text.secondary }} className="text-base">
                            {testimonial.location}
                          </Text>
                        </div>
                      </Card>
                    </motion.div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20" style={{ background: gradients.primary }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Title level={2} className="text-white mb-6 text-4xl font-bold">
                Stay Connected to Your Roots
              </Title>
              <Paragraph className="text-xl text-green-100 mb-8 leading-relaxed">
                Subscribe to our newsletter for exclusive offers, new product launches, and authentic Nigerian recipes
                delivered to your inbox.
              </Paragraph>
            </motion.div>
            <motion.div variants={fadeInUp} custom={1} className="max-w-md mx-auto mb-8">
              <div className="flex gap-3">
                <Input
                  size="large"
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 rounded-xl border-0"
                  style={{ color: colors.text.primary }}
                  prefix={<MailOutlined style={{ color: colors.text.secondary }} />}
                />
                <Button
                  type="primary"
                  size="large"
                  icon={<SendOutlined />}
                  className="px-6 rounded-xl font-semibold"
                  style={{
                    background: gradients.secondary,
                    borderColor: colors.secondary[500],
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} custom={2} className="text-green-100 text-sm">
              Join 15,000+ subscribers • Unsubscribe anytime • No spam, ever
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: colors.background.secondary }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-6 text-4xl font-bold" style={{ color: colors.text.primary }}>
                Ready to Taste Home?
              </Title>
              <Paragraph className="text-xl mb-8 leading-relaxed" style={{ color: colors.text.secondary }}>
                Start your culinary journey with authentic Nigerian ingredients delivered worldwide. Experience the
                flavors that connect you to your heritage.
              </Paragraph>
            </motion.div>
            <motion.div variants={fadeInUp} custom={1} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <motion.div {...scaleOnHover}>
                  <Button
                    size="large"
                    className="h-14 px-8 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300"
                    style={{
                      background: gradients.secondary,
                      borderColor: colors.secondary[500],
                      color: colors.white,
                    }}
                  >
                    Start Shopping
                  </Button>
                </motion.div>
              </Link>
              <Link href="/sign-up">
                <motion.div {...scaleOnHover}>
                  <Button
                    size="large"
                    className="h-14 px-8 text-lg font-semibold rounded-xl border-2 transition-all duration-300"
                    style={{
                      borderColor: colors.primary[500],
                      color: colors.primary[500],
                    }}
                  >
                    Create Account
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
