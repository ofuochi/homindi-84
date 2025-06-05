import { NextResponse } from "next/server";
import { mockInventoryLogs } from "@/lib/mockDb";

export async function POST(req: Request) {
  const body = await req.json();
  const newLog = {
    id: `log-${Date.now()}`,
    ...body,
    previousStock: 50,
    newStock: 50 + body.quantity,
    userId: "admin-1",
    createdAt: new Date().toISOString(),
  };
  mockInventoryLogs.push(newLog);
  return NextResponse.json({
    success: true,
    data: newLog,
    message: "Stock adjustment completed successfully",
  });
}
