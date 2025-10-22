import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    // Test database connection
    const projectCount = await prisma.project.count();
    const videoCount = await prisma.video.count();
    const cvCount = await prisma.cVSection.count();
    
    return NextResponse.json({
      status: 'connected',
      database: process.env.DATABASE_URL?.split('@')[1]?.split('/')[1] || 'unknown',
      counts: {
        projects: projectCount,
        videos: videoCount,
        cvSections: cvCount
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      code: error.code
    }, { status: 500 });
  }
}
