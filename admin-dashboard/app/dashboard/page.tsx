"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Temporary placeholder for icons
const Folder = () => <div className="w-5 h-5 bg-blue-400 rounded"></div>;
const Video = () => <div className="w-5 h-5 bg-purple-400 rounded"></div>;
const FileText = () => <div className="w-5 h-5 bg-green-400 rounded"></div>;
const RefreshCw = ({ className }: { className?: string }) => <div className={`w-4 h-4 bg-white rounded ${className}`}></div>;

interface Stats {
  projects: number;
  videos: number;
  cvSections: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ projects: 0, videos: 0, cvSections: 0 });
  const [loading, setLoading] = useState(true);
  const [revalidating, setRevalidating] = useState(false);

  const fetchStats = async () => {
    try {
      const [projectsRes, videosRes, cvRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/videos"),
        fetch("/api/cv"),
      ]);

      const [projects, videos, cvSections] = await Promise.all([
        projectsRes.json(),
        videosRes.json(),
        cvRes.json(),
      ]);

      setStats({
        projects: projects.length || 0,
        videos: videos.length || 0,
        cvSections: cvSections.length || 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevalidate = async () => {
    setRevalidating(true);
    try {
      await fetch("/api/revalidate", { method: "POST" });
      // Show success message or notification
    } catch (error) {
      console.error("Failed to revalidate:", error);
    } finally {
      setRevalidating(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="tf-fade-in flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-3 border-white/10 border-t-white rounded-full animate-spin" />
            <div className="absolute inset-0 w-16 h-16 border-3 border-transparent border-r-white/60 rounded-full animate-spin [animation-delay:0.5s]" />
          </div>
          <p className="text-white/70 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center tf-reveal">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-white/70 mt-1">Manage your portfolio content</p>
        </div>
        <Button 
          onClick={handleRevalidate} 
          disabled={revalidating}
          className="tf-button bg-white text-black hover:bg-white/90 font-medium"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${revalidating ? "animate-spin" : ""}`} />
          {revalidating ? "Revalidating..." : "Refresh Frontend"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="tf-card tf-reveal tf-reveal--delay-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wide">Projects</CardTitle>
            <Folder className="h-5 w-5 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">{stats.projects}</div>
            <p className="text-xs text-white/60 mt-1">Total projects</p>
          </CardContent>
        </Card>

        <Card className="tf-card tf-reveal tf-reveal--delay-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wide">Videos</CardTitle>
            <Video className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">{stats.videos}</div>
            <p className="text-xs text-white/60 mt-1">Total videos</p>
          </CardContent>
        </Card>

        <Card className="tf-card tf-reveal tf-reveal--delay-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90 uppercase tracking-wide">CV Sections</CardTitle>
            <FileText className="h-5 w-5 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">{stats.cvSections}</div>
            <p className="text-xs text-white/60 mt-1">CV sections</p>
          </CardContent>
        </Card>
      </div>

      <Card className="tf-card tf-reveal tf-reveal--delay-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Quick Actions</CardTitle>
          <CardDescription className="text-white/60">Manage your portfolio content</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button asChild className="tf-button bg-white text-black hover:bg-white/90 font-medium">
            <a href="/dashboard/projects/new">Add New Project</a>
          </Button>
          <Button variant="outline" asChild className="tf-button border-white/20 text-white hover:bg-white/10 hover:border-white/40">
            <a href="/dashboard/videos">Manage Videos</a>
          </Button>
          <Button variant="outline" asChild className="tf-button border-white/20 text-white hover:bg-white/10 hover:border-white/40">
            <a href="/dashboard/cv">Update CV</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
