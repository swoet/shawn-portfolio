export type ID = string;

export type Project = {
  id: ID;
  title: string;
  slug: string;
  description?: string;
  coverUrl?: string;
  tags?: string[];
  url?: string;
  repoUrl?: string;
  sortOrder?: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Video = {
  id: ID;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CVSectionKey =
  | "about"
  | "experience"
  | "education"
  | "skills"
  | "certifications"
  | "awards";

export type CVSection = {
  id: ID;
  key: CVSectionKey;
  data: unknown; // JSON blob for flexible content
  updatedAt: string;
};
