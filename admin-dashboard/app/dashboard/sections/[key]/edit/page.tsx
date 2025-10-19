"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EditSectionPage() {
  const router = useRouter();
  const params = useParams();
  const key = decodeURIComponent(String(params.key ?? ""));

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jsonStr, setJsonStr] = useState("{");

  useEffect(() => {
    const fetchSection = async () => {
      setError(null);
      try {
        const res = await fetch(`/api/sections/${encodeURIComponent(key)}`);
        if (res.ok) {
          const data = await res.json();
          setJsonStr(JSON.stringify(data.data ?? {}, null, 2));
        } else {
          setJsonStr("{}\n");
        }
      } catch (e) {
        setError("Failed to fetch section");
      } finally {
        setLoading(false);
      }
    };
    if (key) fetchSection();
  }, [key]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    let data: any;
    try { data = JSON.parse(jsonStr || "{}"); } catch { setError("Invalid JSON"); return; }
    setSaving(true);
    try {
      const res = await fetch(`/api/sections/${encodeURIComponent(key)}` ,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (res.ok) {
        router.push("/dashboard/sections");
      } else {
        const j = await res.json().catch(() => ({ error: "Failed" }));
        setError(j.error || "Failed to save");
      }
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="w-16 h-16 border-3 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Section</h1>
          <p className="text-white/60">Key: <span className="font-mono">{key}</span></p>
        </div>
        <Button asChild variant="outline" className="tf-button border-white/20 text-white hover:bg-white/10 hover:border-white/40">
          <Link href="/dashboard/sections">Back</Link>
        </Button>
      </div>

      <Card className="tf-card">
        <CardHeader>
          <CardTitle className="text-white">Section JSON</CardTitle>
          <CardDescription className="text-white/60">Edit the JSON structure for this section</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <Textarea rows={24} className="font-mono text-xs" value={jsonStr} onChange={(e) => setJsonStr(e.target.value)} />
            {error && <div className="text-sm text-red-400">{error}</div>}
            <div className="flex justify-end gap-3">
              <Button asChild variant="outline" className="tf-button border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                <Link href="/dashboard/sections">Cancel</Link>
              </Button>
              <Button type="submit" disabled={saving} className="tf-button bg-white text-black hover:bg-white/90 font-medium">
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
