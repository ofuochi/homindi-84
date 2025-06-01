"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { Layout, Button } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

const { Content, Sider } = Layout

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const siderWidth = collapsed ? 80 : 256
  const contentMargin = isMobile ? 0 : siderWidth

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Layout className="min-h-[calc(100vh-64px)]">
          <Sider
            width={256}
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            className="bg-white shadow-sm border-r border-gray-200 transition-all duration-200"
            style={{
              position: "fixed",
              height: "calc(100vh - 64px)",
              left: 0,
              top: 64,
              zIndex: 10,
            }}
            trigger={null}
            collapsible
          >
            <Sidebar collapsed={collapsed} />
          </Sider>

          <Layout style={{ marginLeft: contentMargin, transition: "margin-left 0.2s" }}>
            <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="mr-4"
              />
              <span className="font-inter text-sm text-gray-600">
                {isMobile ? "Mobile View" : collapsed ? "Collapsed View" : "Expanded View"}
              </span>
            </div>

            <Content className="p-4 sm:p-6 overflow-auto">
              <div className="max-w-7xl mx-auto">{children}</div>
            </Content>
          </Layout>
        </Layout>
      </div>
    </ProtectedRoute>
  )
}
