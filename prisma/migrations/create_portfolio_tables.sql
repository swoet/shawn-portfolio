-- Create portfolio system tables

-- PageSection table for managing portfolio sections
CREATE TABLE IF NOT EXISTS "PageSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL UNIQUE,
    "data" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Project table (if not exists)
CREATE TABLE IF NOT EXISTS "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "coverUrl" TEXT,
    "tags" TEXT,
    "url" TEXT,
    "repoUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Video table (if not exists)
CREATE TABLE IF NOT EXISTS "Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CVSection table (if not exists)
CREATE TABLE IF NOT EXISTS "CVSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL UNIQUE,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "PageSection_key_idx" ON "PageSection"("key");
CREATE INDEX IF NOT EXISTS "PageSection_published_idx" ON "PageSection"("published");
CREATE INDEX IF NOT EXISTS "Project_published_idx" ON "Project"("published");
CREATE INDEX IF NOT EXISTS "Project_sortOrder_idx" ON "Project"("sortOrder");
CREATE INDEX IF NOT EXISTS "Video_published_idx" ON "Video"("published");
