import { Card } from "antd"
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons"

interface MetricCardProps {
  title: string
  value: string | number
  growth?: number
  prefix?: string
  suffix?: string
  loading?: boolean
}

export function MetricCard({ title, value, growth, prefix, suffix, loading }: MetricCardProps) {
  const formatValue = () => {
    if (typeof value === "number") {
      return `${prefix || ""}${value.toLocaleString()}${suffix || ""}`
    }
    return value
  }

  const getGrowthColor = () => {
    if (!growth) return "text-gray-500"
    return growth > 0 ? "text-green-600" : "text-red-600"
  }

  const getGrowthIcon = () => {
    if (!growth) return null
    return growth > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />
  }

  return (
    <Card loading={loading} className="h-full">
      <div className="space-y-2">
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{formatValue()}</p>
        {growth !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${getGrowthColor()}`}>
            {getGrowthIcon()}
            <span>{Math.abs(growth)}%</span>
            <span className="text-gray-500">vs last period</span>
          </div>
        )}
      </div>
    </Card>
  )
}
