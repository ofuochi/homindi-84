import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mockDb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const start = (page - 1) * limit;
  const end = start + limit;
  const items = mockUsers.slice(start, end);

  return NextResponse.json({
    success: true,
    data: {
      items,
      total: mockUsers.length,
      page,
      limit,
      totalPages: Math.ceil(mockUsers.length / limit),
    },
  });
}
