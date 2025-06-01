import { Tag } from "antd"
import { ORDER_STATUSES } from "@/lib/constants"

interface OrderStatusBadgeProps {
  status: string
  size?: "small" | "default"
}

export default function OrderStatusBadge({ status, size = "default" }: OrderStatusBadgeProps) {
  const statusConfig = ORDER_STATUSES.find((s) => s.value === status)

  return (
    <Tag color={statusConfig?.color || "default"} size={size}>
      {statusConfig?.label || status.charAt(0).toUpperCase() + status.slice(1)}
    </Tag>
  )
}
