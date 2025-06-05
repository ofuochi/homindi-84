import { NextResponse } from "next/server";
import { mockCategories } from "@/lib/mockDb";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const category = mockCategories.find((c) => c.id === params.id);
  if (!category)
    return NextResponse.json(
      { success: false, error: "Not found" },
      { status: 404 },
    );
  return NextResponse.json({ success: true, data: category });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const index = mockCategories.findIndex((c) => c.id === params.id);
  if (index === -1)
    return NextResponse.json(
      { success: false, error: "Not found" },
      { status: 404 },
    );
  const body = await req.json();
  mockCategories[index] = {
    ...mockCategories[index],
    ...body,
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json({
    success: true,
    data: mockCategories[index],
    message: "Category updated successfully",
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const index = mockCategories.findIndex((c) => c.id === params.id);
  if (index === -1)
    return NextResponse.json(
      { success: false, error: "Not found" },
      { status: 404 },
    );
  const [deleted] = mockCategories.splice(index, 1);
  return NextResponse.json({
    success: true,
    data: deleted,
    message: "Category deleted successfully",
  });
}
