"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink } from "@/components/icons";
// import { Project } from "@shared/types"; // Removed to fix import issues

interface Project {
  id: string;
  title: string;
  description?: string;
  coverUrl?: string;
  url?: string;
  repoUrl?: string;
  tags?: string[];
  published?: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage your portfolio projects</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first project.</p>
              <Button asChild>
                <Link href="/dashboard/projects/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {project.description || "No description"}
                    </CardDescription>
                  </div>
                  <Badge variant={project.published ? "default" : "secondary"}>
                    {project.published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {project.coverUrl && (
                  <div className="mb-4">
                    <img
                      src={project.coverUrl}
                      alt={project.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                )}
                
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/projects/${project.id}/edit`}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteProject(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                  
                  {project.url && (
                    <Button size="sm" variant="ghost" asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
