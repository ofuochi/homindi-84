import { NextResponse } from "next/server";
import { mockOrders } from "@/lib/mockDb";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const order = mockOrders.find((o) => o.id === params.id);
  if (!order)
    return NextResponse.json(
      { success: false, error: "Not found" },
      { status: 404 },
    );
  const body = await req.json();
  Object.assign(order, body);
  return NextResponse.json({
    success: true,
    data: order,
    message: "Order status updated successfully",
  });
}
