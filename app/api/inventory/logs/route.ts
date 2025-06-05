import { NextResponse } from "next/server";
import { mockInventoryLogs } from "@/lib/mockDb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const productId = searchParams.get("productId");

  let filtered = [...mockInventoryLogs];
  if (productId) {
    filtered = filtered.filter((log) => log.productId === productId);
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
