"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { HeaderActions } from "@/components/layout/Header";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const { Content, Header, Sider } = Layout;

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
      {/* Main Layout */}
      <Layout className="min-h-screen">
        {/* Sidebar */}
        <Sider
          width={256}
          collapsedWidth={isMobile ? 0 : 80}
          collapsed={collapsed}
          className="bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out"
          style={{
            position: "fixed",
            height: "100vh",
            left: 0,
            zIndex: 10,
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
          }}
        >
          <Header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="flex justify-between items-center h-16">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="-ml-10"
              />

              {/* Right side actions */}
              <div className="sm:px-8">
                <HeaderActions />
              </div>
            </div>
          </Header>

          <Content className="p-4 sm:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">{children}</div>
          </Content>
        </Layout>
      </Layout>

      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setCollapsed(true)}
        />
      )}
    </ProtectedRoute>
  );
}
