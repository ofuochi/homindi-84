import axios, { type AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  mockProducts,
  mockCategories,
  mockOrders,
  mockUsers,
  mockEnhancedAdminStats,
  mockInventoryLogs,
} from "@/lib/mockDb";

// Create axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Simulate delay for all requests
axiosInstance.interceptors.request.use(async (config) => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000 + 500),
  );
  return config;
});

// Setup mock adapter so calls return faker data until backend is ready
const mock = new MockAdapter(axiosInstance, { delayResponse: 0 });

// Products
mock.onGet("/products").reply((config) => {
  const page = Number(config.params?.page || 1);
  const limit = Number(config.params?.limit || 10);
  const category = config.params?.category as string | undefined;
  const search = (config.params?.search as string | undefined)?.toLowerCase();
  const stockStatus = config.params?.stockStatus as string | undefined;

  let filtered = [...mockProducts];
  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search),
    );
  }
  if (stockStatus) {
    if (stockStatus === "low") {
      filtered = filtered.filter(
        (p) => p.stockQuantity <= 10 && p.stockQuantity > 0,
      );
    } else if (stockStatus === "out") {
      filtered = filtered.filter((p) => p.stockQuantity === 0);
    } else if (stockStatus === "in") {
      filtered = filtered.filter((p) => p.stockQuantity > 10);
    }
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const items = filtered.slice(start, end);
  return [
    200,
    {
      success: true,
      data: {
        items,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      },
    },
  ];
});

mock.onPost("/products").reply((config) => {
  const body = JSON.parse(config.data || "{}");
  const newProduct = {
    id: `product-${Date.now()}`,
    ...body,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProducts.push(newProduct);
  return [
    200,
    {
      success: true,
      data: newProduct,
      message: "Product created successfully",
    },
  ];
});

mock.onGet(/\/products\/[^/]+$/).reply((config) => {
  const id = config.url!.split("/").pop()!;
  const product = mockProducts.find((p) => p.id === id);
  if (!product) return [404, { success: false, error: "Not found" }];
  return [200, { success: true, data: product }];
});

mock.onPut(/\/products\/[^/]+$/).reply((config) => {
  const id = config.url!.split("/").pop()!;
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) return [404, { success: false, error: "Not found" }];
  const body = JSON.parse(config.data || "{}");
  mockProducts[index] = {
    ...mockProducts[index],
    ...body,
    updatedAt: new Date().toISOString(),
  };
  return [
    200,
    {
      success: true,
      data: mockProducts[index],
      message: "Product updated successfully",
    },
  ];
});

mock.onDelete(/\/products\/[^/]+$/).reply((config) => {
  const id = config.url!.split("/").pop()!;
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) return [404, { success: false, error: "Not found" }];
  const [deleted] = mockProducts.splice(index, 1);
  return [
    200,
    { success: true, data: deleted, message: "Product deleted successfully" },
  ];
});

// Categories
mock.onGet("/categories").reply((config) => {
  const page = Number(config.params?.page || 1);
  const limit = Number(config.params?.limit || 10);
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = mockCategories.slice(start, end);
  return [
    200,
    {
      success: true,
      data: {
        items,
        total: mockCategories.length,
        page,
        limit,
        totalPages: Math.ceil(mockCategories.length / limit),
      },
    },
  ];
});

mock.onPost("/categories").reply((config) => {
  const body = JSON.parse(config.data || "{}");
  const newCategory = {
    id: `cat-${Date.now()}`,
    ...body,
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockCategories.push(newCategory);
  return [
    200,
    {
      success: true,
      data: newCategory,
      message: "Category created successfully",
    },
  ];
});

mock.onGet(/\/categories\/[^/]+$/).reply((config) => {
  const id = config.url!.split("/").pop()!;
  const category = mockCategories.find((c) => c.id === id);
  if (!category) return [404, { success: false, error: "Not found" }];
  return [200, { success: true, data: category }];
});

mock.onPut(/\/categories\/[^/]+$/).reply((config) => {
  const id = config.url!.split("/").pop()!;
  const index = mockCategories.findIndex((c) => c.id === id);
  if (index === -1) return [404, { success: false, error: "Not found" }];
  const body = JSON.parse(config.data || "{}");
  mockCategories[index] = {
    ...mockCategories[index],
    ...body,
    updatedAt: new Date().toISOString(),
  };
  return [
    200,
    {
      success: true,
      data: mockCategories[index],
      message: "Category updated successfully",
    },
  ];
});

mock.onDelete(/\/categories\/[^/]+$/).reply((config) => {
  const id = config.url!.split("/").pop()!;
  const index = mockCategories.findIndex((c) => c.id === id);
  if (index === -1) return [404, { success: false, error: "Not found" }];
  const [deleted] = mockCategories.splice(index, 1);
  return [
    200,
    { success: true, data: deleted, message: "Category deleted successfully" },
  ];
});

// Orders
mock.onGet("/orders").reply((config) => {
  const page = Number(config.params?.page || 1);
  const limit = Number(config.params?.limit || 10);
  const status = config.params?.status as string | undefined;

  let filtered = [...mockOrders];
  if (status && status !== "all") {
    filtered = filtered.filter((o) => o.status === status);
  }
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = filtered.slice(start, end);
  return [
    200,
    {
      success: true,
      data: {
        items,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      },
    },
  ];
});

mock.onGet(/\/orders\/[^/]+$/).reply((config) => {
  const id = config.url!.split("/").pop()!;
  const order = mockOrders.find((o) => o.id === id);
  if (!order) return [404, { success: false, error: "Not found" }];
  return [200, { success: true, data: order }];
});

mock.onPut(/\/orders\/[^/]+\/status$/).reply((config) => {
  const id = config.url!.split("/")[2];
  const order = mockOrders.find((o) => o.id === id);
  if (!order) return [404, { success: false, error: "Not found" }];
  const body = JSON.parse(config.data || "{}");
  Object.assign(order, body);
  return [
    200,
    {
      success: true,
      data: order,
      message: "Order status updated successfully",
    },
  ];
});

// Inventory
mock.onGet("/inventory/logs").reply((config) => {
  const page = Number(config.params?.page || 1);
  const limit = Number(config.params?.limit || 10);
  const productId = config.params?.productId as string | undefined;

  let filtered = [...mockInventoryLogs];
  if (productId) {
    filtered = filtered.filter((log) => log.productId === productId);
  }
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = filtered.slice(start, end);
  return [
    200,
    {
      success: true,
      data: {
        items,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      },
    },
  ];
});

mock.onPost("/inventory/adjust").reply((config) => {
  const body = JSON.parse(config.data || "{}");
  const newLog = {
    id: `log-${Date.now()}`,
    ...body,
    previousStock: 50,
    newStock: 50 + body.quantity,
    userId: "admin-1",
    createdAt: new Date().toISOString(),
  };
  mockInventoryLogs.push(newLog);
  return [
    200,
    {
      success: true,
      data: newLog,
      message: "Stock adjustment completed successfully",
    },
  ];
});

// Users
mock.onGet("/users").reply((config) => {
  const page = Number(config.params?.page || 1);
  const limit = Number(config.params?.limit || 10);
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = mockUsers.slice(start, end);
  return [
    200,
    {
      success: true,
      data: {
        items,
        total: mockUsers.length,
        page,
        limit,
        totalPages: Math.ceil(mockUsers.length / limit),
      },
    },
  ];
});

// Admin stats
mock.onGet("/admin/stats").reply(() => {
  return [200, { success: true, data: mockEnhancedAdminStats }];
});

// Payments
mock.onPost("/payments/create-payment-intent").reply((config) => {
  const body = JSON.parse(config.data || "{}");
  const paymentIntent = {
    id: `pi_${Date.now()}`,
    client_secret: `pi_${Date.now()}_secret_mock`,
    amount: body.amount,
    currency: body.currency,
    status: "requires_payment_method",
  };
  return [
    200,
    {
      success: true,
      data: { paymentIntent, clientSecret: paymentIntent.client_secret },
    },
  ];
});

mock.onPost("/payments/confirm-payment").reply((config) => {
  const body = JSON.parse(config.data || "{}");
  return [
    200,
    {
      success: true,
      data: {
        paymentIntent: { id: body.paymentIntentId, status: "succeeded" },
      },
    },
  ];
});

mock.onGet(/\/payments\/payment-record\/[^/]+$/).reply((config) => {
  const id = config.url!.split("/").pop()!;
  return [
    200,
    { success: true, data: { id, status: "succeeded", amount: 100 } },
  ];
});

mock.onPost("/payments/refund").reply(() => {
  return [
    200,
    {
      success: true,
      data: { refundId: `re_${Date.now()}`, status: "succeeded" },
    },
  ];
});

// Analytics
mock.onGet("/analytics/overview").reply(() => {
  return [200, { success: true, data: mockEnhancedAdminStats }];
});
mock.onGet("/analytics/sales").reply(() => {
  return [200, { success: true, data: { revenue: 1000 } }];
});
mock.onGet("/analytics/customers").reply(() => {
  return [200, { success: true, data: { total: 50 } }];
});
mock.onGet("/analytics/performance").reply(() => {
  return [200, { success: true, data: { pageViews: 100 } }];
});

export default axiosInstance;
