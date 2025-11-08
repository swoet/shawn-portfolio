import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';
import { broadcastProjectUpdate, broadcastContentRefresh } from '../../../lib/sse-utils';
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

// GET /api/projects - Fetch all projects or featured projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let projects;
    if (featured === 'true') {
      // Get featured projects (those marked as featured)
      projects = await prisma.project.findMany({
        where: {
          featured: true
        },
        orderBy: [
          { updated_at: 'desc' }
        ],
        take: limit ? parseInt(limit) : undefined
      });
    } else {
      // Get all projects
      projects = await prisma.project.findMany({
        orderBy: { updated_at: 'desc' }
      });
    }

    // Parse tags JSON string back to array for frontend
    const formattedProjects = projects.map((project: { tags?: string | null; [key: string]: unknown }) => ({
      ...project,
      tags: project.tags ? JSON.parse(project.tags) : []
    }));

    return NextResponse.json(formattedProjects, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: CORS_HEADERS });
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  // Skip auth for development
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const { title, description, image_url, github_url, live_url, tags, featured } = await request.json();

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    // Convert tags array to JSON string for SQLite
    const tagsJson = tags && Array.isArray(tags) ? JSON.stringify(tags) : '[]';

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image_url,
        github_url,
        live_url,
        tags: tagsJson,
        featured: featured || false
      }
    });

    // Format the response
    const formattedProject = {
      ...project,
      tags: JSON.parse(project.tags || '[]')
    };

    // Broadcast update to connected clients
    broadcastProjectUpdate(formattedProject);
    broadcastContentRefresh();

    return NextResponse.json(formattedProject, { status: 201, headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/projects - Update existing project
export async function PUT(request: NextRequest) {
  // Skip auth for development
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const { id, title, description, image_url, github_url, live_url, tags, featured } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Convert tags array to JSON string for SQLite
    const tagsJson = tags && Array.isArray(tags) ? JSON.stringify(tags) : '[]';

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        image_url,
        github_url,
        live_url,
        tags: tagsJson,
        featured: featured || false,
        updated_at: new Date()
      }
    });

    // Format the response
    const formattedProject = {
      ...project,
      tags: JSON.parse(project.tags || '[]')
    };

    // Broadcast update to connected clients
    broadcastProjectUpdate(formattedProject);
    broadcastContentRefresh();

    return NextResponse.json(formattedProject, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error updating project:', error);
    if (error && typeof error === 'object' && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Project not found' }, { status: 404, headers: CORS_HEADERS });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: CORS_HEADERS });
  }
}

// DELETE /api/projects - Delete project
export async function DELETE(request: NextRequest) {
  // Skip auth for development
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id: parseInt(id) }
    });

    // Broadcast update to connected clients
    broadcastContentRefresh();

    return NextResponse.json({ message: 'Project deleted successfully' }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('Error deleting project:', error);
    if (error && typeof error === 'object' && 'code' in error && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Project not found' }, { status: 404, headers: CORS_HEADERS });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: CORS_HEADERS });
  }
}
