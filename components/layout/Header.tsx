"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge, Drawer, Button, Space, Avatar, Dropdown } from "antd";
import {
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  CrownOutlined,
  SafetyOutlined,
  TruckOutlined,
  ShopOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { SignOutButton } from "@clerk/nextjs";
import { useCartStore } from "@/store/useCartStore";
import { useClerkAuth } from "@/lib/hooks/useClerkAuth";
import CartDrawer from "@/components/cart/CartDrawer";
import NotificationBell from "@/components/notifications/NotificationBell";
import ConnectionStatus from "@/components/notifications/ConnectionStatus";
import Image from "next/image";

const roleIcons = {
  god: CrownOutlined,
  admin: SafetyOutlined,
  exporter: TruckOutlined,
  supplier: ShopOutlined,
  moderator: FlagOutlined,
  user: UserOutlined,
};

export const HeaderActions = ({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen?: (open: boolean) => void;
}) => {
  const { user, isSignedIn, userRole, roleInfo, canAccessAdminPanel } =
    useClerkAuth();
  const { getItemCount, setIsOpen } = useCartStore();

  const RoleIcon = roleIcons[userRole] || UserOutlined;
  const userName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      user.username ||
      "User"
    : "User";

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    ...(canAccessAdminPanel()
      ? [
          {
            key: "admin",
            icon: <DashboardOutlined />,
            label: <Link href="/admin">Admin Panel</Link>,
          },
        ]
      : []),
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: <Link href="/dashboard/settings">Settings</Link>,
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <SignOutButton>
          <span>Logout</span>
        </SignOutButton>
      ),
    },
  ];

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {isSignedIn && (
        <>
          <ConnectionStatus />
          <NotificationBell />
        </>
      )}

      {/* Cart */}
      <Button
        type="text"
        icon={
          <Badge count={getItemCount()} size="small">
            <ShoppingCartOutlined className="text-xl text-gray-600 hover:text-[#0B8457] transition-colors" />
          </Badge>
        }
        onClick={() => setIsOpen(true)}
        className="flex items-center"
      />

      {/* Auth */}
      <div className="hidden md:flex items-center space-x-2">
        {isSignedIn ? (
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <Button type="text" className="flex items-center space-x-2 px-3">
              <Avatar
                size="small"
                icon={<RoleIcon />}
                src={user?.imageUrl}
                style={{
                  backgroundColor:
                    roleInfo?.color === "default" ? "#1890ff" : undefined,
                }}
              />
              <div className="text-left hidden lg:block">
                <div className="font-inter font-medium text-sm">{userName}</div>
                <div className="font-inter text-xs text-gray-500">
                  {roleInfo?.name}
                </div>
              </div>
            </Button>
          </Dropdown>
        ) : (
          <Space>
            <Link href="/sign-in">
              <Button type="default" className="font-inter font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button type="primary" className="font-inter font-medium">
                Sign Up
              </Button>
            </Link>
          </Space>
        )}
      </div>

      {/* Mobile menu button */}
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setMobileMenuOpen?.(true)}
        className="md:hidden"
      />
    </div>
  );
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isSignedIn, userRole, roleInfo, canAccessAdminPanel } =
    useClerkAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const RoleIcon = roleIcons[userRole] || UserOutlined;
  const userName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User"
    : "User";

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#d4e0db] to-[#0a7249] rounded-xl flex items-center justify-center shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Homindi Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-900 font-poppins hidden sm:block">
                Homindi
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-[#0B8457] font-medium transition-colors font-inter"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <HeaderActions setMobileMenuOpen={setMobileMenuOpen} />
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <Drawer
        title={
          <span className="font-poppins font-semibold text-gray-900">Menu</span>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        className="mobile-menu-drawer"
      >
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-[#0B8457] font-medium py-2 font-inter transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t pt-4 space-y-3">
            {isSignedIn ? (
              <>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar
                    icon={<RoleIcon />}
                    src={user?.imageUrl}
                    style={{
                      backgroundColor:
                        roleInfo?.color === "default" ? "#1890ff" : undefined,
                    }}
                  />
                  <div>
                    <div className="font-inter font-medium">{userName}</div>
                    <div className="font-inter text-xs text-gray-500">
                      {roleInfo?.name}
                    </div>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    type="default"
                    block
                    icon={<UserOutlined />}
                    className="font-inter"
                  >
                    Dashboard
                  </Button>
                </Link>
                {canAccessAdminPanel() && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      type="default"
                      block
                      icon={<DashboardOutlined />}
                      className="font-inter"
                    >
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <SignOutButton>
                  <Button
                    block
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-inter"
                  >
                    Sign Out
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <>
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                  <Button type="default" block className="font-inter">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  <Button type="primary" block className="font-inter">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Drawer>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
