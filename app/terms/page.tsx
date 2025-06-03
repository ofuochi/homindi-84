"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Typography, Card, Divider, Anchor, Row, Col } from "antd"
import { motion } from "framer-motion"
import { colors } from "@/lib/theme"

const { Title, Paragraph, Text } = Typography

export default function TermsOfServicePage() {
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
      id: "acceptance",
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Homindi's website and services, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These terms apply to all visitors, users, and others who access or use the service.",
      ],
    },
    {
      id: "description",
      title: "Description of Service",
      content: [
        "Homindi is an online marketplace that connects customers with authentic African food products and ingredients.",
        "We facilitate the sale and delivery of products from various suppliers to customers worldwide.",
        "Our service includes product listings, order processing, payment handling, and customer support.",
      ],
    },
    {
      id: "user-accounts",
      title: "User Accounts",
      content: [
        "You must create an account to access certain features of our service.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to provide accurate, current, and complete information during registration.",
        "You are responsible for all activities that occur under your account.",
        "You must notify us immediately of any unauthorized use of your account.",
      ],
    },
    {
      id: "orders-payments",
      title: "Orders and Payments",
      content: [
        "All orders are subject to acceptance and availability.",
        "Prices are subject to change without notice until payment is processed.",
        "Payment must be made in full before products are shipped.",
        "We accept various payment methods as displayed during checkout.",
        "All payments are processed securely through our payment partners.",
      ],
    },
    {
      id: "shipping-delivery",
      title: "Shipping and Delivery",
      content: [
        "Shipping costs and delivery times vary based on destination and shipping method selected.",
        "We are not responsible for delays caused by customs, weather, or other factors beyond our control.",
        "Risk of loss and title for products pass to you upon delivery to the carrier.",
        "You must inspect products upon delivery and report any damage or discrepancies immediately.",
      ],
    },
    {
      id: "returns-refunds",
      title: "Returns and Refunds",
      content: [
        "We accept returns of unopened, non-perishable products within 30 days of delivery.",
        "Perishable items cannot be returned unless they arrive damaged or spoiled.",
        "Return shipping costs are the responsibility of the customer unless the return is due to our error.",
        "Refunds will be processed to the original payment method within 5-10 business days.",
        "Custom or special order items may not be eligible for return.",
      ],
    },
    {
      id: "prohibited-uses",
      title: "Prohibited Uses",
      content: [
        "You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts.",
        "You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.",
        "You may not transmit any worms, viruses, or any code of a destructive nature.",
        "You may not infringe upon or violate our intellectual property rights or the intellectual property rights of others.",
        "You may not harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      content: [
        "The service and its original content, features, and functionality are and will remain the exclusive property of Homindi.",
        "The service is protected by copyright, trademark, and other laws.",
        "Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.",
      ],
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      content: [
        "In no event shall Homindi be liable for any indirect, incidental, special, consequential, or punitive damages.",
        "Our total liability to you for all damages shall not exceed the amount paid by you for the products or services.",
        "Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for consequential damages.",
      ],
    },
    {
      id: "termination",
      title: "Termination",
      content: [
        "We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability.",
        "Upon termination, your right to use the service will cease immediately.",
        "If you wish to terminate your account, you may simply discontinue using the service.",
      ],
    },
    {
      id: "changes-terms",
      title: "Changes to Terms",
      content: [
        "We reserve the right to modify or replace these terms at any time.",
        "If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.",
        "Your continued use of the service after any changes constitutes acceptance of the new terms.",
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
                      Terms of Service
                    </Title>
                    <Paragraph className="text-lg mb-6" style={{ color: colors.text.secondary }}>
                      Last updated: December 2024
                    </Paragraph>
                    <Paragraph className="text-lg leading-relaxed mb-8" style={{ color: colors.text.secondary }}>
                      Welcome to Homindi. These Terms of Service ("Terms") govern your use of our website and services.
                      Please read these Terms carefully before using our service.
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
                        Contact Information
                      </Title>
                      <Paragraph className="leading-relaxed" style={{ color: colors.text.secondary }}>
                        If you have any questions about these Terms of Service, please contact us:
                      </Paragraph>
                      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: colors.background.secondary }}>
                        <Paragraph className="mb-2" style={{ color: colors.text.primary }}>
                          <Text strong>Email:</Text> legal@homindi.com
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
