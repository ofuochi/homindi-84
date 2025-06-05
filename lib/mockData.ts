import { faker } from "@faker-js/faker";
import type {
  Product,
  Order,
  User,
  AdminStats,
  Category,
  InventoryLog,
} from "./types";

export function generateMockProducts(count = 20): Product[] {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 5, max: 100 })),
    unit: `per ${faker.number.int({ min: 1, max: 5 })} ${faker.helpers.arrayElement(["kg", "g", "lb", "litre", "pack"])}`,
    category: faker.helpers.arrayElement([
      "Palm Products",
      "Spices & Seasonings",
      "Dried Fish & Meat",
      "Grains & Cereals",
      "Snacks & Sweets",
    ]),
    image: "/placeholder.svg?height=300&width=300",
    inStock: faker.datatype.boolean(),
    stockQuantity: faker.number.int({ min: 0, max: 100 }),
    origin: `${faker.location.state()}, ${faker.location.country()}`,
    weight: `${faker.number.int({ min: 100, max: 1000 })}g`,
    sku: faker.string.alphanumeric(8).toUpperCase(),
    tags: [],
    featured: faker.datatype.boolean(),
    discount: faker.number.float({ min: 0, max: 20, precision: 0.01 }),
    minOrderQuantity: 1,
    maxOrderQuantity: undefined,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }));
}

export function generateMockCategories(count = 5): Category[] {
  return Array.from({ length: count }).map((_, idx) => ({
    id: `cat-${idx + 1}`,
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    image: "/placeholder.svg?height=200&width=200",
    parentId: undefined,
    isActive: true,
    sortOrder: idx + 1,
    productCount: faker.number.int({ min: 5, max: 30 }),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }));
}

export function generateMockOrders(
  products: Product[],
  userId = "user-1",
  count = 5,
): Order[] {
  return Array.from({ length: count }).map(() => {
    const items = Array.from({
      length: faker.number.int({ min: 1, max: 3 }),
    }).map(() => {
      const product = faker.helpers.arrayElement(products);
      return { product, quantity: faker.number.int({ min: 1, max: 3 }) };
    });
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const status = faker.helpers.arrayElement([
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ]) as Order["status"];
    return {
      id: `ORD-${faker.string.alphanumeric(6).toUpperCase()}`,
      userId,
      items,
      total: parseFloat(total.toFixed(2)),
      status,
      createdAt: faker.date.past().toISOString(),
      shippingAddress: {
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        country: faker.location.country(),
        city: faker.location.city(),
        streetAddress: faker.location.streetAddress(),
        postalCode: faker.location.zipCode(),
      },
      trackingNumber:
        status !== "cancelled"
          ? `TRK${faker.string.alphanumeric(10).toUpperCase()}`
          : undefined,
    };
  });
}

export function generateMockInventoryLogs(
  products: Product[],
  count = 10,
): InventoryLog[] {
  return Array.from({ length: count }).map(() => {
    const product = faker.helpers.arrayElement(products);
    const quantity = faker.number.int({ min: -20, max: 50 });
    const prev = faker.number.int({ min: 0, max: 100 });
    return {
      id: faker.string.uuid(),
      productId: product.id,
      action: faker.helpers.arrayElement([
        "stock_in",
        "stock_out",
        "adjustment",
        "sale",
        "return",
      ]) as InventoryLog["action"],
      quantity,
      previousStock: prev,
      newStock: prev + quantity,
      reason: faker.commerce.productDescription(),
      userId: `user-${faker.number.int({ min: 1, max: 5 })}`,
      createdAt: faker.date.recent().toISOString(),
    };
  });
}

export function generateMockUser(id = "user-1"): User {
  return {
    id,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    addresses: [
      {
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        country: faker.location.country(),
        city: faker.location.city(),
        streetAddress: faker.location.streetAddress(),
        postalCode: faker.location.zipCode(),
        deliveryNotes: "Leave at front door",
      },
    ],
    preferredCountry: faker.location.country(),
    createdAt: faker.date.past().toISOString(),
    avatar: undefined,
    dateOfBirth: undefined,
    bio: undefined,
    website: undefined,
    company: undefined,
    jobTitle: undefined,
    role: "user",
    isActive: true,
    emailVerified: true,
    phoneVerified: true,
    lastLoginAt: faker.date.recent().toISOString(),
  };
}

export function generateMockAdminStats(): AdminStats {
  return {
    totalRevenue: parseFloat(faker.finance.amount({ min: 10000, max: 50000 })),
    totalOrders: faker.number.int({ min: 50, max: 200 }),
    bestSellingProduct: faker.commerce.productName(),
    activeCustomers: faker.number.int({ min: 20, max: 100 }),
  };
}
