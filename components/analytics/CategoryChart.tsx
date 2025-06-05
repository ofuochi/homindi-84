import { Card } from "antd"
import { Pie } from "@ant-design/plots"
import type { CategorySales } from "@/lib/analytics/types"

interface CategoryChartProps {
  data: CategorySales[]
  loading?: boolean
}

export function CategoryChart({ data, loading }: CategoryChartProps) {
  const config = {
    data,
    angleField: "revenue",
    colorField: "category",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    tooltip: {
      formatter: (datum: CategorySales) => ({
        name: datum.category,
        value: `$${datum.revenue.toLocaleString()} (${datum.percentage}%)`,
      }),
    },
    interactions: [{ type: "element-active" }],
  }

  return (
    <Card title="Sales by Category" loading={loading}>
      <div style={{ height: 300 }}>
        <Pie {...config} />
      </div>
    </Card>
  )
}
