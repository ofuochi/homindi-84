"use client"

import { Card, Row, Col, Typography, Button, Space, Statistic, Timeline, Avatar } from "antd"
import {
  GlobalOutlined,
  HeartOutlined,
  RocketOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  TrophyOutlined,
  StarOutlined,
} from "@ant-design/icons"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const { Title, Paragraph, Text } = Typography

export default function AboutPage() {
  const stats = [
    { title: "Happy Customers", value: 10000, suffix: "+", icon: TeamOutlined },
    { title: "Products Available", value: 5000, suffix: "+", icon: StarOutlined },
    { title: "Countries Served", value: 25, suffix: "+", icon: GlobalOutlined },
    { title: "Years of Experience", value: 8, suffix: "", icon: TrophyOutlined },
  ]

  const values = [
    {
      icon: <HeartOutlined className="text-4xl text-[#0B8457]" />,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and satisfaction above all else, ensuring every interaction exceeds expectations and builds lasting relationships.",
    },
    {
      icon: <SafetyOutlined className="text-4xl text-[#0B8457]" />,
      title: "Quality Assurance",
      description:
        "Every product undergoes rigorous quality checks to ensure you receive only the finest goods from trusted suppliers with authentic certifications.",
    },
    {
      icon: <GlobalOutlined className="text-4xl text-[#0B8457]" />,
      title: "Global Reach",
      description:
        "Connecting diaspora communities worldwide with authentic products from their homeland, bridging distances with care and cultural understanding.",
    },
    {
      icon: <ThunderboltOutlined className="text-4xl text-[#0B8457]" />,
      title: "Innovation",
      description:
        "Continuously improving our platform with cutting-edge technology to provide seamless shopping experiences and exceptional service delivery.",
    },
  ]

  const timeline = [
    {
      color: "#0B8457",
      children: (
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <Text strong className="font-inter text-lg">
            2016 - The Beginning
          </Text>
          <br />
          <Text className="text-gray-600 font-inter leading-relaxed">
            Founded with a vision to connect diaspora communities with authentic products from their homeland, starting
            with a small team and big dreams.
          </Text>
        </motion.div>
      ),
    },
    {
      color: "#0B8457",
      children: (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Text strong className="font-inter text-lg">
            2018 - Platform Launch
          </Text>
          <br />
          <Text className="text-gray-600 font-inter leading-relaxed">
            Launched our first e-commerce platform, serving customers across 5 countries with carefully curated Nigerian
            products.
          </Text>
        </motion.div>
      ),
    },
    {
      color: "#0B8457",
      children: (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Text strong className="font-inter text-lg">
            2020 - Global Expansion
          </Text>
          <br />
          <Text className="text-gray-600 font-inter leading-relaxed">
            Expanded to 15 countries and partnered with over 100 local suppliers worldwide, establishing quality control
            standards.
          </Text>
        </motion.div>
      ),
    },
    {
      color: "#0B8457",
      children: (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Text strong className="font-inter text-lg">
            2022 - Technology Upgrade
          </Text>
          <br />
          <Text className="text-gray-600 font-inter leading-relaxed">
            Implemented AI-powered recommendations and enhanced mobile experience with real-time tracking and customer
            support.
          </Text>
        </motion.div>
      ),
    },
    {
      color: "#0B8457",
      children: (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Text strong className="font-inter text-lg">
            2024 - Present
          </Text>
          <br />
          <Text className="text-gray-600 font-inter leading-relaxed">
            Serving 25+ countries with 10,000+ happy customers and 5,000+ authentic products, continuing to innovate and
            expand.
          </Text>
        </motion.div>
      ),
    },
  ]

  const team = [
    {
      name: "Fortune Ochi",
      role: "Co-Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Passionate about connecting communities through authentic cultural products and building bridges across continents.",
    },
    {
      name: "Sarah Johnson",
      role: "Co-Founder & CTO",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Technology enthusiast focused on creating seamless user experiences and innovative solutions for global commerce.",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Ensures smooth operations and quality control across all our services with attention to detail and excellence.",
    },
    {
      name: "Amara Okafor",
      role: "Head of Customer Success",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Dedicated to ensuring every customer has an exceptional experience and feels connected to their cultural heritage.",
    },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B8457] to-[#0a7249] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <motion.div variants={fadeInUp}>
              <Title level={1} className="!text-white !mb-6 font-poppins text-5xl lg:text-6xl">
                About Homindi
              </Title>
              <Paragraph className="text-xl text-green-100 max-w-4xl mx-auto font-inter leading-relaxed">
                We're on a mission to bridge the gap between diaspora communities and their cultural roots by providing
                authentic, high-quality products from around the world. Every purchase tells a story, connects a family,
                and preserves a tradition.
              </Paragraph>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <Row gutter={[32, 32]} className="text-center">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Col xs={12} sm={6} key={index}>
                    <motion.div variants={fadeInUp} custom={index}>
                      <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 h-full">
                        <div className="text-center p-4">
                          <div className="w-16 h-16 bg-green-50 rounded-full mx-auto flex items-center justify-center mb-4">
                            <Icon className="text-2xl text-[#0B8457]" />
                          </div>
                          <Statistic
                            title={<span className="font-inter text-gray-600 text-base">{stat.title}</span>}
                            value={stat.value}
                            suffix={stat.suffix}
                            valueStyle={{
                              color: "#0B8457",
                              fontFamily: "Poppins",
                              fontWeight: "bold",
                              fontSize: "2rem",
                            }}
                          />
                        </div>
                      </Card>
                    </motion.div>
                  </Col>
                )
              })}
            </Row>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  <Image
                    src="/placeholder-vbx6i.png"
                    alt="Our Mission"
                    width={700}
                    height={500}
                    className="rounded-3xl shadow-2xl object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <Text className="text-lg font-semibold">Authentic • Fresh • Global</Text>
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <Title level={2} className="!mb-6 font-poppins text-gray-900 text-4xl">
                    Our Mission
                  </Title>
                  <Paragraph className="text-lg text-gray-700 font-inter leading-relaxed mb-6">
                    To create meaningful connections between diaspora communities and their cultural heritage through
                    authentic products, exceptional service, and innovative technology. We believe that distance should
                    never diminish the bond with one's roots.
                  </Paragraph>
                </div>
                <div>
                  <Title level={3} className="!mb-4 font-poppins text-gray-900 text-2xl">
                    Our Vision
                  </Title>
                  <Paragraph className="text-lg text-gray-700 font-inter leading-relaxed">
                    To become the world's most trusted platform for authentic cultural products, fostering global
                    communities while preserving and celebrating diverse traditions for future generations.
                  </Paragraph>
                </div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="!mb-6 font-poppins text-gray-900 text-4xl">
                Our Core Values
              </Title>
              <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
                These principles guide everything we do and shape how we serve our community with integrity, passion,
                and excellence.
              </Paragraph>
            </motion.div>
          </motion.div>

          <Row gutter={[32, 32]}>
            {values.map((value, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  variants={fadeInUp}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 text-center p-6">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-green-50 rounded-full mx-auto flex items-center justify-center mb-4">
                        {value.icon}
                      </div>
                    </div>
                    <Title level={4} className="!mb-4 font-poppins text-gray-900 text-xl">
                      {value.title}
                    </Title>
                    <Paragraph className="text-gray-600 font-inter leading-relaxed">{value.description}</Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Title level={2} className="!mb-8 font-poppins text-gray-900 text-4xl">
                  Our Journey
                </Title>
                <Paragraph className="text-xl text-gray-600 mb-12 font-inter leading-relaxed">
                  From a simple idea to a global platform serving thousands of customers worldwide, here's how we've
                  grown and evolved.
                </Paragraph>
                <Timeline items={timeline} className="custom-timeline" />
              </motion.div>
            </Col>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-gradient-to-br from-[#0B8457] to-[#0a7249] text-white border-0 rounded-3xl shadow-2xl">
                  <div className="p-8">
                    <RocketOutlined className="text-5xl text-white mb-6" />
                    <Title level={3} className="!text-white !mb-6 font-poppins text-2xl">
                      What's Next?
                    </Title>
                    <Paragraph className="text-green-100 mb-8 font-inter text-lg leading-relaxed">
                      We're constantly innovating and expanding our reach. Our upcoming features include AI-powered
                      product recommendations, virtual cultural experiences, enhanced community features, and
                      sustainable packaging initiatives.
                    </Paragraph>
                    <Space direction="vertical" className="w-full" size="large">
                      <Button
                        type="default"
                        size="large"
                        className="bg-white text-[#0B8457] border-white hover:bg-gray-50 rounded-xl font-inter font-semibold h-12"
                        block
                      >
                        Join Our Newsletter
                      </Button>
                      <Button
                        type="default"
                        size="large"
                        className="bg-transparent text-white border-white hover:bg-white hover:text-[#0B8457] rounded-xl font-inter font-semibold h-12"
                        block
                      >
                        Follow Our Journey
                      </Button>
                    </Space>
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Title level={2} className="!mb-6 font-poppins text-gray-900 text-4xl">
                Meet Our Team
              </Title>
              <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
                The passionate individuals behind Homindi, working tirelessly to serve our global community and preserve
                cultural connections.
              </Paragraph>
            </motion.div>
          </motion.div>

          <Row gutter={[32, 32]}>
            {team.map((member, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  variants={fadeInUp}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 text-center overflow-hidden">
                    <div className="p-6">
                      <div className="mb-6">
                        <Avatar
                          size={120}
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="mx-auto shadow-lg"
                        />
                      </div>
                      <Title level={4} className="!mb-2 font-poppins text-gray-900 text-xl">
                        {member.name}
                      </Title>
                      <Text className="text-[#0B8457] font-semibold font-inter text-base block mb-4">
                        {member.role}
                      </Text>
                      <Paragraph className="text-gray-600 font-inter leading-relaxed">{member.description}</Paragraph>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-[#0B8457] to-[#0a7249] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Title level={2} className="!mb-8 font-poppins text-white text-4xl">
                Ready to Start Your Journey?
              </Title>
              <Paragraph className="text-xl text-green-100 mb-12 font-inter leading-relaxed">
                Join thousands of satisfied customers who trust Homindi for authentic cultural products and exceptional
                service.
              </Paragraph>
            </motion.div>
            <motion.div variants={fadeInUp} custom={1}>
              <Space size="large" wrap className="justify-center">
                <Link href="/products">
                  <Button
                    type="default"
                    size="large"
                    className="bg-[#F9A826] border-[#F9A826] text-white hover:bg-[#e09620] rounded-xl px-8 font-inter font-semibold h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Explore Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="large"
                    className="bg-transparent text-white border-white hover:bg-white hover:text-[#0B8457] rounded-xl px-8 font-inter font-semibold h-14 text-lg transition-all duration-300"
                  >
                    Contact Us
                  </Button>
                </Link>
              </Space>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </div>
  )
}
