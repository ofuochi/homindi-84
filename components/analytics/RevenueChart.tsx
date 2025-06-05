import { Card } from "antd"
import { Line } from "@ant-design/plots"
import type { DailySales } from "@/lib/analytics/types"

interface RevenueChartProps {
  data: DailySales[]
  loading?: boolean
}

export function RevenueChart({ data, loading }: RevenueChartProps) {
  const config = {
    data,
    xField: "date",
    yField: "revenue",
    smooth: true,
    color: "#1890ff",
    point: {
      size: 4,
      shape: "circle",
    },
    tooltip: {
      formatter: (datum: DailySales) => ({
        name: "Revenue",
        value: `$${datum.revenue.toLocaleString()}`,
      }),
    },
    xAxis: {
      type: "time",
      tickCount: 7,
    },
    yAxis: {
      label: {
        formatter: (value: string) => `$${Number(value).toLocaleString()}`,
      },
    },
  }

  return (
    <Card title="Daily Revenue Trend" loading={loading}>
      <div style={{ height: 300 }}>
        <Line {...config} />
      </div>
    </Card>
  )
}
