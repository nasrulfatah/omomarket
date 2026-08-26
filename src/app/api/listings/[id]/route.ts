import { NextRequest, NextResponse } from "next/server";
import { getListingById } from "@/lib/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) {
    return NextResponse.json({ error: "Listing tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json({ listing });
}
