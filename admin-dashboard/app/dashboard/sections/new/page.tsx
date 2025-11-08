"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function NewSectionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [keyVal, setKeyVal] = useState("");
  const [jsonStr, setJsonStr] = useState<string>(
    JSON.stringify(
      {
        title: "",
        subtitle: "",
        imageUrl: "",
        description: "",
      },
      null,
      2
    )
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let data: any;
    try {
      data = JSON.parse(jsonStr || "{}");
    } catch (e) {
      setError("Invalid JSON");
      return;
    }

    if (!keyVal.trim()) {
      setError("Key is required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: keyVal.trim(), data }),
      });
      if (res.ok) {
        router.push("/dashboard/sections");
      } else {
        const j = await res.json().catch(() => ({ error: "Failed" }));
        setError(j.error || "Failed to create");
      }
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">New Section</h1>
          <p className="text-white/60">Create a new editable section by key</p>
        </div>
        <Button asChild variant="outline" className="tf-button border-white/20 text-white hover:bg-white/10 hover:border-white/40">
          <Link href="/dashboard/sections">Back</Link>
        </Button>
      </div>

      <Card className="tf-card">
        <CardHeader>
          <CardTitle className="text-white">Section Details</CardTitle>
          <CardDescription className="text-white/60">Provide a unique key and JSON data</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="key" className="text-sm text-white/80">Key *</label>
              <Input id="key" value={keyVal} onChange={(e) => setKeyVal(e.target.value)} placeholder="hero, about, featured, process, contact, ..." />
            </div>

            <div className="space-y-2">
              <label htmlFor="json" className="text-sm text-white/80">JSON Data *</label>
              <Textarea id="json" rows={18} value={jsonStr} onChange={(e) => setJsonStr(e.target.value)} className="font-mono text-xs" />
            </div>

            {error && <div className="text-sm text-red-400">{error}</div>}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" asChild className="tf-button border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                <Link href="/dashboard/sections">Cancel</Link>
              </Button>
              <Button type="submit" disabled={saving} className="tf-button bg-white text-black hover:bg-white/90 font-medium">
                {saving ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
