"use client";

import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Tag,
  DatePicker,
  Select,
  Statistic,
  Spin,
} from "antd";
import { Column, Pie } from "@ant-design/plots";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { analyticsApi } from "@/lib/analytics/api";
import type {
  SalesMetrics,
  MonthlySales,
  PaymentMethodStats,
  RegionSales,
} from "@/lib/analytics/types";
import { TrendingUpIcon } from "lucide-react";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function SalesAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [salesMetrics, setSalesMetrics] = useState<SalesMetrics | null>(null);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<"revenue" | "orders">(
    "revenue"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await analyticsApi.getSalesMetrics(
          dateRange ? { start: dateRange[0], end: dateRange[1] } : undefined
        );
        setSalesMetrics(data);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const monthlyRevenueConfig = {
    data: salesMetrics?.monthlySales || [],
    xField: "month",
    yField: selectedMetric,
    color: "#1890ff",
    columnWidthRatio: 0.6,
    tooltip: {
      formatter: (datum: MonthlySales) => ({
        name: selectedMetric === "revenue" ? "Revenue" : "Orders",
        value:
          selectedMetric === "revenue"
            ? `$${datum.revenue.toLocaleString()}`
            : datum.orders.toLocaleString(),
      }),
    },
    yAxis: {
      label: {
        formatter: (value: string) =>
          selectedMetric === "revenue"
            ? `$${Number(value).toLocaleString()}`
            : value,
      },
    },
  };

  const paymentMethodsConfig = {
    data: salesMetrics?.paymentMethods || [],
    angleField: "revenue",
    colorField: "method",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    tooltip: {
      formatter: (datum: PaymentMethodStats) => ({
        name: datum.method,
        value: `$${datum.revenue.toLocaleString()} (${
          datum.count
        } transactions)`,
      }),
    },
  };

  const regionSalesColumns = [
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      render: (region: string) => <span className="font-medium">{region}</span>,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue: number) => `$${revenue.toLocaleString()}`,
      sorter: (a: RegionSales, b: RegionSales) => a.revenue - b.revenue,
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
      render: (orders: number) => orders.toLocaleString(),
      sorter: (a: RegionSales, b: RegionSales) => a.orders - b.orders,
    },
    {
      title: "Customers",
      dataIndex: "customers",
      key: "customers",
      render: (customers: number) => customers.toLocaleString(),
      sorter: (a: RegionSales, b: RegionSales) => a.customers - b.customers,
    },
    {
      title: "Avg. Order Value",
      key: "aov",
      render: (record: RegionSales) =>
        `$${(record.revenue / record.orders).toFixed(2)}`,
    },
  ];

  const paymentMethodColumns = [
    {
      title: "Payment Method",
      dataIndex: "method",
      key: "method",
      render: (method: string) => (
        <div className="flex items-center space-x-2">
          <CreditCardOutlined />
          <span className="font-medium">{method}</span>
        </div>
      ),
    },
    {
      title: "Transactions",
      dataIndex: "count",
      key: "count",
      render: (count: number) => count.toLocaleString(),
      sorter: (a: PaymentMethodStats, b: PaymentMethodStats) =>
        a.count - b.count,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue: number) => `$${revenue.toLocaleString()}`,
      sorter: (a: PaymentMethodStats, b: PaymentMethodStats) =>
        a.revenue - b.revenue,
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage: number) => <Tag color="blue">{percentage}%</Tag>,
    },
    {
      title: "Avg. Transaction",
      key: "avgTransaction",
      render: (record: PaymentMethodStats) =>
        `$${(record.revenue / record.count).toFixed(2)}`,
    },
  ];

  const totalRevenue =
    salesMetrics?.monthlySales.reduce((sum, month) => sum + month.revenue, 0) ||
    0;
  const totalOrders =
    salesMetrics?.monthlySales.reduce((sum, month) => sum + month.orders, 0) ||
    0;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sales Analytics</h1>
        <div className="flex space-x-4">
          <RangePicker
            onChange={(dates) => {
              if (dates) {
                setDateRange([
                  dates[0]!.format("YYYY-MM-DD"),
                  dates[1]!.format("YYYY-MM-DD"),
                ]);
              } else {
                setDateRange(null);
              }
            }}
          />
          <Select
            value={selectedMetric}
            onChange={setSelectedMetric}
            style={{ width: 120 }}
          >
            <Option value="revenue">Revenue</Option>
            <Option value="orders">Orders</Option>
          </Select>
        </div>
      </div>

      {/* Key Sales Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              formatter={(value) => `$${Number(value).toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Orders"
              value={totalOrders}
              prefix={<ShoppingCartOutlined />}
              formatter={(value) => Number(value).toLocaleString()}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Average Order Value"
              value={averageOrderValue}
              prefix={<TrendingUpIcon />}
              formatter={(value) => `$${Number(value).toFixed(2)}`}
            />
          </Card>
        </Col>
      </Row>

      {/* Monthly Sales Trend */}
      <Card title="Monthly Sales Trend" loading={loading}>
        <div style={{ height: 400 }}>
          <Column {...monthlyRevenueConfig} />
        </div>
      </Card>

      <Row gutter={[16, 16]}>
        {/* Payment Methods Distribution */}
        <Col xs={24} lg={12}>
          <Card title="Payment Methods Distribution" loading={loading}>
            <div style={{ height: 300 }}>
              <Pie {...paymentMethodsConfig} />
            </div>
          </Card>
        </Col>

        {/* Sales by Category */}
        <Col xs={24} lg={12}>
          <Card title="Category Performance" loading={loading}>
            <div className="space-y-4">
              {salesMetrics?.salesByCategory.map((category) => (
                <div
                  key={category.category}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{category.category}</p>
                    <p className="text-sm text-gray-500">
                      {category.orders} orders
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      ${category.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {category.percentage}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Regional Sales Performance */}
      <Card title="Sales by Region" loading={loading}>
        <Table
          columns={regionSalesColumns}
          dataSource={salesMetrics?.salesByRegion || []}
          rowKey="region"
          pagination={false}
        />
      </Card>

      {/* Payment Methods Details */}
      <Card title="Payment Methods Analysis" loading={loading}>
        <Table
          columns={paymentMethodColumns}
          dataSource={salesMetrics?.paymentMethods || []}
          rowKey="method"
          pagination={false}
        />
      </Card>
    </div>
  );
}
