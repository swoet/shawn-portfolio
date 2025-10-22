"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink, Play } from "@/components/icons";

interface Video {
  id: number;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/videos");
      const data = await response.json();
      
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setVideos(data);
      } else {
        console.error("API returned non-array data:", data);
        setVideos([]);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (id: number) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
      setVideos(videos.filter(v => v.id !== id));
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
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
          <h1 className="text-3xl font-bold text-gray-900">Videos</h1>
          <p className="text-gray-600">Manage your portfolio videos</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/videos/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Video
          </Link>
        </Button>
      </div>

      {videos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
              <p className="text-gray-600 mb-4">Get started by uploading your first video.</p>
              <Button asChild>
                <Link href="/dashboard/videos/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Video
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {video.description || "No description"}
                    </CardDescription>
                  </div>
                  <Badge variant="default">Published</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {video.thumbnail_url ? (
                  <div className="mb-4 relative">
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 h-32 bg-gray-100 rounded-md flex items-center justify-center">
                    <Play className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                
                <div className="text-sm text-gray-500 mb-4">
                  Created: {new Date(video.created_at).toLocaleDateString()}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/videos/${video.id}/edit`}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteVideo(video.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                  
                  {video.video_url && (
                    <Button size="sm" variant="ghost" asChild>
                      <a href={video.video_url} target="_blank" rel="noopener noreferrer">
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