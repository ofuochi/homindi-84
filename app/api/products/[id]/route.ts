import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockDb";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const product = mockProducts.find((p) => p.id === params.id);
  if (!product)
    return NextResponse.json(
      { success: false, error: "Not found" },
      { status: 404 },
    );
  return NextResponse.json({ success: true, data: product });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const index = mockProducts.findIndex((p) => p.id === params.id);
  if (index === -1)
    return NextResponse.json(
      { success: false, error: "Not found" },
      { status: 404 },
    );
  const body = await req.json();
  mockProducts[index] = {
    ...mockProducts[index],
    ...body,
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json({
    success: true,
    data: mockProducts[index],
    message: "Product updated successfully",
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const index = mockProducts.findIndex((p) => p.id === params.id);
  if (index === -1)
    return NextResponse.json(
      { success: false, error: "Not found" },
      { status: 404 },
    );
  const [deleted] = mockProducts.splice(index, 1);
  return NextResponse.json({
    success: true,
    data: deleted,
    message: "Product deleted successfully",
  });
}
