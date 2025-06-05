import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockDb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase();
  const stockStatus = searchParams.get("stockStatus");

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
  return NextResponse.json({
    success: true,
    data: {
      items,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const newProduct = {
    id: `product-${Date.now()}`,
    ...body,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProducts.push(newProduct);
  return NextResponse.json({
    success: true,
    data: newProduct,
    message: "Product created successfully",
  });
}
