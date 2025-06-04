"use client";

import { useEffect } from "react";
import { Badge, Tooltip } from "antd";
import { WifiOutlined } from "@ant-design/icons";
import { useWebSocketStore } from "@/store/useWebSocketStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function ConnectionStatus() {
  const { connectionStatus, connect, disconnect, lastError } =
    useWebSocketStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      connect(user.id);
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isAuthenticated, user, connect, disconnect]);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "#52c41a";
      case "connecting":
        return "#faad14";
      case "error":
        return "#ff4d4f";
      default:
        return "#d9d9d9";
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected - Real-time updates active";
      case "connecting":
        return "Connecting to notification service...";
      case "error":
        return `Connection error: ${lastError || "Unknown error"}`;
      default:
        return "Disconnected - No real-time updates";
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Tooltip title={getStatusText()}>
      <Badge color={getStatusColor()} className="cursor-help">
        <WifiOutlined
          className="text-gray-500 text-sm"
          style={{
            color: connectionStatus === "connected" ? "#52c41a" : "#d9d9d9",
          }}
        />
      </Badge>
    </Tooltip>
  );
}
