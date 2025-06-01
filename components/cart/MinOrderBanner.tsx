import { Alert } from "antd"
import { formatCurrency } from "@/lib/utils"
import { MINIMUM_ORDER_AMOUNT } from "@/lib/constants"

interface MinOrderBannerProps {
  currentTotal: number
}

export default function MinOrderBanner({ currentTotal }: MinOrderBannerProps) {
  const remaining = MINIMUM_ORDER_AMOUNT - currentTotal

  return (
    <Alert
      message="Minimum Order Required"
      description={`Add ${formatCurrency(remaining)} more to reach the minimum order of ${formatCurrency(MINIMUM_ORDER_AMOUNT)}`}
      type="warning"
      showIcon
      className="mb-4"
    />
  )
}
