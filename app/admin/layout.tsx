"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Header from "@/components/layout/Header";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const { Content, Sider } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-collapse on mobile for better UX
      if (mobile && !collapsed) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [collapsed]);

  const siderWidth = collapsed ? (isMobile ? 0 : 80) : 256;

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>

        {/* Main Layout */}
        <Layout className="min-h-screen pt-16">
          {/* Sidebar */}
          <Sider
            width={256}
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            className="bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out"
            style={{
              position: "fixed",
              height: "calc(100vh - 64px)",
              left: 0,
              top: 64,
              zIndex: 40,
              overflow: "hidden",
            }}
            trigger={null}
            collapsible
          >
            <AdminSidebar collapsed={collapsed} />
          </Sider>

          {/* Content Area */}
          <Layout
            style={{
              marginLeft: siderWidth,
              transition: "margin-left 0.3s ease-in-out",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {/* Sub Header with Toggle */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-16 z-30 shadow-sm">
              <div className="flex items-center space-x-4">
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 transition-colors"
                  size="small"
                />
                <div className="hidden sm:block">
                  <span className="font-poppins font-semibold text-gray-900">
                    Admin Dashboard
                  </span>
                  <p className="font-inter text-xs text-gray-500 mt-0.5">
                    Manage your Homindi platform
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="hidden md:flex items-center space-x-2 text-xs text-gray-500 font-inter">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      isMobile
                        ? "bg-orange-100 text-orange-800"
                        : collapsed
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {isMobile ? "Mobile" : collapsed ? "Compact" : "Full"}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <Content className="p-4 sm:p-6 overflow-auto bg-gray-50">
              <div className="max-w-7xl mx-auto">{children}</div>
            </Content>
          </Layout>
        </Layout>

        {/* Mobile Overlay */}
        {isMobile && !collapsed && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
            onClick={() => setCollapsed(true)}
            style={{ top: 64 }}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
