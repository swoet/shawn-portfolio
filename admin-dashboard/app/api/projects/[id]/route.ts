import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
import { authOptions } from "../../../../lib/auth";
import { revalidatePortfolio, triggerFrontendRevalidation } from "../../../../lib/revalidate";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { id } = params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    // Parse tags JSON string back to array for frontend
    const formattedProject = project ? {
      ...project,
      tags: project.tags ? JSON.parse(project.tags) : []
    } : null;

    if (!formattedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(formattedProject);
  } catch {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    // Convert tags array to JSON string for SQLite
    const tagsJson = data.tags && Array.isArray(data.tags) ? JSON.stringify(data.tags) : '[]';
    
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        description: data.description,
        image_url: data.image_url,
        github_url: data.github_url,
        live_url: data.live_url,
        tags: tagsJson,
        featured: data.featured || false,
        updated_at: new Date()
      },
    });
    
    // Format the response
    const formattedProject = {
      ...project,
      tags: JSON.parse(project.tags || '[]')
    };

    revalidatePortfolio();
    await triggerFrontendRevalidation();

    return NextResponse.json(formattedProject);
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    revalidatePortfolio();
    await triggerFrontendRevalidation();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
