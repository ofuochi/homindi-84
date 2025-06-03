"use client"

import Header from "@/components/layout/Header"
import { Typography } from "antd"
import { CookieOutlined, SettingOutlined, SafetyOutlined, BarChartOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"
import { colors, gradients } from "@/lib/theme"
import { useState } from "react"

const { Title, Paragraph, Text } = Typography

export default function CookiesPage() {
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true,
  })

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  }

  const cookieTypes = [
    {
      name: "Necessary Cookies",
      description: "Essential for the website to function properly. These cannot be disabled.",
      purpose: "Authentication, security, shopping cart functionality",
      retention: "Session or until logout",
      enabled: cookieSettings.necessary,
      required: true,
      icon: <SafetyOutlined style={{ color: colors.success[500] }} />,
    },
    {
      name: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website.",
      purpose: "Website performance analysis, user behavior tracking",
      retention: "Up to 2 years",
      enabled: cookieSettings.analytics,
      required: false,
      icon: <BarChartOutlined style={{ color: colors.info[500] }} />,
    },
    {
      name: "Marketing Cookies",
      description: "Used to deliver personalized advertisements and track campaign effectiveness.",
      purpose: "Targeted advertising, social media integration",
      retention: "Up to 1 year",
      enabled: cookieSettings.marketing,
      required: false,
      icon: <CookieOutlined style={{ color: colors.warning[500] }} />,
    },
    {
      name: "Preference Cookies",
      description: "Remember your settings and preferences for a better experience.",
      purpose: "Language preferences, theme settings, region selection",
      retention: "Up to 1 year",
      enabled: cookieSettings.preferences,
      required: false,
      icon: <SettingOutlined style={{ color: colors.primary[500] }} />,
    },
  ]

  const cookieDetails = [
    {
      name: "_session_id",
      purpose: "Maintains user session",
      type: "Necessary",
      duration: "Session",
      provider: "Homindi",
    },
    {
      name: "_cart_token",
      purpose: "Stores shopping cart items",
      type: "Necessary",
      duration: "30 days",
      provider: "Homindi",
    },
    {
      name: "_ga",
      purpose: "Google Analytics tracking",
      type: "Analytics",
      duration: "2 years",
      provider: "Google",
    },
    {
      name: "_fbp",
      purpose: "Facebook Pixel tracking",
      type: "Marketing",
      duration: "90 days",
      provider: "Facebook",
    },
    {
      name: "preferences",
      purpose: "User preferences storage",
      type: "Preferences",
      duration: "1 year",
      provider: "Homindi",
    },
  ]

  const columns = [
    {
      title: "Cookie Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text code style={{ color: colors.primary[500] }}>{text}</Text>,
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string) => {
        const colorMap: { [key: string]: string } = {
          Necessary: colors.success[500],
          Analytics: colors.info[500],
          Marketing: colors.warning[500],
          Preferences: colors.primary[500],
        }
        return (
          <span 
            style={{ 
              color: colorMap[text],
              fontWeight: 'bold'
            }}
          >
            {text}
          </span>
        )
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
  ]

  const handleCookieToggle = (type: string, checked: boolean) => {
    setCookieSettings(prev => ({
      ...prev,
      [type]: checked,
    }))
  }

  const saveSettings = () => {
    // In a real app, this would save to localStorage or send to server
    console.log("Cookie settings saved:", cookieSettings)
    // Show success message
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background.secondary }}>
      <Header />
      
      {/* Hero Section */}
      <section className="py-16" style={{ background: gradients.primary }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.div variants={fadeInUp}>
              <Title level={1} className="text-white mb\
