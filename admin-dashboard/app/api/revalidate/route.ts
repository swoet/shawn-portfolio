import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { revalidatePortfolio, triggerFrontendRevalidation } from "../../../lib/revalidate";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    revalidatePortfolio();
    await triggerFrontendRevalidation();
    
    return NextResponse.json({ success: true, revalidated: true });
  } catch {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
  }
}
