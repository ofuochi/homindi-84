"use client";
import { Menu, Badge, Tooltip } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  HeartOutlined,
  CreditCardOutlined,
  SafetyOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useAuthStore } from "@/store/useAuthStore";
import { getRoleInfo } from "@/lib/auth/roles";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const { unreadCount } = useNotificationStore();
  const { user } = useAuthStore();

  const roleInfo = user ? getRoleInfo(user.role) : null;

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: collapsed ? null : <Link href="/dashboard">Dashboard</Link>,
      title: "Dashboard",
    },
    {
      key: "/dashboard/orders",
      icon: <ShoppingOutlined />,
      label: collapsed ? null : <Link href="/dashboard/orders">My Orders</Link>,
      title: "My Orders",
    },
    {
      key: "/dashboard/wishlist",
      icon: <HeartOutlined />,
      label: collapsed ? null : (
        <Link href="/dashboard/wishlist">Wishlist</Link>
      ),
      title: "Wishlist",
    },
    {
      key: "/dashboard/notifications",
      icon: (
        <Badge
          dot={unreadCount > 0}
          size="small"
          offset={collapsed ? [0, 10] : [100, 0]}
        >
          <BellOutlined />
        </Badge>
      ),
      label: collapsed ? null : (
        <Link href="/dashboard/notifications">Notifications</Link>
      ),
      title: "Notifications",
    },
    {
      type: "divider",
    },
    {
      key: "account",
      label: collapsed ? null : "Account",
      type: "group",
      children: [
        {
          key: "/dashboard/settings",
          icon: <UserOutlined />,
          label: collapsed ? null : (
            <Link href="/dashboard/settings">Profile Settings</Link>
          ),
          title: "Profile Settings",
        },
        {
          key: "/dashboard/settings/notifications",
          icon: <SettingOutlined />,
          label: collapsed ? null : (
            <Link href="/dashboard/settings/notifications">
              Notification Settings
            </Link>
          ),
          title: "Notification Settings",
        },
        {
          key: "/dashboard/settings/privacy",
          icon: <SafetyOutlined />,
          label: collapsed ? null : (
            <Link href="/dashboard/settings/privacy">Privacy & Security</Link>
          ),
          title: "Privacy & Security",
        },
        {
          key: "/dashboard/settings/billing",
          icon: <CreditCardOutlined />,
          label: collapsed ? null : (
            <Link href="/dashboard/settings/billing">Billing & Payment</Link>
          ),
          title: "Billing & Payment",
        },
      ],
    },
    {
      type: "divider",
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

  const renderMenuItem = (item: any) => {
    if (collapsed && item.title) {
      return {
        ...item,
        label: (
          <Tooltip title={item.title} placement="right">
            <Link href={item.key}>{item.title}</Link>
          </Tooltip>
        ),
      };
    }
    return item;
  };

  const processedItems = menuItems.map(renderMenuItem);

  return (
    <div className="h-full flex flex-col">
      {!collapsed && (
        <div className="p-4 pb-3 border-r border-gray-200">
          <Link className="flex items-center space-x-3" href="/">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0B8457] to-[#0a7249] rounded-xl flex items-center justify-center shadow-lg">
              <Image
                src="/logo.png"
                alt="Homindi Logo"
                width={100}
                height={100}
                className="object-contain"
              />{" "}
            </div>
            <div>
              <span className="font-bold text-gray-900 font-poppins text-lg">
                Homindi
              </span>
            </div>
          </Link>
        </div>
      )}

      {collapsed && (
        <div className="p-4 pb-3 border-r border-gray-200 flex justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0B8457] to-[#0a7249] rounded-xl flex items-center justify-center shadow-lg">
            <Image
              src="/logo.png"
              alt="Homindi Logo"
              width={100}
              height={100}
              className="object-contain"
            />{" "}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={processedItems}
          className="border-0 bg-transparent"
          style={{
            backgroundColor: "transparent",
            border: "none",
          }}
          inlineCollapsed={collapsed}
        />
      </div>
    </div>
  );
}
