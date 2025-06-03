"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Typography, Card, Divider, Anchor } from "antd"
import { motion } from "framer-motion"

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
    { key: "information-collection", title: "Information We Collect" },
    { key: "information-use", title: "How We Use Your Information" },
    { key: "information-sharing", title: "Information Sharing" },
    { key: "data-security", title: "Data Security" },
    { key: "cookies", title: "Cookies and Tracking" },
    { key: "your-rights", title: "Your Rights" },
    { key: "children-privacy", title: "Children's Privacy" },
    { key: "international-transfers", title: "International Data Transfers" },
    { key: "policy-updates", title: "Policy Updates" },
    { key: "contact", title: "Contact Us" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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
              Privacy Policy
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how Homindi collects, uses, and protects your
              personal information.
            </Paragraph>
            <Text type="secondary" className="text-lg">
              Last updated: December 2024
            </Text>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <motion.div variants={fadeInUp} custom={1} className="lg:col-span-1">
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
            <motion.div variants={fadeInUp} custom={2} className="lg:col-span-3">
              <Card className="border-0 shadow-lg rounded-2xl p-8">
                <div className="prose prose-lg max-w-none">
                  <section id="information-collection" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      1. Information We Collect
                    </Title>

                    <Title level={3} className="text-xl font-semibold mb-3">
                      Personal Information
                    </Title>
                    <Paragraph className="mb-4">
                      We collect information you provide directly to us, including:
                    </Paragraph>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>Name, email address, and phone number</li>
                      <li>Shipping and billing addresses</li>
                      <li>Payment information (processed securely by our payment providers)</li>
                      <li>Account preferences and communication settings</li>
                      <li>Customer service communications</li>
                    </ul>

                    <Title level={3} className="text-xl font-semibold mb-3">
                      Automatically Collected Information
                    </Title>
                    <Paragraph className="mb-4">When you use our services, we automatically collect:</Paragraph>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>Device information (IP address, browser type, operating system)</li>
                      <li>Usage data (pages visited, time spent, click patterns)</li>
                      <li>Location information (with your consent)</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </section>

                  <Divider />

                  <section id="information-use" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      2. How We Use Your Information
                    </Title>
                    <Paragraph className="mb-4">We use your information to:</Paragraph>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>Process and fulfill your orders</li>
                      <li>Provide customer support and respond to inquiries</li>
                      <li>Send order confirmations, shipping updates, and important notices</li>
                      <li>Improve our products and services</li>
                      <li>Personalize your shopping experience</li>
                      <li>Send marketing communications (with your consent)</li>
                      <li>Prevent fraud and ensure security</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </section>

                  <Divider />

                  <section id="information-sharing" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      3. Information Sharing
                    </Title>
                    <Paragraph className="mb-4">
                      We do not sell your personal information. We may share your information with:
                    </Paragraph>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>
                        <strong>Service Providers:</strong> Third parties who help us operate our business (payment
                        processors, shipping companies, email services)
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> When required by law or to protect our rights
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales
                      </li>
                      <li>
                        <strong>Consent:</strong> When you explicitly consent to sharing
                      </li>
                    </ul>
                  </section>

                  <Divider />

                  <section id="data-security" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      4. Data Security
                    </Title>
                    <Paragraph className="mb-4">
                      We implement appropriate security measures to protect your information:
                    </Paragraph>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>SSL encryption for data transmission</li>
                      <li>Secure servers and databases</li>
                      <li>Regular security audits and updates</li>
                      <li>Limited access to personal information</li>
                      <li>Employee training on data protection</li>
                    </ul>
                  </section>

                  <Divider />

                  <section id="cookies" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      5. Cookies and Tracking
                    </Title>
                    <Paragraph className="mb-4">We use cookies and similar technologies to:</Paragraph>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>Remember your preferences and settings</li>
                      <li>Analyze website traffic and usage patterns</li>
                      <li>Provide personalized content and advertisements</li>
                      <li>Improve website functionality and performance</li>
                    </ul>
                    <Paragraph>
                      You can control cookies through your browser settings, but some features may not work properly if
                      cookies are disabled.
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="your-rights" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      6. Your Rights
                    </Title>
                    <Paragraph className="mb-4">Depending on your location, you may have the right to:</Paragraph>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate information</li>
                      <li>Delete your personal information</li>
                      <li>Restrict processing of your information</li>
                      <li>Data portability</li>
                      <li>Object to processing</li>
                      <li>Withdraw consent</li>
                    </ul>
                    <Paragraph>To exercise these rights, please contact us at privacy@homindi.com.</Paragraph>
                  </section>

                  <Divider />

                  <section id="children-privacy" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      7. Children's Privacy
                    </Title>
                    <Paragraph>
                      Our services are not intended for children under 13. We do not knowingly collect personal
                      information from children under 13. If we become aware that we have collected such information, we
                      will take steps to delete it promptly.
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="international-transfers" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      8. International Data Transfers
                    </Title>
                    <Paragraph>
                      Your information may be transferred to and processed in countries other than your own. We ensure
                      appropriate safeguards are in place to protect your information during such transfers, including
                      standard contractual clauses and adequacy decisions.
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="policy-updates" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      9. Policy Updates
                    </Title>
                    <Paragraph>
                      We may update this privacy policy from time to time. We will notify you of any material changes by
                      posting the new policy on our website and updating the "Last updated" date. Your continued use of
                      our services after such changes constitutes acceptance of the updated policy.
                    </Paragraph>
                  </section>

                  <Divider />

                  <section id="contact" className="mb-12">
                    <Title level={2} className="text-2xl font-bold mb-4 text-primary-600">
                      10. Contact Us
                    </Title>
                    <Paragraph className="mb-4">
                      If you have any questions about this privacy policy or our data practices, please contact us:
                    </Paragraph>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <Paragraph className="mb-2">
                        <strong>Email:</strong> privacy@homindi.com
                      </Paragraph>
                      <Paragraph className="mb-2">
                        <strong>Phone:</strong> +1 (555) 123-4567
                      </Paragraph>
                      <Paragraph className="mb-2">
                        <strong>Address:</strong> 123 Business Ave, New York, NY 10001
                      </Paragraph>
                      <Paragraph className="mb-0">
                        <strong>Data Protection Officer:</strong> dpo@homindi.com
                      </Paragraph>
                    </div>
                  </section>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
