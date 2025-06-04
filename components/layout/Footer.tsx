"use client";

import Link from "next/link";
import { Button, Input, Row, Col, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

export default function Footer() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          <Row gutter={[32, 32]}>
            {/* Company Info */}
            <Col xs={24} md={12} lg={8}>
              <motion.div variants={fadeInUp}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-[#0B8457] rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">H</span>
                  </div>
                  <span className="text-2xl font-bold font-poppins">
                    Homindi
                  </span>
                </div>
                <p className="text-gray-300 mb-6 max-w-md leading-relaxed font-inter">
                  Connecting Africans in the diaspora with authentic Nigerian
                  food products. Fresh, quality ingredients delivered to your
                  doorstep worldwide, bringing the taste of home to your
                  kitchen.
                </p>
                <div className="flex space-x-4">
                  {[
                    { icon: FacebookOutlined, href: "#" },
                    { icon: TwitterOutlined, href: "#" },
                    { icon: InstagramOutlined, href: "#" },
                    { icon: LinkedinOutlined, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#0B8457] transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="text-lg" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </Col>

            {/* Quick Links */}
            <Col xs={24} md={6} lg={4}>
              <motion.div variants={fadeInUp} custom={1}>
                <h3 className="text-lg font-semibold mb-6 font-poppins">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: "/products", label: "Products" },
                    { href: "/about", label: "About Us" },
                    { href: "/contact", label: "Contact" },
                    { href: "/faq", label: "FAQ" },
                    { href: "/shipping", label: "Shipping Info" },
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors font-inter hover:translate-x-1 inline-block duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Col>

            {/* Support */}
            <Col xs={24} md={6} lg={4}>
              <motion.div variants={fadeInUp} custom={2}>
                <h3 className="text-lg font-semibold mb-6 font-poppins">
                  Support
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: "/faq", label: "FAQ" },
                    { href: "/returns", label: "Returns" },
                    { href: "/privacy", label: "Privacy Policy" },
                    { href: "/terms", label: "Terms of Service" },
                    { href: "/help", label: "Help Center" },
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors font-inter hover:translate-x-1 inline-block duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Col>

            {/* Contact & Newsletter */}
            <Col xs={24} md={12} lg={8}>
              <motion.div variants={fadeInUp} custom={3}>
                <h3 className="text-lg font-semibold mb-6 font-poppins">
                  Stay Connected
                </h3>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <MailOutlined className="text-[#0B8457]" />
                    <span className="font-inter">support@homindi.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <PhoneOutlined className="text-[#0B8457]" />
                    <span className="font-inter">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <EnvironmentOutlined className="text-[#0B8457]" />
                    <span className="font-inter">New York, NY 10001</span>
                  </div>
                </div>

                {/* Newsletter */}
                <div>
                  <p className="text-gray-300 mb-4 font-inter">
                    Subscribe to get updates on new products and exclusive
                    offers.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your email"
                      className="flex-1 bg-gray-800 border-gray-700 text-gray-800 placeholder-white rounded-lg"
                      prefix={<MailOutlined className="text-gray-400" />}
                    />
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      className="bg-[#0B8457] border-[#0B8457] hover:bg-[#0a7249] rounded-lg px-4"
                    />
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>

          <Divider className="border-gray-800 my-8" />

          <motion.div
            variants={fadeInUp}
            custom={4}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <p className="text-gray-400 font-inter text-center md:text-left">
              © 2024 Homindi. All rights reserved. Made with ❤️ for the African
              diaspora.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors font-inter"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors font-inter"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors font-inter"
              >
                Cookies
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
