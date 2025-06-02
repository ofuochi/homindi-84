"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button, Card, Typography, Row, Col } from "antd";
import {
  CheckCircleOutlined,
  TruckOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4);

  const testimonials = [
    {
      name: "Adunni Okafor",
      location: "Toronto, Canada 🇨🇦",
      text: "Finally found authentic Nigerian ingredients! The palm oil tastes just like home.",
      rating: 5,
    },
    {
      name: "Emeka Johnson",
      location: "London, UK 🇬🇧",
      text: "Fast delivery and excellent quality. My jollof rice has never tasted better!",
      rating: 5,
    },
    {
      name: "Fatima Adebayo",
      location: "Houston, USA 🇺🇸",
      text: "Homindi connects me to my roots. Highly recommend to all Nigerians abroad!",
      rating: 5,
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 },
    }),
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0B8457] to-[#0a7249] text-white african-pattern">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 className="text-white mb-6 text-4xl lg:text-5xl font-bold">
                Bringing Nigerian Food to Your Doorstep
              </motion.h1>
              <Paragraph className="text-xl text-green-100 mb-8">
                Authentic Nigerian ingredients delivered worldwide. Connect with
                your roots through the flavors of home.
              </Paragraph>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="large" className="btn-secondary">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="large" ghost>
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <motion.div
              className="relative h-96 lg:h-[500px]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Nigerian food products"
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Title level={2} className="mb-4">
              How It Works
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting authentic Nigerian food delivered to your door is simple
              with Homindi
            </Paragraph>
          </motion.div>

          <Row gutter={[32, 32]}>
            {[ShoppingOutlined, CheckCircleOutlined, TruckOutlined].map(
              (Icon, i) => (
                <Col xs={24} md={8} key={i}>
                  <motion.div
                    variants={fadeInUp}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card className="text-center h-full card-shadow">
                      <Icon
                        className={`text-4xl mb-4 ${
                          i === 1 ? "text-[#F9A826]" : "text-[#0B8457]"
                        }`}
                      />
                      <Title level={4}>
                        {
                          [
                            "1. Browse & Order",
                            "2. We Process",
                            "3. Fast Delivery",
                          ][i]
                        }
                      </Title>
                      <Paragraph>
                        {
                          [
                            "Browse our curated selection of authentic Nigerian products and add them to your cart.",
                            "We carefully package your order with fresh, quality ingredients sourced directly from Nigeria.",
                            "Receive your authentic Nigerian ingredients at your doorstep, anywhere in the world.",
                          ][i]
                        }
                      </Paragraph>
                    </Card>
                  </motion.div>
                </Col>
              )
            )}
          </Row>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Title level={2} className="mb-4">
              Featured Products
            </Title>
            <Paragraph className="text-lg text-gray-600">
              Discover our most popular Nigerian ingredients
            </Paragraph>
          </motion.div>

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

          <div className="text-center mt-12">
            <Link href="/products">
              <Button type="primary" size="large">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Title level={2} className="mb-4">
              What Our Customers Say
            </Title>
            <Paragraph className="text-lg text-gray-600">
              Join thousands of satisfied customers worldwide
            </Paragraph>
          </motion.div>

          <Row gutter={[24, 24]}>
            {testimonials.map((testimonial, index) => (
              <Col key={index} xs={24} md={8}>
                <motion.div
                  variants={fadeInUp}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="h-full card-shadow">
                    <div className="text-center">
                      <div className="mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-[#F9A826] text-xl">
                            ★
                          </span>
                        ))}
                      </div>
                      <Paragraph className="text-gray-600 mb-4 italic">
                        "{testimonial.text}"
                      </Paragraph>
                      <Title level={5} className="mb-1">
                        {testimonial.name}
                      </Title>
                      <Paragraph type="secondary">
                        {testimonial.location}
                      </Paragraph>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-16 bg-[#0B8457] text-white"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Title level={2} className="text-white mb-4">
            Ready to Taste Home?
          </Title>
          <Paragraph className="text-xl text-green-100 mb-8">
            Start your culinary journey with authentic Nigerian ingredients
            delivered worldwide.
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="large" className="btn-secondary">
                Start Shopping
              </Button>
            </Link>
            <Link href="/register">
              <Button size="large" ghost>
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
