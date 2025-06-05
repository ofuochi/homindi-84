import { NextResponse } from "next/server";
import { mockCategories } from "@/lib/mockDb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const start = (page - 1) * limit;
  const end = start + limit;
  const items = mockCategories.slice(start, end);

  return NextResponse.json({
    success: true,
    data: {
      items,
      total: mockCategories.length,
      page,
      limit,
      totalPages: Math.ceil(mockCategories.length / limit),
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const newCategory = {
    id: `cat-${Date.now()}`,
    ...body,
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockCategories.push(newCategory);
  return NextResponse.json({
    success: true,
    data: newCategory,
    message: "Category created successfully",
  });
}
