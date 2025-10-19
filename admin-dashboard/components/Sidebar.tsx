"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// Temporary placeholder for icons
const Home = ({ className }: { className?: string }) => <div className={`w-5 h-5 bg-white rounded ${className}`}></div>;
const Folder = ({ className }: { className?: string }) => <div className={`w-5 h-5 bg-blue-400 rounded ${className}`}></div>;
const Video = ({ className }: { className?: string }) => <div className={`w-5 h-5 bg-purple-400 rounded ${className}`}></div>;
const FileText = ({ className }: { className?: string }) => <div className={`w-5 h-5 bg-green-400 rounded ${className}`}></div>;
const Settings = ({ className }: { className?: string }) => <div className={`w-5 h-5 bg-gray-400 rounded ${className}`}></div>;

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/dashboard/projects", icon: Folder },
  { name: "Videos", href: "/dashboard/videos", icon: Video },
  { name: "Sections", href: "/dashboard/sections", icon: FileText },
  { name: "CV", href: "/dashboard/cv", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-black shadow-2xl">
      {/* Header */}
      <div className="flex h-16 items-center px-6 border-b border-white/8">
        <div className="tf-fade-in">
          <h2 className="text-lg font-black text-white uppercase tracking-widest">
            SM<span className="text-white/60">.</span>ADMIN
          </h2>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            
            return (
              <li key={item.name} className={`tf-reveal tf-reveal--delay-${Math.min(index + 1, 5)}`}>
                <Link
                  href={item.href}
                  className={cn(
                    "tf-sidebar-item flex items-center text-sm font-medium tf-focus",
                    isActive
                      ? "tf-sidebar-active"
                      : ""
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  <span className="tracking-wide">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        
        {/* Divider */}
        <div className="tf-divider my-8" />
        
        {/* Footer info */}
        <div className="mt-auto px-4 py-6 tf-reveal tf-reveal--delay-5">
          <div className="text-xs text-white/50 uppercase tracking-wider font-medium">
            Version 1.0.0
          </div>
          <div className="text-xs text-white/30 mt-1">
            Shawn Mutogo Portfolio
          </div>
        </div>
      </nav>
    </div>
  );
}
