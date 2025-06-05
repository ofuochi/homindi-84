import type {
  AnalyticsOverview,
  SalesMetrics,
  CustomerAnalytics,
  PerformanceMetrics,
  DailySales,
  MonthlySales,
  TopProduct,
  CategorySales,
  RegionSales,
  PaymentMethodStats,
  OrderStatusStats,
  CustomerGrowth,
  RetentionData,
  TopCustomer,
  PageStats,
  TrafficSource,
} from "./types"

export const mockAnalyticsOverview: AnalyticsOverview = {
  totalRevenue: 245680.5,
  totalOrders: 1847,
  totalCustomers: 892,
  averageOrderValue: 133.12,
  revenueGrowth: 18.5,
  orderGrowth: 12.3,
  customerGrowth: 8.7,
  conversionRate: 3.2,
}

export const mockDailySales: DailySales[] = [
  { date: "2024-01-01", revenue: 2450.0, orders: 18, customers: 15 },
  { date: "2024-01-02", revenue: 3200.5, orders: 24, customers: 20 },
  { date: "2024-01-03", revenue: 2890.75, orders: 22, customers: 18 },
  { date: "2024-01-04", revenue: 4100.25, orders: 31, customers: 26 },
  { date: "2024-01-05", revenue: 3750.0, orders: 28, customers: 23 },
  { date: "2024-01-06", revenue: 2980.5, orders: 23, customers: 19 },
  { date: "2024-01-07", revenue: 3450.75, orders: 26, customers: 21 },
  { date: "2024-01-08", revenue: 4200.0, orders: 32, customers: 27 },
  { date: "2024-01-09", revenue: 3890.25, orders: 29, customers: 24 },
  { date: "2024-01-10", revenue: 3650.5, orders: 27, customers: 22 },
  { date: "2024-01-11", revenue: 4500.75, orders: 34, customers: 28 },
  { date: "2024-01-12", revenue: 3980.0, orders: 30, customers: 25 },
  { date: "2024-01-13", revenue: 3250.25, orders: 25, customers: 20 },
  { date: "2024-01-14", revenue: 4750.5, orders: 36, customers: 30 },
]

export const mockMonthlySales: MonthlySales[] = [
  { month: "Jan 2024", revenue: 89450.0, orders: 672, growth: 15.2 },
  { month: "Feb 2024", revenue: 92380.5, orders: 698, growth: 3.3 },
  { month: "Mar 2024", revenue: 87920.25, orders: 651, growth: -4.8 },
  { month: "Apr 2024", revenue: 95670.75, orders: 724, growth: 8.8 },
  { month: "May 2024", revenue: 102450.0, orders: 789, growth: 7.1 },
  { month: "Jun 2024", revenue: 98230.5, orders: 745, growth: -4.1 },
  { month: "Jul 2024", revenue: 105890.25, orders: 812, growth: 7.8 },
  { month: "Aug 2024", revenue: 108750.0, orders: 834, growth: 2.7 },
  { month: "Sep 2024", revenue: 112340.75, orders: 867, growth: 3.3 },
  { month: "Oct 2024", revenue: 118920.5, orders: 923, growth: 5.9 },
  { month: "Nov 2024", revenue: 125680.25, orders: 978, growth: 5.7 },
  { month: "Dec 2024", revenue: 134570.0, orders: 1045, growth: 7.1 },
]

export const mockTopProducts: TopProduct[] = [
  { id: "1", name: "Premium Palm Oil", revenue: 45230.5, quantity: 1742, growth: 23.5 },
  { id: "2", name: "Dried Stockfish (Okporoko)", revenue: 38920.75, quantity: 865, growth: 18.2 },
  { id: "3", name: "Egusi Seeds (Ground)", revenue: 32450.25, quantity: 1754, growth: 15.7 },
  { id: "4", name: "Plantain Flour", revenue: 28670.0, quantity: 1303, growth: 12.3 },
  { id: "5", name: "Bitter Kola (Garcinia)", revenue: 24890.5, quantity: 711, growth: 9.8 },
  { id: "6", name: "Scotch Bonnet Pepper", revenue: 18750.25, quantity: 1442, growth: 7.2 },
]

export const mockCategorySales: CategorySales[] = [
  { category: "Palm Products", revenue: 78450.5, percentage: 31.9, orders: 542 },
  { category: "Spices & Seasonings", revenue: 65230.75, percentage: 26.6, orders: 489 },
  { category: "Dried Fish & Meat", revenue: 52890.25, percentage: 21.5, orders: 367 },
  { category: "Grains & Cereals", revenue: 34670.0, percentage: 14.1, orders: 298 },
  { category: "Snacks & Sweets", revenue: 14439.0, percentage: 5.9, orders: 151 },
]

export const mockRegionSales: RegionSales[] = [
  { region: "North America", revenue: 142350.75, orders: 1089, customers: 523 },
  { region: "Europe", revenue: 67890.5, orders: 512, customers: 245 },
  { region: "Africa", revenue: 23450.25, orders: 178, customers: 89 },
  { region: "Asia", revenue: 8920.0, orders: 68, customers: 35 },
  { region: "Others", revenue: 3069.0, orders: 23, customers: 12 },
]

export const mockPaymentMethods: PaymentMethodStats[] = [
  { method: "Credit Card", count: 1245, percentage: 67.4, revenue: 165420.5 },
  { method: "Debit Card", count: 389, percentage: 21.1, revenue: 51890.25 },
  { method: "PayPal", count: 156, percentage: 8.4, revenue: 20670.75 },
  { method: "Bank Transfer", count: 42, percentage: 2.3, revenue: 5890.0 },
  { method: "Apple Pay", count: 15, percentage: 0.8, revenue: 1809.0 },
]

export const mockOrderStatuses: OrderStatusStats[] = [
  { status: "Delivered", count: 1456, percentage: 78.8 },
  { status: "Shipped", count: 234, percentage: 12.7 },
  { status: "Processing", count: 89, percentage: 4.8 },
  { status: "Pending", count: 45, percentage: 2.4 },
  { status: "Cancelled", count: 23, percentage: 1.2 },
]

export const mockCustomerGrowth: CustomerGrowth[] = [
  { date: "2024-01-01", newCustomers: 12, returningCustomers: 45 },
  { date: "2024-01-02", newCustomers: 18, returningCustomers: 52 },
  { date: "2024-01-03", newCustomers: 15, returningCustomers: 48 },
  { date: "2024-01-04", newCustomers: 22, returningCustomers: 58 },
  { date: "2024-01-05", newCustomers: 19, returningCustomers: 54 },
  { date: "2024-01-06", newCustomers: 16, returningCustomers: 49 },
  { date: "2024-01-07", newCustomers: 21, returningCustomers: 56 },
]

export const mockRetentionData: RetentionData[] = [
  { cohort: "Jan 2024", month1: 85.2, month3: 72.4, month6: 58.9, month12: 45.3 },
  { cohort: "Feb 2024", month1: 87.1, month3: 74.2, month6: 61.5, month12: 0 },
  { cohort: "Mar 2024", month1: 83.9, month3: 70.8, month6: 57.2, month12: 0 },
  { cohort: "Apr 2024", month1: 89.3, month3: 76.1, month6: 0, month12: 0 },
  { cohort: "May 2024", month1: 86.7, month3: 73.5, month6: 0, month12: 0 },
  { cohort: "Jun 2024", month1: 88.2, month3: 0, month6: 0, month12: 0 },
]

export const mockTopCustomers: TopCustomer[] = [
  {
    id: "cust-1",
    name: "John Adebayo",
    email: "john@example.com",
    totalSpent: 2450.75,
    orderCount: 18,
    lastOrder: "2024-01-10",
  },
  {
    id: "cust-2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    totalSpent: 2180.5,
    orderCount: 16,
    lastOrder: "2024-01-09",
  },
  {
    id: "cust-3",
    name: "Michael Chen",
    email: "michael@example.com",
    totalSpent: 1950.25,
    orderCount: 14,
    lastOrder: "2024-01-08",
  },
  {
    id: "cust-4",
    name: "Emma Williams",
    email: "emma@example.com",
    totalSpent: 1780.0,
    orderCount: 13,
    lastOrder: "2024-01-07",
  },
  {
    id: "cust-5",
    name: "David Brown",
    email: "david@example.com",
    totalSpent: 1650.75,
    orderCount: 12,
    lastOrder: "2024-01-06",
  },
]

export const mockPageStats: PageStats[] = [
  { page: "/products", views: 15420, uniqueViews: 12340, bounceRate: 32.5 },
  { page: "/", views: 12890, uniqueViews: 10670, bounceRate: 28.9 },
  { page: "/cart", views: 8950, uniqueViews: 7820, bounceRate: 45.2 },
  { page: "/checkout", views: 5670, uniqueViews: 5230, bounceRate: 15.8 },
  { page: "/about", views: 3450, uniqueViews: 3120, bounceRate: 52.1 },
]

export const mockTrafficSources: TrafficSource[] = [
  { source: "Organic Search", visitors: 8920, percentage: 45.2, conversionRate: 3.8 },
  { source: "Direct", visitors: 5670, percentage: 28.7, conversionRate: 4.2 },
  { source: "Social Media", visitors: 2890, percentage: 14.6, conversionRate: 2.1 },
  { source: "Email", visitors: 1450, percentage: 7.3, conversionRate: 6.5 },
  { source: "Paid Ads", visitors: 840, percentage: 4.2, conversionRate: 5.2 },
]

export const mockSalesMetrics: SalesMetrics = {
  dailySales: mockDailySales,
  monthlySales: mockMonthlySales,
  topProducts: mockTopProducts,
  salesByCategory: mockCategorySales,
  salesByRegion: mockRegionSales,
  paymentMethods: mockPaymentMethods,
  orderStatuses: mockOrderStatuses,
}

export const mockCustomerAnalytics: CustomerAnalytics = {
  newCustomers: mockCustomerGrowth,
  customerRetention: mockRetentionData,
  customerLifetimeValue: 275.5,
  averageOrdersPerCustomer: 2.1,
  topCustomers: mockTopCustomers,
}

export const mockPerformanceMetrics: PerformanceMetrics = {
  pageViews: 46380,
  uniqueVisitors: 19750,
  bounceRate: 34.2,
  averageSessionDuration: 4.5,
  topPages: mockPageStats,
  trafficSources: mockTrafficSources,
}
