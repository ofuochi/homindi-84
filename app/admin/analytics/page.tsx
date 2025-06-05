"use client"

import { useState, useEffect } from "react"
import { Row, Col, Card, Tabs, Spin } from "antd"
import { MetricCard } from "@/components/analytics/MetricCard"
import { RevenueChart } from "@/components/analytics/RevenueChart"
import { CategoryChart } from "@/components/analytics/CategoryChart"
import { TopProductsTable } from "@/components/analytics/TopProductsTable"
import { analyticsApi } from "@/lib/analytics/api"
import type { AnalyticsOverview, SalesMetrics, CustomerAnalytics, PerformanceMetrics } from "@/lib/analytics/types"

const { TabPane } = Tabs

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null)
  const [salesMetrics, setSalesMetrics] = useState<SalesMetrics | null>(null)
  const [customerAnalytics, setCustomerAnalytics] = useState<CustomerAnalytics | null>(null)
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [overviewData, salesData, customerData, performanceData] = await Promise.all([
          analyticsApi.getOverview(),
          analyticsApi.getSalesMetrics(),
          analyticsApi.getCustomerAnalytics(),
          analyticsApi.getPerformanceMetrics(),
        ])

        setOverview(overviewData)
        setSalesMetrics(salesData)
        setCustomerAnalytics(customerData)
        setPerformanceMetrics(performanceData)
      } catch (error) {
        console.error("Failed to fetch analytics data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Total Revenue"
            value={overview?.totalRevenue || 0}
            prefix="$"
            growth={overview?.revenueGrowth}
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Total Orders"
            value={overview?.totalOrders || 0}
            growth={overview?.orderGrowth}
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Total Customers"
            value={overview?.totalCustomers || 0}
            growth={overview?.customerGrowth}
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard title="Avg. Order Value" value={overview?.averageOrderValue || 0} prefix="$" loading={loading} />
        </Col>
      </Row>

      {/* Detailed Analytics Tabs */}
      <Card>
        <Tabs defaultActiveKey="sales" size="large">
          <TabPane tab="Sales Analytics" key="sales">
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={16}>
                <RevenueChart data={salesMetrics?.dailySales || []} loading={loading} />
              </Col>
              <Col xs={24} lg={8}>
                <CategoryChart data={salesMetrics?.salesByCategory || []} loading={loading} />
              </Col>
              <Col xs={24}>
                <TopProductsTable data={salesMetrics?.topProducts || []} loading={loading} />
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="Customer Analytics" key="customers">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <MetricCard
                  title="Customer Lifetime Value"
                  value={customerAnalytics?.customerLifetimeValue || 0}
                  prefix="$"
                  loading={loading}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <MetricCard
                  title="Avg. Orders per Customer"
                  value={customerAnalytics?.averageOrdersPerCustomer || 0}
                  loading={loading}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <MetricCard
                  title="Conversion Rate"
                  value={overview?.conversionRate || 0}
                  suffix="%"
                  loading={loading}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <MetricCard
                  title="New Customers Today"
                  value={customerAnalytics?.newCustomers[0]?.newCustomers || 0}
                  loading={loading}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="Performance" key="performance">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <MetricCard title="Page Views" value={performanceMetrics?.pageViews || 0} loading={loading} />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <MetricCard title="Unique Visitors" value={performanceMetrics?.uniqueVisitors || 0} loading={loading} />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <MetricCard
                  title="Bounce Rate"
                  value={performanceMetrics?.bounceRate || 0}
                  suffix="%"
                  loading={loading}
                />
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <MetricCard
                  title="Avg. Session Duration"
                  value={performanceMetrics?.averageSessionDuration || 0}
                  suffix=" min"
                  loading={loading}
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
}
