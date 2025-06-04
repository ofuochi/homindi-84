"use client"

import { Typography, Card, Divider, Anchor, Alert } from "antd"
import { motion } from "framer-motion"

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
    { key: "acceptance", title: "Acceptance of Terms" },
    { key: "services", title: "Description of Services" },
    { key: "account", title: "User Accounts" },
    { key: "orders", title: "Orders and Payment" },
    { key: "shipping", title: "Shipping and Delivery" },
    { key: "returns", title: "Returns and Refunds" },
    { key: "prohibited", title: "Prohibited Uses" },
    { key: "intellectual-property", title: "Intellectual Property" },
    { key: "limitation", title: "Limitation of Liability" },
    { key: "termination", title: "Termination" },
    { key: "governing-law", title: "Governing Law" },
    { key: "contact", title: "Contact Information" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Title level={1} className="text-4xl font-bold mb-4">
              Terms of Service
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please read these terms carefully before using Homindi's services. By using our platform, you agree to be
              bound by these terms.
            </Paragraph>
            <Text type="secondary" className="text-lg">
              Last updated: December 2024
            </Text>
          </motion.div>

          <motion.div variants={fadeInUp} custom={1} className="mb-8">
            <Alert
              message="Important Notice"
              description="These terms constitute a legally binding agreement between you and Homindi. Please read them carefully and contact us if you have any questions."
              type="info"
              showIcon
              className="rounded-xl"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <motion.div variants={fadeInUp} custom={2} className="lg:col-span-1">
              <Card className="sticky top-8 border-0 shadow-lg rounded-2xl">
                <Title level={4} className="mb-4">
                  Table of Contents
                </Title>
                <Anchor
                  affix={false}
                  items={sections.map((section) => ({
                    key: section.key,
                    href: `#${section.key}`,
                    title: section.title,
                  }))}
                />
              </Card>
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeInUp} custom={3} className="lg:col-span-3">
              <Card className="border-0 shadow-lg rounded-2xl p-8">
                <div className="prose prose-lg max-w-none">
                  <section id="acceptance" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      1. Acceptance of Terms
                    </Title>
                    <Paragraph>
                      By accessing and using Homindi's website and services, you accept and agree to be bound by the
                      terms and provision of this agreement. If you do not agree to abide by the above, please do not
                      use this service.
                    </Paragraph>
                    <Paragraph>
                      These Terms of Service ("Terms") govern your use of our website located at homindi.com (the
                      "Service") operated by Homindi ("us", "we", or "our").
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="services" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      2. Description of Services
                    </Title>
                    <Paragraph className="mb-4">
                      Homindi provides an online marketplace for authentic African food products and ingredients. Our
                      services include:
                    </Paragraph>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>Online catalog of African food products</li>
                      <li>Order processing and payment handling</li>
                      <li>International shipping and delivery</li>
                      <li>Customer support services</li>
                      <li>User account management</li>
                    </ul>
                    <Paragraph>
                      We reserve the right to modify, suspend, or discontinue any part of our services at any time
                      without notice.
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="account" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      3. User Accounts
                    </Title>
                    <Paragraph className="mb-4">
                      To access certain features of our service, you must create an account. You agree to:
                    </Paragraph>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>Provide accurate, current, and complete information</li>
                      <li>Maintain and update your account information</li>
                      <li>Keep your password secure and confidential</li>
                      <li>Accept responsibility for all activities under your account</li>
                      <li>Notify us immediately of any unauthorized use</li>
                    </ul>
                    <Paragraph>
                      You must be at least 18 years old to create an account. We reserve the right to refuse service or
                      terminate accounts at our discretion.
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="orders" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      4. Orders and Payment
                    </Title>

                    <Title level={3} className="text-xl font-semibold mb-3">
                      Order Process
                    </Title>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>All orders are subject to acceptance and availability</li>
                      <li>We reserve the right to refuse or cancel orders</li>
                      <li>Prices are subject to change without notice</li>
                      <li>All prices are in USD unless otherwise specified</li>
                    </ul>

                    <Title level={3} className="text-xl font-semibold mb-3">
                      Payment Terms
                    </Title>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>Payment is required at the time of order</li>
                      <li>We accept major credit cards and PayPal</li>
                      <li>All transactions are processed securely</li>
                      <li>You authorize us to charge your payment method</li>
                    </ul>
                  </section>

                  <Divider />

                  <section id="shipping" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      5. Shipping and Delivery
                    </Title>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>Shipping costs are calculated at checkout</li>
                      <li>Delivery times are estimates and not guaranteed</li>
                      <li>Risk of loss passes to you upon delivery</li>
                      <li>You are responsible for providing accurate delivery information</li>
                      <li>International orders may be subject to customs duties</li>
                    </ul>
                    <Paragraph>
                      We are not responsible for delays caused by customs, weather, or other factors beyond our control.
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="returns" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      6. Returns and Refunds
                    </Title>
                    <Paragraph className="mb-4">
                      Due to the nature of food products, we have specific return policies:
                    </Paragraph>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>Damaged or defective items can be returned within 7 days</li>
                      <li>Perishable items cannot be returned unless defective</li>
                      <li>Return shipping costs are the customer's responsibility</li>
                      <li>Refunds are processed within 5-10 business days</li>
                      <li>Original shipping costs are non-refundable</li>
                    </ul>
                  </section>

                  <Divider />

                  <section id="prohibited" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      7. Prohibited Uses
                    </Title>
                    <Paragraph className="mb-4">You may not use our service:</Paragraph>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>For any unlawful purpose or to solicit unlawful acts</li>
                      <li>To violate any international, federal, provincial, or state regulations or laws</li>
                      <li>To infringe upon or violate our intellectual property rights</li>
                      <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                      <li>To submit false or misleading information</li>
                      <li>To upload or transmit viruses or malicious code</li>
                      <li>To collect or track personal information of others</li>
                    </ul>
                  </section>

                  <Divider />

                  <section id="intellectual-property" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      8. Intellectual Property Rights
                    </Title>
                    <Paragraph>
                      The service and its original content, features, and functionality are and will remain the
                      exclusive property of Homindi and its licensors. The service is protected by copyright, trademark,
                      and other laws. Our trademarks and trade dress may not be used without our prior written consent.
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="limitation" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      9. Limitation of Liability
                    </Title>
                    <Paragraph>
                      In no event shall Homindi, nor its directors, employees, partners, agents, suppliers, or
                      affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
                      including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                      resulting from your use of the service.
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="termination" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      10. Termination
                    </Title>
                    <Paragraph>
                      We may terminate or suspend your account and bar access to the service immediately, without prior
                      notice or liability, under our sole discretion, for any reason whatsoever, including without
                      limitation if you breach the Terms.
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="governing-law" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      11. Governing Law
                    </Title>
                    <Paragraph>
                      These Terms shall be interpreted and governed by the laws of the State of New York, without regard
                      to its conflict of law provisions. Our failure to enforce any right or provision of these Terms
                      will not be considered a waiver of those rights.
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="contact" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      12. Contact Information
                    </Title>
                    <Paragraph className="mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </Paragraph>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <Paragraph className="mb-2">
                        <strong>Email:</strong> legal@homindi.com
                      </Paragraph>
                      <Paragraph className="mb-2">
                        <strong>Phone:</strong> +1 (555) 123-4567
                      </Paragraph>
                      <Paragraph className="mb-0">
                        <strong>Address:</strong> 123 Business Ave, New York, NY 10001
                      </Paragraph>
                    </div>
                  </section>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
