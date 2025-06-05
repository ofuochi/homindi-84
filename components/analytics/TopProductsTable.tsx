import { Card, Table, Tag } from "antd"
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons"
import type { TopProduct } from "@/lib/analytics/types"

interface TopProductsTableProps {
  data: TopProduct[]
  loading?: boolean
}

export function TopProductsTable({ data, loading }: TopProductsTableProps) {
  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <span className="font-medium">{name}</span>,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue: number) => `$${revenue.toLocaleString()}`,
      sorter: (a: TopProduct, b: TopProduct) => a.revenue - b.revenue,
    },
    {
      title: "Quantity Sold",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number) => quantity.toLocaleString(),
      sorter: (a: TopProduct, b: TopProduct) => a.quantity - b.quantity,
    },
    {
      title: "Growth",
      dataIndex: "growth",
      key: "growth",
      render: (growth: number) => (
        <Tag color={growth > 0 ? "green" : "red"} icon={growth > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}>
          {growth}%
        </Tag>
      ),
      sorter: (a: TopProduct, b: TopProduct) => a.growth - b.growth,
    },
  ]

  return (
    <Card title="Top Performing Products" loading={loading}>
      <Table columns={columns} dataSource={data} rowKey="id" pagination={false} size="small" />
    </Card>
  )
}
