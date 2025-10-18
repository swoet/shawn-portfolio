import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from '../../../lib/prisma';
import { authOptions } from "../../../lib/auth";
import { broadcastVideoUpdate, broadcastContentRefresh } from '../../../lib/sse-utils';

// GET /api/videos - Fetch all videos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    const videos = await prisma.video.findMany({
      orderBy: { created_at: 'desc' },
      take: limit ? parseInt(limit) : undefined
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/videos - Create new video
export async function POST(request: NextRequest) {
  // Skip auth for development
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const { title, description, video_url, thumbnail_url } = await request.json();

    // Validate required fields
    if (!title || !description || !video_url) {
      return NextResponse.json({ error: 'Title, description, and video URL are required' }, { status: 400 });
    }

    const video = await prisma.video.create({
      data: {
        title,
        description,
        video_url,
        thumbnail_url
      }
    });

    // Broadcast update to connected clients
    broadcastVideoUpdate(video);
    broadcastContentRefresh();

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/videos - Update existing video
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, title, description, video_url, thumbnail_url } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    const video = await prisma.video.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        video_url,
        thumbnail_url,
        updated_at: new Date()
      }
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error updating video:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/videos - Delete video
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    await prisma.video.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
