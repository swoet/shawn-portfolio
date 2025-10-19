"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SectionItem {
  key: string;
  data: unknown;
}

export default function SectionsPage() {
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    try {
      const res = await fetch("/api/sections");
      const data = await res.json();
      setSections(Array.isArray(data) ? data : []);
    } catch (e) {
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteSection = async (key: string) => {
    if (!confirm(`Delete section "${key}"?`)) return;
    try {
      await fetch(`/api/sections/${encodeURIComponent(key)}`, { method: "DELETE" });
      setSections((prev) => prev.filter((s) => s.key !== key));
    } catch {}
  };

  useEffect(() => {
    fetchSections();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="w-16 h-16 border-3 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Sections</h1>
          <p className="text-white/60">Manage editable content for static sections</p>
        </div>
        <Button asChild className="tf-button bg-white text-black hover:bg-white/90 font-medium">
          <Link href="/dashboard/sections/new">New Section</Link>
        </Button>
      </div>

      {sections.length === 0 ? (
        <Card className="tf-card">
          <CardContent className="py-12 text-center text-white/70">No sections yet.</CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((s) => (
            <Card key={s.key} className="tf-card">
              <CardHeader>
                <CardTitle className="text-white">{s.key}</CardTitle>
                <CardDescription className="text-white/60">{typeof s.data}</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button asChild variant="outline" className="tf-button border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                  <Link href={`/dashboard/sections/${encodeURIComponent(s.key)}/edit`}>Edit</Link>
                </Button>
                <Button variant="outline" className="tf-button border-white/20 text-red-500 hover:text-red-600 hover:border-white/40" onClick={() => deleteSection(s.key)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
