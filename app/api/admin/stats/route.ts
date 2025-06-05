import { NextResponse } from "next/server";
import { mockEnhancedAdminStats } from "@/lib/mockDb";

export async function GET() {
  return NextResponse.json({ success: true, data: mockEnhancedAdminStats });
}
