"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "@/components/icons";
import Link from "next/link";

export default function NewVideoPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    thumbnail_url: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create video");
      }

      router.push("/dashboard/videos");
    } catch (error) {
      console.error("Error creating video:", error);
      alert("Failed to create video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/videos">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Video</h1>
          <p className="text-gray-600">Create a new video for your portfolio</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>
            Fill in the information about your video
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
                {loading ? "Creating..." : "Create Video"}
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