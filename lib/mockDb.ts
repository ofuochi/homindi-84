import { faker } from "@faker-js/faker";
import {
  generateMockProducts,
  generateMockOrders,
  generateMockUser,
  generateMockAdminStats,
  generateMockCategories,
  generateMockInventoryLogs,
} from "./mockData";
import type { User } from "./api/types";

export const mockProducts = generateMockProducts(20);
export const mockCategories = generateMockCategories(5);
export const mockOrders = generateMockOrders(mockProducts, "user-1", 10);
export const mockUser = generateMockUser("user-1");
export const mockAdminStats = generateMockAdminStats();
export const mockUsers: User[] = [
  { ...mockUser, role: "user" as const },
  { ...generateMockUser("admin-1"), role: "admin" as const },
  generateMockUser("user-2"),
  generateMockUser("user-3"),
];
export const mockInventoryLogs = generateMockInventoryLogs(mockProducts, 10);

export const mockEnhancedAdminStats = {
  ...mockAdminStats,
  monthlyRevenue: parseFloat(faker.finance.amount({ min: 10000, max: 50000 })),
  weeklyOrders: faker.number.int({ min: 10, max: 40 }),
  averageOrderValue: parseFloat(faker.finance.amount({ min: 20, max: 200 })),
  totalProducts: mockProducts.length,
  lowStockProducts: mockProducts.filter(
    (p) => p.stockQuantity <= 10 && p.stockQuantity > 0,
  ).length,
  outOfStockProducts: mockProducts.filter((p) => p.stockQuantity === 0).length,
  topCategories: mockCategories.map((c) => ({
    name: c.name,
    sales: faker.number.int({ min: 1000, max: 10000 }),
    percentage: parseFloat(
      faker.number.float({ min: 5, max: 40, precision: 0.1 }).toFixed(1),
    ),
  })),
};
