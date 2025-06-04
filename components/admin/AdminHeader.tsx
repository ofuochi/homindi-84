"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge, Drawer, Button, Avatar, Dropdown } from "antd";
import {
  BellOutlined,
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "@/store/useAuthStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { ROUTES } from "@/lib/routes";

export default function AdminHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider" as const,
    },
    {
      key: "user-dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">User Dashboard</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: logout,
    },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href={ROUTES.ADMIN} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg font-roboto">
                  DB
                </span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 font-roboto">
                  Homindi
                </span>
                <span className="text-sm text-primary-500 font-roboto ml-2 bg-green-100 px-2 py-1 rounded-full">
                  Admin
                </span>
              </div>
            </Link>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button
                type="text"
                icon={
                  <Badge count={unreadCount} size="small">
                    <BellOutlined className="text-xl text-gray-600 hover:text-primary-500 transition-colors" />
                  </Badge>
                }
                className="flex items-center"
              />

              {/* User Menu */}
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
              >
                <Button type="text" className="flex items-center space-x-2">
                  <Avatar
                    size="small"
                    icon={<UserOutlined />}
                    src={user?.avatar}
                  />
                  <span className="hidden md:inline font-roboto font-medium">
                    {user?.name}
                  </span>
                </Button>
              </Dropdown>

              {/* Mobile menu button */}
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <Drawer
        title={
          <span className="font-roboto font-semibold text-gray-900">
            Admin Menu
          </span>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
      >
        <div className="flex flex-col space-y-4">
          <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
            <Button type="default" block className="font-roboto">
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/orders" onClick={() => setMobileMenuOpen(false)}>
            <Button type="default" block className="font-roboto">
              Orders
            </Button>
          </Link>
          <Link href="/admin/products" onClick={() => setMobileMenuOpen(false)}>
            <Button type="default" block className="font-roboto">
              Products
            </Button>
          </Link>
          <Link href="/admin/users" onClick={() => setMobileMenuOpen(false)}>
            <Button type="default" block className="font-roboto">
              Users
            </Button>
          </Link>
          <div className="border-t pt-4">
            <Button
              block
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="font-roboto"
            >
              Logout
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
