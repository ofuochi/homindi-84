import { NextResponse } from "next/server";
import { mockOrders } from "@/lib/mockDb";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const order = mockOrders.find((o) => o.id === params.id);
  if (!order)
    return NextResponse.json(
      { success: false, error: "Not found" },
      { status: 404 },
    );
  return NextResponse.json({ success: true, data: order });
}
