"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "@/components/icons";
import Link from "next/link";

interface Video {
  id: number;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export default function EditVideoPage() {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    thumbnail_url: "",
  });

  const router = useRouter();
  const params = useParams();
  const videoId = params.id as string;

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch("/api/videos");
        const videos: Video[] = await response.json();
        const video = videos.find(v => v.id === parseInt(videoId));
        
        if (video) {
          setFormData({
            title: video.title,
            description: video.description || "",
            video_url: video.video_url,
            thumbnail_url: video.thumbnail_url || "",
          });
        } else {
          alert("Video not found");
          router.push("/dashboard/videos");
        }
      } catch (error) {
        console.error("Error fetching video:", error);
        alert("Failed to load video");
        router.push("/dashboard/videos");
      } finally {
        setFetchLoading(false);
      }
    };

    if (videoId) {
      fetchVideo();
    }
  }, [videoId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/videos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: parseInt(videoId), ...formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update video");
      }

      router.push("/dashboard/videos");
    } catch (error) {
      console.error("Error updating video:", error);
      alert("Failed to update video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/videos">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Video</h1>
          <p className="text-gray-600">Update your video information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>
            Update the information about your video
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter video title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your video"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="video_url">Video URL *</Label>
              <Input
                id="video_url"
                name="video_url"
                type="url"
                value={formData.video_url}
                onChange={handleChange}
                placeholder="https://example.com/video.mp4 or YouTube URL"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
              <Input
                id="thumbnail_url"
                name="thumbnail_url"
                type="url"
                value={formData.thumbnail_url}
                onChange={handleChange}
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            {formData.thumbnail_url && (
              <div className="space-y-2">
                <Label>Thumbnail Preview</Label>
                <img
                  src={formData.thumbnail_url}
                  alt="Thumbnail preview"
                  className="w-full max-w-sm h-32 object-cover rounded-md border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Updating..." : "Update Video"}
              </Button>
              
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/videos">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}