"use client";

import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Typography,
  Space,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ContactFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      message.success(
        "Thank you for your message! We'll get back to you within 24 hours."
      );
      form.resetFields();
    } catch (error) {
      message.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <MailOutlined className="text-2xl text-[#0B8457]" />,
      title: "Email Us",
      content: "support@homindi.com",
      description: "Send us an email anytime",
    },
    {
      icon: <PhoneOutlined className="text-2xl text-[#0B8457]" />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm",
    },
    {
      icon: <EnvironmentOutlined className="text-2xl text-[#0B8457]" />,
      title: "Visit Us",
      content: "123 Business Ave, Suite 100",
      description: "New York, NY 10001",
    },
    {
      icon: <ClockCircleOutlined className="text-2xl text-[#0B8457]" />,
      title: "Business Hours",
      content: "Monday - Friday",
      description: "8:00 AM - 6:00 PM EST",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B8457] to-[#0a7249] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Title level={1} className="!text-white !mb-4 font-poppins">
              Get in Touch
            </Title>
            <Paragraph className="text-xl text-green-100 max-w-2xl mx-auto font-inter">
              Have questions about our products or services? We'd love to hear
              from you. Send us a message and we'll respond as soon as possible.
            </Paragraph>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Row gutter={[32, 32]}>
          {/* Contact Form */}
          <Col xs={24} lg={14}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-lg border-0 rounded-2xl">
                <div className="p-6">
                  <Title level={2} className="!mb-2 font-poppins text-gray-900">
                    Send us a Message
                  </Title>
                  <Paragraph className="text-gray-600 mb-8 font-inter">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </Paragraph>

                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    size="large"
                    className="space-y-4"
                  >
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="name"
                          label={
                            <span className="font-inter font-medium">
                              Full Name
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                            {
                              min: 2,
                              message: "Name must be at least 2 characters",
                            },
                          ]}
                        >
                          <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Enter your full name"
                            className="rounded-lg font-inter"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="email"
                          label={
                            <span className="font-inter font-medium">
                              Email Address
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Please enter your email",
                            },
                            {
                              type: "email",
                              message: "Please enter a valid email",
                            },
                          ]}
                        >
                          <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder="Enter your email address"
                            className="rounded-lg font-inter"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      name="subject"
                      label={
                        <span className="font-inter font-medium">Subject</span>
                      }
                      rules={[
                        { required: true, message: "Please enter a subject" },
                        {
                          min: 5,
                          message: "Subject must be at least 5 characters",
                        },
                      ]}
                    >
                      <Input
                        placeholder="What is this regarding?"
                        className="rounded-lg font-inter"
                      />
                    </Form.Item>

                    <Form.Item
                      name="message"
                      label={
                        <span className="font-inter font-medium">Message</span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please enter your message",
                        },
                        {
                          min: 10,
                          message: "Message must be at least 10 characters",
                        },
                      ]}
                    >
                      <TextArea
                        rows={6}
                        placeholder="Tell us more about your inquiry..."
                        className="rounded-lg font-inter"
                      />
                    </Form.Item>

                    <Form.Item className="mb-0">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<SendOutlined />}
                        className="bg-[#0B8457] hover:bg-[#0a7249] border-[#0B8457] rounded-lg h-12 px-8 font-inter font-medium"
                        block
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Card>
            </motion.div>
          </Col>

          {/* Contact Information */}
          <Col xs={24} lg={10}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <Title level={2} className="!mb-2 font-poppins text-gray-900">
                  Contact Information
                </Title>
                <Paragraph className="text-gray-600 mb-8 font-inter">
                  Reach out to us through any of these channels. We're here to
                  help!
                </Paragraph>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start space-x-4 p-4">
                        <div className="flex-shrink-0">{info.icon}</div>
                        <div className="flex-1">
                          <Title
                            level={4}
                            className="!mb-1 font-inter text-gray-900"
                          >
                            {info.title}
                          </Title>
                          <Text className="text-lg font-medium text-gray-800 font-inter">
                            {info.content}
                          </Text>
                          <br />
                          <Text className="text-gray-600 font-inter">
                            {info.description}
                          </Text>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Additional Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Card className="bg-gradient-to-r from-[#0B8457] to-[#0a7249] text-white rounded-xl border-0">
                  <div className="p-6">
                    <Title level={3} className="!text-white !mb-4 font-poppins">
                      Need Immediate Help?
                    </Title>
                    <Paragraph className="text-green-100 mb-4 font-inter">
                      For urgent matters, please call our support line or check
                      our FAQ section for quick answers to common questions.
                    </Paragraph>
                    <Space direction="vertical" className="w-full">
                      <Button
                        type="default"
                        className="bg-white text-[#0B8457] border-white hover:bg-gray-50 rounded-lg font-inter font-medium"
                        block
                      >
                        View FAQ
                      </Button>
                      <Button
                        type="default"
                        className="bg-transparent text-white border-white hover:bg-white hover:text-[#0B8457] rounded-lg font-inter font-medium"
                        block
                      >
                        Live Chat Support
                      </Button>
                    </Space>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
