import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../../../lib/auth";
import { broadcastContentRefresh } from "../../../lib/sse-utils";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function GET(_request: NextRequest) {
  try {
    const sections = await prisma.pageSection.findMany({
      orderBy: { key: "asc" },
    });
    const formatted = sections.map((s: any) => ({ key: s.key, data: JSON.parse(s.data || "{}") }));
    return NextResponse.json(formatted, { headers: CORS_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS_HEADERS });
  }

  try {
    const body = await request.json();
    const key: string = body.key;
    const data = body.data ?? {};

    if (!key || typeof key !== "string") {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const created = await prisma.pageSection.create({
      data: {
        key,
        data: JSON.stringify(data),
      },
    });

    broadcastContentRefresh();

    return NextResponse.json({ key: created.key, data: JSON.parse(created.data || "{}") }, { status: 201, headers: CORS_HEADERS });
  } catch (error: any) {
    if (error && typeof error === "object" && "code" in error && (error as any).code === "P2002") {
      return NextResponse.json({ error: "Section with this key already exists" }, { status: 409, headers: CORS_HEADERS });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: CORS_HEADERS });
  }
}
