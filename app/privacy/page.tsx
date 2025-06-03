"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Typography, Card, Divider, Anchor, Row, Col } from "antd"
import { motion } from "framer-motion"
import { colors } from "@/lib/theme"

const { Title, Paragraph, Text } = Typography

export default function PrivacyPolicyPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  }

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      content: [
        "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.",
        "Personal information may include your name, email address, phone number, shipping address, and payment information.",
        "We also collect information automatically when you use our services, including device information, IP address, and usage data.",
      ],
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      content: [
        "To provide, maintain, and improve our services and products",
        "To process transactions and send you related information",
        "To send you technical notices, updates, security alerts, and support messages",
        "To respond to your comments, questions, and customer service requests",
        "To communicate with you about products, services, offers, and events",
        "To monitor and analyze trends, usage, and activities in connection with our services",
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      content: [
        "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.",
        "We may share your information with service providers who assist us in operating our website and conducting our business.",
        "We may disclose your information if required by law or to protect our rights, property, or safety.",
        "In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        "We use SSL encryption for data transmission and secure servers for data storage.",
        "However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      content: [
        "We use cookies and similar tracking technologies to collect and use personal information about you.",
        "Cookies help us provide a better user experience and analyze how our website is used.",
        "You can control cookies through your browser settings, but disabling cookies may affect website functionality.",
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      content: [
        "You have the right to access, update, or delete your personal information.",
        "You can opt out of receiving promotional communications from us at any time.",
        "You may request a copy of the personal information we hold about you.",
        "If you are in the EU, you have additional rights under GDPR, including the right to data portability and the right to object to processing.",
      ],
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      content: [
        "Your information may be transferred to and processed in countries other than your own.",
        "We ensure that such transfers are made in accordance with applicable data protection laws.",
        "We implement appropriate safeguards to protect your information during international transfers.",
      ],
    },
    {
      id: "children-privacy",
      title: "Children's Privacy",
      content: [
        "Our services are not intended for children under the age of 13.",
        "We do not knowingly collect personal information from children under 13.",
        "If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.",
      ],
    },
    {
      id: "policy-changes",
      title: "Changes to This Privacy Policy",
      content: [
        "We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.",
        "We will notify you of any material changes by posting the new privacy policy on this page and updating the 'Last Updated' date.",
        "Your continued use of our services after any changes indicates your acceptance of the updated policy.",
      ],
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background.secondary }}>
      <Header />

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
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={16}>
              <motion.div variants={fadeInUp}>
                <Card className="rounded-2xl border-0 shadow-lg" style={{ backgroundColor: colors.background.primary }}>
                  <div className="p-8">
                    <Title level={1} className="mb-4" style={{ color: colors.text.primary }}>
                      Privacy Policy
                    </Title>
                    <Paragraph className="text-lg mb-6" style={{ color: colors.text.secondary }}>
                      Last updated: December 2024
                    </Paragraph>
                    <Paragraph className="text-lg leading-relaxed mb-8" style={{ color: colors.text.secondary }}>
                      At Homindi, we are committed to protecting your privacy and ensuring the security of your personal
                      information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                      information when you visit our website or use our services.
                    </Paragraph>

                    {sections.map((section, index) => (
                      <motion.div key={section.id} variants={fadeInUp} custom={index + 1}>
                        <div id={section.id} className="mb-8">
                          <Title level={3} className="mb-4" style={{ color: colors.primary[500] }}>
                            {section.title}
                          </Title>
                          {section.content.map((paragraph, pIndex) => (
                            <Paragraph
                              key={pIndex}
                              className="mb-3 leading-relaxed"
                              style={{ color: colors.text.secondary }}
                            >
                              • {paragraph}
                            </Paragraph>
                          ))}
                        </div>
                        {index < sections.length - 1 && <Divider style={{ borderColor: colors.border.light }} />}
                      </motion.div>
                    ))}

                    <motion.div variants={fadeInUp} custom={sections.length + 1}>
                      <Divider style={{ borderColor: colors.border.light }} />
                      <Title level={3} className="mb-4" style={{ color: colors.primary[500] }}>
                        Contact Us
                      </Title>
                      <Paragraph className="leading-relaxed" style={{ color: colors.text.secondary }}>
                        If you have any questions about this Privacy Policy, please contact us at:
                      </Paragraph>
                      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: colors.background.secondary }}>
                        <Paragraph className="mb-2" style={{ color: colors.text.primary }}>
                          <Text strong>Email:</Text> privacy@homindi.com
                        </Paragraph>
                        <Paragraph className="mb-2" style={{ color: colors.text.primary }}>
                          <Text strong>Phone:</Text> +1 (555) 123-4567
                        </Paragraph>
                        <Paragraph className="mb-0" style={{ color: colors.text.primary }}>
                          <Text strong>Address:</Text> 123 Business Ave, New York, NY 10001
                        </Paragraph>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} lg={8}>
              <motion.div variants={fadeInUp} custom={1}>
                <Card
                  className="rounded-2xl border-0 shadow-lg sticky top-24"
                  style={{ backgroundColor: colors.background.primary }}
                >
                  <div className="p-6">
                    <Title level={4} className="mb-4" style={{ color: colors.text.primary }}>
                      Quick Navigation
                    </Title>
                    <Anchor
                      direction="vertical"
                      items={sections.map((section) => ({
                        key: section.id,
                        href: `#${section.id}`,
                        title: section.title,
                      }))}
                      className="privacy-anchor"
                    />
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
