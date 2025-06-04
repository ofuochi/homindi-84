"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button, Card, Typography, Row, Col, Statistic, Avatar } from "antd";
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
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { colors } from "@/lib/colors";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4);

  const testimonials = [
    {
      name: "Adunni Okafor",
      location: "Toronto, Canada 🇨🇦",
      text: "Finally found authentic Nigerian ingredients! The palm oil tastes just like home.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emeka Johnson",
      location: "London, UK 🇬🇧",
      text: "Fast delivery and excellent quality. My jollof rice has never tasted better!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Fatima Adebayo",
      location: "Houston, USA 🇺🇸",
      text: "Homindi connects me to my roots. Highly recommend to all Nigerians abroad!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  const stats = [
    { title: "Happy Customers", value: 10000, suffix: "+" },
    { title: "Products Available", value: 5000, suffix: "+" },
    { title: "Countries Served", value: 25, suffix: "+" },
    { title: "Years of Experience", value: 8, suffix: "" },
  ];

  const features = [
    {
      icon: <SafetyOutlined className="text-3xl text-primary-500" />,
      title: "Quality Guaranteed",
      description:
        "All products are sourced directly from trusted suppliers and undergo rigorous quality checks.",
    },
    {
      icon: <GlobalOutlined className="text-3xl text-primary-500" />,
      title: "Worldwide Shipping",
      description:
        "We deliver authentic African ingredients to over 25 countries worldwide.",
    },
    {
      icon: <HeartOutlined className="text-3xl text-primary-500" />,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We're here to help you connect with your roots.",
    },
    {
      icon: <RocketOutlined className="text-3xl text-primary-500" />,
      title: "Fast Delivery",
      description:
        "Quick and reliable shipping with real-time tracking for all your orders.",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-500 to-primary-600 text-white african-pattern overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <motion.h1
                className="text-white mb-6 text-4xl lg:text-6xl font-bold leading-tight"
                variants={fadeInUp}
              >
                Bringing Nigerian Food to Your{" "}
                <span className="text-[#F9A826]">Doorstep</span>
              </motion.h1>
              <motion.div variants={fadeInUp} custom={1}>
                <Paragraph className="text-xl text-green-100 mb-8 leading-relaxed">
                  Authentic Nigerian ingredients delivered worldwide. Connect
                  with your roots through the flavors of home. Experience the
                  taste of tradition, no matter where you are.
                </Paragraph>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                custom={2}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/products">
                  <Button
                    size="large"
                    className="btn-secondary h-14 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingOutlined className="mr-2" />
                    Shop Now
                  </Button>
                </Link>
                <Button
                  size="large"
                  ghost
                  className="h-14 px-8 text-lg font-semibold rounded-xl border-2 hover:bg-white hover:text-primary-500 transition-all duration-300"
                >
                  <PlayCircleOutlined className="mr-2" />
                  Watch Story
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative h-96 lg:h-[600px]"
              variants={fadeInUp}
              custom={3}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl z-10"></div>
              <Image
                src="/placeholder-mc4hi.png"
                alt="Nigerian food products"
                fill
                className="object-cover rounded-2xl shadow-2xl"
                priority
              />
              {/* Floating elements */}
              <motion.div
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Text className="text-primary-500 font-bold">
                  ✨ Fresh & Authentic
                </Text>
              </motion.div>
              <motion.div
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 1.5,
                }}
              >
                <Text className="text-primary-500 font-bold">
                  🚚 Fast Delivery
                </Text>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Row gutter={[32, 32]} className="text-center">
              {stats.map((stat, index) => (
                <Col xs={12} sm={6} key={index}>
                  <motion.div variants={fadeInUp} custom={index}>
                    <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 h-full">
                      <Statistic
                        title={
                          <span className="font-inter text-gray-600 text-base">
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
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Why Choose Us Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary-200 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-4 text-4xl font-bold">
                Trusted by <span className="text-primary-500">10,000+</span>{" "}
                Customers Worldwide
              </Title>
              <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join the growing community of Africans in the diaspora who trust
                Homindi for authentic ingredients and exceptional service.
              </Paragraph>
            </motion.div>
          </motion.div>

          <Row gutter={[32, 32]} className="items-center">
            <Col xs={24} lg={12}>
              <motion.div variants={fadeInUp} className="space-y-8">
                {[
                  {
                    icon: "🌍",
                    title: "Global Reach",
                    description:
                      "Serving 25+ countries with reliable international shipping and local partnerships.",
                    stat: "25+ Countries",
                  },
                  {
                    icon: "⚡",
                    title: "Lightning Fast",
                    description:
                      "Average delivery time of 3-5 business days with real-time tracking.",
                    stat: "3-5 Days",
                  },
                  {
                    icon: "🛡️",
                    title: "Quality Assured",
                    description:
                      "100% authentic products with money-back guarantee and quality certification.",
                    stat: "100% Authentic",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                    className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-4xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Title level={4} className="mb-0">
                          {item.title}
                        </Title>
                        <span className="text-primary-500 font-bold text-lg">
                          {item.stat}
                        </span>
                      </div>
                      <Paragraph className="text-gray-600 mb-0">
                        {item.description}
                      </Paragraph>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Col>

            <Col xs={24} lg={12}>
              <motion.div variants={fadeInUp} custom={3} className="relative">
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 bg-primary-500 rounded-full mx-auto flex items-center justify-center mb-4">
                      <span className="text-white text-3xl font-bold">H</span>
                    </div>
                    <Title level={3} className="mb-2">
                      Ready to Get Started?
                    </Title>
                    <Paragraph className="text-gray-600">
                      Join thousands of satisfied customers and taste home
                      today.
                    </Paragraph>
                  </div>

                  <div className="space-y-4">
                    <Link href="/products">
                      <Button
                        size="large"
                        className="w-full btn-secondary h-14 text-lg font-semibold rounded-xl mb-4"
                      >
                        Browse Products
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button
                        size="large"
                        className="w-full h-14 text-lg font-semibold rounded-xl border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300"
                      >
                        Create Free Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-4 text-4xl font-bold">
                How It Works
              </Title>
              <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Getting authentic Nigerian food delivered to your door is simple
                with Homindi. Follow these three easy steps to taste home.
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
                color: colors.accent[500],
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
                  <Card className="text-center h-full card-shadow border-0 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                    <div className="mb-6">
                      <div
                        className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${step.color}15` }}
                      >
                        <step.icon
                          className="text-4xl"
                          style={{ color: step.color }}
                        />
                      </div>
                    </div>
                    <Title level={4} className="mb-4 text-xl">
                      {step.title}
                    </Title>
                    <Paragraph className="text-gray-600 leading-relaxed">
                      {step.description}
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-4 text-4xl font-bold">
                Featured Products
              </Title>
              <Paragraph className="text-xl text-gray-600 leading-relaxed">
                Discover our most popular Nigerian ingredients, loved by
                customers worldwide
              </Paragraph>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer}>
            <Row gutter={[24, 24]}>
              {featuredProducts.map((product, index) => (
                <Col key={product.id} xs={24} sm={12} lg={6}>
                  <motion.div
                    variants={fadeInUp}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            custom={4}
            className="text-center mt-12"
          >
            <Link href="/products">
              <Button
                type="primary"
                size="large"
                className="h-14 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                See All Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-4 text-4xl font-bold">
                Why Choose Homindi?
              </Title>
              <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We're more than just a marketplace. We're your connection to
                authentic African culture and cuisine, delivered with care and
                passion.
              </Paragraph>
            </motion.div>
          </motion.div>

          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  variants={fadeInUp}
                  custom={index}
                  className="h-full"
                >
                  <Card className="h-full border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 text-center p-6">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-green-50 rounded-full mx-auto flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                    </div>
                    <Title level={4} className="mb-3 text-lg">
                      {feature.title}
                    </Title>
                    <Paragraph className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-4 text-4xl font-bold">
                What Our Customers Say
              </Title>
              <Paragraph className="text-xl text-gray-600 leading-relaxed">
                Join thousands of satisfied customers who trust Homindi for
                authentic Nigerian ingredients
              </Paragraph>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer}>
            <Row gutter={[24, 24]}>
              {testimonials.map((testimonial, index) => (
                <Col key={index} xs={24} md={8}>
                  <motion.div variants={fadeInUp} custom={index}>
                    <Card className="h-full card-shadow border-0 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                      <div className="text-center">
                        <Avatar
                          size={64}
                          src={testimonial.avatar}
                          className="mb-4"
                        />
                        <div className="mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <StarFilled
                              key={i}
                              className="text-[#F9A826] text-xl mr-1"
                            />
                          ))}
                        </div>
                        <Paragraph className="text-gray-600 mb-6 italic text-lg leading-relaxed">
                          "{testimonial.text}"
                        </Paragraph>
                        <Title level={5} className="mb-1 text-lg">
                          {testimonial.name}
                        </Title>
                        <Text type="secondary" className="text-base">
                          {testimonial.location}
                        </Text>
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-white mb-6 text-4xl font-bold">
                Stay Connected to Your Roots
              </h2>
              <Paragraph className="text-xl text-green-100 mb-8 leading-relaxed">
                Subscribe to our newsletter for exclusive offers, new product
                launches, and authentic Nigerian recipes delivered to your
                inbox.
              </Paragraph>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              custom={1}
              className="max-w-md mx-auto mb-8"
            >
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl border-0 text-gray-900 font-inter"
                />
                <Button
                  size="large"
                  className="!bg-[#F9A826] !border-[#F9A826] hover:!bg-[#e09620] hover:!text-white h-12 px-6 rounded-xl font-semibold text-white"
                >
                  Subscribe
                </Button>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              custom={2}
              className="text-green-100 text-sm"
            >
              Join 10,000+ subscribers • Unsubscribe anytime • No spam, ever
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="mb-6 text-4xl font-bold">
                Ready to Taste Home?
              </Title>
              <Paragraph className="text-xl text-gray-600 mb-8 leading-relaxed">
                Start your culinary journey with authentic Nigerian ingredients
                delivered worldwide. Experience the flavors that connect you to
                your heritage.
              </Paragraph>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              custom={1}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/products">
                <Button
                  size="large"
                  className="btn-secondary h-14 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Shopping
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  size="large"
                  className="h-14 px-8 text-lg font-semibold rounded-xl border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300"
                >
                  Create Account
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
