import { delay } from "@/lib/utils"
import type { AnalyticsOverview, SalesMetrics, CustomerAnalytics, PerformanceMetrics } from "./types"
import { mockAnalyticsOverview, mockSalesMetrics, mockCustomerAnalytics, mockPerformanceMetrics } from "./mockData"

class AnalyticsApiClient {
  async getOverview(): Promise<AnalyticsOverview> {
    await delay(500)
    return mockAnalyticsOverview
  }

  async getSalesMetrics(dateRange?: { start: string; end: string }): Promise<SalesMetrics> {
    await delay(800)
    return mockSalesMetrics
  }

  async getCustomerAnalytics(): Promise<CustomerAnalytics> {
    await delay(600)
    return mockCustomerAnalytics
  }

  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    await delay(700)
    return mockPerformanceMetrics
  }
}

export const analyticsApi = new AnalyticsApiClient()
