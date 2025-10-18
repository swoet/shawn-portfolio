import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from '../../../lib/prisma';
import { authOptions } from "../../../lib/auth";

// GET /api/cv - Fetch all CV sections
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    let cvSections;
    if (section) {
      // Get specific section
      cvSections = await prisma.cVSection.findMany({
        where: { section_type: section },
        orderBy: { order: 'asc' }
      });
    } else {
      // Get all sections
      cvSections = await prisma.cVSection.findMany({
        orderBy: [
          { section_type: 'asc' },
          { order: 'asc' }
        ]
      });
    }

    return NextResponse.json(cvSections);
  } catch (error) {
    console.error('Error fetching CV sections:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/cv - Create new CV section
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { section_type, title, content, start_date, end_date, organization, location, order } = await request.json();

    // Validate required fields
    if (!section_type || !title || !content) {
      return NextResponse.json({ error: 'Section type, title, and content are required' }, { status: 400 });
    }

    const cvSection = await prisma.cVSection.create({
      data: {
        section_type,
        title,
        content,
        start_date,
        end_date,
        organization,
        location,
        order: order || 0
      }
    });

    return NextResponse.json(cvSection, { status: 201 });
  } catch (error) {
    console.error('Error creating CV section:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/cv - Update existing CV section
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, section_type, title, content, start_date, end_date, organization, location, order } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'CV section ID is required' }, { status: 400 });
    }

    const cvSection = await prisma.cVSection.update({
      where: { id: parseInt(id) },
      data: {
        section_type,
        title,
        content,
        start_date,
        end_date,
        organization,
        location,
        order,
        updated_at: new Date()
      }
    });

    return NextResponse.json(cvSection);
  } catch (error: unknown) {
    console.error('Error updating CV section:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: 'CV section not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/cv - Delete CV section
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'CV section ID is required' }, { status: 400 });
    }

    await prisma.cVSection.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'CV section deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting CV section:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: 'CV section not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
