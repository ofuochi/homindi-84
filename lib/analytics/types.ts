export interface AnalyticsOverview {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  averageOrderValue: number
  revenueGrowth: number
  orderGrowth: number
  customerGrowth: number
  conversionRate: number
}

export interface SalesMetrics {
  dailySales: DailySales[]
  monthlySales: MonthlySales[]
  topProducts: TopProduct[]
  salesByCategory: CategorySales[]
  salesByRegion: RegionSales[]
  paymentMethods: PaymentMethodStats[]
  orderStatuses: OrderStatusStats[]
}

export interface DailySales {
  date: string
  revenue: number
  orders: number
  customers: number
}

export interface MonthlySales {
  month: string
  revenue: number
  orders: number
  growth: number
}

export interface TopProduct {
  id: string
  name: string
  revenue: number
  quantity: number
  growth: number
}

export interface CategorySales {
  category: string
  revenue: number
  percentage: number
  orders: number
}

export interface RegionSales {
  region: string
  revenue: number
  orders: number
  customers: number
}

export interface PaymentMethodStats {
  method: string
  count: number
  percentage: number
  revenue: number
}

export interface OrderStatusStats {
  status: string
  count: number
  percentage: number
}

export interface CustomerAnalytics {
  newCustomers: CustomerGrowth[]
  customerRetention: RetentionData[]
  customerLifetimeValue: number
  averageOrdersPerCustomer: number
  topCustomers: TopCustomer[]
}

export interface CustomerGrowth {
  date: string
  newCustomers: number
  returningCustomers: number
}

export interface RetentionData {
  cohort: string
  month1: number
  month3: number
  month6: number
  month12: number
}

export interface TopCustomer {
  id: string
  name: string
  email: string
  totalSpent: number
  orderCount: number
  lastOrder: string
}

export interface PerformanceMetrics {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  averageSessionDuration: number
  topPages: PageStats[]
  trafficSources: TrafficSource[]
}

export interface PageStats {
  page: string
  views: number
  uniqueViews: number
  bounceRate: number
}

export interface TrafficSource {
  source: string
  visitors: number
  percentage: number
  conversionRate: number
}
