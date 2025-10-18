"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar, MapPin } from "@/components/icons";

interface CVSection {
  id: number;
  section_type: string;
  title: string;
  content: string;
  start_date?: string;
  end_date?: string;
  organization?: string;
  location?: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export default function CVPage() {
  const [cvSections, setCVSections] = useState<CVSection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCVSections = async () => {
    try {
      const response = await fetch("/api/cv");
      const data = await response.json();
      setCVSections(data);
    } catch (error) {
      console.error("Failed to fetch CV sections:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCVSection = async (id: number) => {
    if (!confirm("Are you sure you want to delete this CV section?")) return;

    try {
      await fetch(`/api/cv?id=${id}`, { method: "DELETE" });
      setCVSections(cvSections.filter(section => section.id !== id));
    } catch (error) {
      console.error("Failed to delete CV section:", error);
    }
  };

  useEffect(() => {
    fetchCVSections();
  }, []);

  const getSectionColor = (sectionType: string) => {
    const colors: Record<string, string> = {
      experience: "bg-blue-100 text-blue-800",
      education: "bg-green-100 text-green-800", 
      skills: "bg-purple-100 text-purple-800",
      achievements: "bg-orange-100 text-orange-800",
    };
    return colors[sectionType] || "bg-gray-100 text-gray-800";
  };

  const groupedSections = cvSections.reduce((acc, section) => {
    if (!acc[section.section_type]) {
      acc[section.section_type] = [];
    }
    acc[section.section_type].push(section);
    return acc;
  }, {} as Record<string, CVSection[]>);

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
          <h1 className="text-3xl font-bold text-gray-900">CV Management</h1>
          <p className="text-gray-600">Manage your curriculum vitae sections</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/cv/new">
            <Plus className="w-4 h-4 mr-2" />
            Add CV Section
          </Link>
        </Button>
      </div>

      {Object.keys(groupedSections).length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No CV sections yet</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first CV section.</p>
              <Button asChild>
                <Link href="/dashboard/cv/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add CV Section
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedSections).map(([sectionType, sections]) => (
            <div key={sectionType} className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className={getSectionColor(sectionType)}>
                  {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}
                </Badge>
                <span className="text-sm text-gray-500">
                  {sections.length} {sections.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <Card key={section.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{section.title}</CardTitle>
                            {section.organization && (
                              <CardDescription className="mt-1">
                                {section.organization}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                          {section.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                          {section.start_date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(section.start_date).toLocaleDateString()} 
                              {section.end_date 
                                ? ` - ${new Date(section.end_date).toLocaleDateString()}`
                                : ' - Present'
                              }
                            </div>
                          )}
                          {section.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {section.location}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/dashboard/cv/${section.id}/edit`}>
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </Link>
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteCVSection(section.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                          
                          <span className="text-xs text-gray-400">
                            Order: {section.order}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}