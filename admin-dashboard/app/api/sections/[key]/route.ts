import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
import { authOptions } from "../../../../lib/auth";
import { broadcastContentRefresh } from "../../../../lib/sse-utils";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ key: string }> }
) {
  const { key } = await context.params;
  try {
    const section = await prisma.pageSection.findUnique({ where: { key } });
    if (!section) return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS_HEADERS });
    return NextResponse.json({ key: section.key, data: JSON.parse(section.data || "{}") }, { headers: CORS_HEADERS });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ key: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS_HEADERS });
  }
  const { key } = await context.params;
  try {
    const body = await request.json();
    const data = body.data ?? {};

    const updated = await prisma.pageSection.upsert({
      where: { key },
      update: { data: JSON.stringify(data) },
      create: { key, data: JSON.stringify(data) },
    });

    broadcastContentRefresh();

    return NextResponse.json({ key: updated.key, data: JSON.parse(updated.data || "{}") }, { headers: CORS_HEADERS });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ key: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS_HEADERS });
  }
  const { key } = await context.params;
  try {
    await prisma.pageSection.delete({ where: { key } });

    broadcastContentRefresh();

    return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
  } catch (error: any) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS_HEADERS });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: CORS_HEADERS });
  }
}
