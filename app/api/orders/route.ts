import { NextResponse } from "next/server";
import { mockOrders } from "@/lib/mockDb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const status = searchParams.get("status");

  let filtered = [...mockOrders];
  if (status && status !== "all") {
    filtered = filtered.filter((o) => o.status === status);
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
