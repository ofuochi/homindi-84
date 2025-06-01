"use client";

import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Statistic,
  Timeline,
} from "antd";
import {
  GlobalOutlined,
  HeartOutlined,
  RocketOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const { Title, Paragraph, Text } = Typography;

export default function AboutPage() {
  const stats = [
    { title: "Happy Customers", value: 10000, suffix: "+" },
    { title: "Products Available", value: 5000, suffix: "+" },
    { title: "Countries Served", value: 25, suffix: "+" },
    { title: "Years of Experience", value: 8, suffix: "" },
  ];

  const values = [
    {
      icon: <HeartOutlined className="text-3xl text-[#0B8457]" />,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and satisfaction above all else, ensuring every interaction exceeds expectations.",
    },
    {
      icon: <SafetyOutlined className="text-3xl text-[#0B8457]" />,
      title: "Quality Assurance",
      description:
        "Every product undergoes rigorous quality checks to ensure you receive only the finest goods from trusted suppliers.",
    },
    {
      icon: <GlobalOutlined className="text-3xl text-[#0B8457]" />,
      title: "Global Reach",
      description:
        "Connecting diaspora communities worldwide with authentic products from their homeland, bridging distances with care.",
    },
    {
      icon: <ThunderboltOutlined className="text-3xl text-[#0B8457]" />,
      title: "Innovation",
      description:
        "Continuously improving our platform with cutting-edge technology to provide seamless shopping experiences.",
    },
  ];

  const timeline = [
    {
      color: "#0B8457",
      children: (
        <div>
          <Text strong className="font-inter">
            2016 - The Beginning
          </Text>
          <br />
          <Text className="text-gray-600 font-inter">
            Founded with a vision to connect diaspora communities with authentic
            products from their homeland.
          </Text>
        </div>
      ),
    },
    {
      color: "#0B8457",
      children: (
        <div>
          <Text strong className="font-inter">
            2018 - Platform Launch
          </Text>
          <br />
          <Text className="text-gray-600 font-inter">
            Launched our first e-commerce platform, serving customers across 5
            countries.
          </Text>
        </div>
      ),
    },
    {
      color: "#0B8457",
      children: (
        <div>
          <Text strong className="font-inter">
            2020 - Global Expansion
          </Text>
          <br />
          <Text className="text-gray-600 font-inter">
            Expanded to 15 countries and partnered with over 100 local suppliers
            worldwide.
          </Text>
        </div>
      ),
    },
    {
      color: "#0B8457",
      children: (
        <div>
          <Text strong className="font-inter">
            2022 - Technology Upgrade
          </Text>
          <br />
          <Text className="text-gray-600 font-inter">
            Implemented AI-powered recommendations and enhanced mobile
            experience.
          </Text>
        </div>
      ),
    },
    {
      color: "#0B8457",
      children: (
        <div>
          <Text strong className="font-inter">
            2024 - Present
          </Text>
          <br />
          <Text className="text-gray-600 font-inter">
            Serving 25+ countries with 10,000+ happy customers and 5,000+
            authentic products.
          </Text>
        </div>
      ),
    },
  ];

  const team = [
    {
      name: "Fortune Ochi",
      role: "Co-Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Passionate about connecting communities through authentic cultural products.",
    },
    {
      name: "Sarah Johnson",
      role: "Co-Founder & CTO",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Technology enthusiast focused on creating seamless user experiences.",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Ensures smooth operations and quality control across all our services.",
    },
    {
      name: "Amara Okafor",
      role: "Head of Customer Success",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Dedicated to ensuring every customer has an exceptional experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B8457] to-[#0a7249] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Title level={1} className="!text-white !mb-6 font-poppins">
              About Homindi
            </Title>
            <Paragraph className="text-xl text-green-100 max-w-3xl mx-auto font-inter leading-relaxed">
              We're on a mission to bridge the gap between diaspora communities
              and their cultural roots by providing authentic, high-quality
              products from around the world. Every purchase tells a story,
              connects a family, and preserves a tradition.
            </Paragraph>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Row gutter={[32, 32]} className="text-center">
              {stats.map((stat, index) => (
                <Col xs={12} sm={6} key={index}>
                  <Card className="border-0 shadow-sm rounded-xl">
                    <Statistic
                      title={
                        <span className="font-inter text-gray-600">
                          {stat.title}
                        </span>
                      }
                      value={stat.value}
                      suffix={stat.suffix}
                      valueStyle={{
                        color: "#0B8457",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                      }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Our Mission"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </motion.div>
            </Col>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <Title level={2} className="!mb-4 font-poppins text-gray-900">
                    Our Mission
                  </Title>
                  <Paragraph className="text-lg text-gray-700 font-inter leading-relaxed">
                    To create meaningful connections between diaspora
                    communities and their cultural heritage through authentic
                    products, exceptional service, and innovative technology. We
                    believe that distance should never diminish the bond with
                    one's roots.
                  </Paragraph>
                </div>
                <div>
                  <Title level={3} className="!mb-3 font-poppins text-gray-900">
                    Our Vision
                  </Title>
                  <Paragraph className="text-gray-700 font-inter leading-relaxed">
                    To become the world's most trusted platform for authentic
                    cultural products, fostering global communities while
                    preserving and celebrating diverse traditions.
                  </Paragraph>
                </div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-12"
          >
            <Title level={2} className="!mb-4 font-poppins text-gray-900">
              Our Core Values
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
              These principles guide everything we do and shape how we serve our
              community.
            </Paragraph>
          </motion.div>

          <Row gutter={[32, 32]}>
            {values.map((value, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-sm rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="text-center p-6">
                      <div className="mb-4">{value.icon}</div>
                      <Title
                        level={4}
                        className="!mb-3 font-poppins text-gray-900"
                      >
                        {value.title}
                      </Title>
                      <Paragraph className="text-gray-600 font-inter">
                        {value.description}
                      </Paragraph>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <Title level={2} className="!mb-6 font-poppins text-gray-900">
                  Our Journey
                </Title>
                <Paragraph className="text-lg text-gray-600 mb-8 font-inter">
                  From a simple idea to a global platform serving thousands of
                  customers worldwide.
                </Paragraph>
                <Timeline items={timeline} />
              </motion.div>
            </Col>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <Card className="bg-gradient-to-br from-[#0B8457] to-[#0a7249] text-white border-0 rounded-2xl">
                  <div className="p-8">
                    <RocketOutlined className="text-4xl text-white mb-4" />
                    <Title level={3} className="!text-white !mb-4 font-poppins">
                      What's Next?
                    </Title>
                    <Paragraph className="text-green-100 mb-6 font-inter">
                      We're constantly innovating and expanding our reach. Our
                      upcoming features include AI-powered product
                      recommendations, virtual cultural experiences, and
                      enhanced community features.
                    </Paragraph>
                    <Space direction="vertical" className="w-full">
                      <Button
                        type="default"
                        size="large"
                        className="bg-white text-[#0B8457] border-white hover:bg-gray-50 rounded-lg font-inter font-medium"
                        block
                      >
                        Join Our Newsletter
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
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="text-center mb-12"
          >
            <Title level={2} className="!mb-4 font-poppins text-gray-900">
              Meet Our Team
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
              The passionate individuals behind Homindi, working tirelessly to
              serve our global community.
            </Paragraph>
          </motion.div>

          <Row gutter={[32, 32]}>
            {team.map((member, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.0 + index * 0.1 }}
                >
                  <Card className="border-0 shadow-sm rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="text-center p-6">
                      <div className="mb-4">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          width={120}
                          height={120}
                          className="rounded-full mx-auto object-cover"
                        />
                      </div>
                      <Title
                        level={4}
                        className="!mb-1 font-poppins text-gray-900"
                      >
                        {member.name}
                      </Title>
                      <Text className="text-[#0B8457] font-medium font-inter">
                        {member.role}
                      </Text>
                      <Paragraph className="text-gray-600 mt-3 font-inter">
                        {member.description}
                      </Paragraph>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            <Title level={2} className="!mb-6 font-poppins text-gray-900">
              Ready to Start Your Journey?
            </Title>
            <Paragraph className="text-lg text-gray-600 mb-8 font-inter">
              Join thousands of satisfied customers who trust Homindi for
              authentic cultural products.
            </Paragraph>
            <Space size="large" wrap>
              <Link href="/products">
                <Button
                  type="primary"
                  size="large"
                  className="bg-[#0B8457] hover:bg-[#0a7249] border-[#0B8457] rounded-lg px-8 font-inter font-medium"
                >
                  Explore Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="large"
                  className="rounded-lg px-8 font-inter font-medium"
                >
                  Contact Us
                </Button>
              </Link>
            </Space>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
