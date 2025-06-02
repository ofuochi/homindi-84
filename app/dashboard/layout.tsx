"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { HeaderActions } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const { Content, Sider, Header } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const siderWidth = collapsed ? 80 : 256;
  const contentMargin = isMobile ? 0 : siderWidth;

  return (
    <ProtectedRoute>
      {/* <Header /> */}
      <Layout className="min-h-screen">
        <Sider
          width={256}
          collapsedWidth={isMobile ? 0 : 80}
          collapsed={collapsed}
          className="bg-white shadow-sm border-r border-gray-200 transition-all duration-200"
          style={{
            position: "fixed",
            height: "100vh",
            left: 0,
            top: 0,
            zIndex: 10,
          }}
          trigger={null}
          collapsible
        >
          <Sidebar collapsed={collapsed} />
        </Sider>

        <Layout
          style={{
            marginLeft: contentMargin,
            transition: "margin-left 0.2s",
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
    </ProtectedRoute>
  );
}
