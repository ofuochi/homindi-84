"use client";

import { Dropdown, Button } from "antd";
import { BulbOutlined, MoonOutlined, DesktopOutlined } from "@ant-design/icons";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme = "system", setTheme } = useTheme();

  const items = [
    { key: "light", label: "Light", icon: <BulbOutlined /> },
    { key: "dark", label: "Dark", icon: <MoonOutlined /> },
    { key: "system", label: "System", icon: <DesktopOutlined /> },
  ];

  const currentIcon =
    items.find((i) => i.key === theme)?.icon || <DesktopOutlined />;

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => setTheme(key),
      }}
      trigger={["click"]}
    >
      <Button type="text" icon={currentIcon} />
    </Dropdown>
  );
}
