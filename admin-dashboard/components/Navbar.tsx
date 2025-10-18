"use client";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Temporary placeholder for icons
const LogOut = ({ className }: { className?: string }) => <div className={`w-4 h-4 bg-white rounded ${className}`}></div>;
const User = ({ className }: { className?: string }) => <div className={`w-4 h-4 bg-white rounded ${className}`}></div>;

export function Navbar() {
  // Temporary user data for development
  const user = {
    name: "Shawn Mutogo",
    email: "shawnmutogo5@gmail.com",
    image: null
  };

  const handleSignOut = () => {
    // For development, just reload the page
    window.location.reload();
  };

  return (
    <header className="fixed top-0 right-0 left-64 z-40 h-16 tf-navbar">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          <div className="tf-fade-in">
            <h1 className="tf-nav-link font-bold text-white uppercase tracking-wider">
              Dashboard
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <a href="/dashboard" className="tf-nav-link">Overview</a>
            <a href="/dashboard/projects" className="tf-nav-link">Projects</a>
            <a href="/dashboard/videos" className="tf-nav-link">Videos</a>
            <a href="/dashboard/cv" className="tf-nav-link">CV</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4 tf-slide-right">
          <div className="text-xs text-white/70 font-medium tracking-wide uppercase hidden lg:block">
            {user.name || user.email}
          </div>
          
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-9 w-9 rounded-full tf-focus hover:bg-white/5 transition-all duration-200 hover:scale-105"
              >
                <Avatar className="h-8 w-8 ring-1 ring-white/10">
                  <AvatarImage 
                    src={user.image || ""} 
                    alt={user.name || "User"} 
                  />
                  <AvatarFallback className="bg-white/10 text-white text-xs">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
              className="w-56 bg-black/95 backdrop-blur-md text-white border border-white/10 shadow-xl" 
              align="end" 
              forceMount
            >
              <DropdownMenuItem className="flex-col items-start focus:bg-white/10 py-3">
                <div className="text-sm font-semibold">
                  {user.name || "User"}
                </div>
                <div className="text-xs text-white/60">
                  {user.email}
                </div>
              </DropdownMenuItem>
              
              <div className="tf-divider my-1" />
              
              <DropdownMenuItem 
                className="focus:bg-white/10 py-2 hover:translate-x-1 transition-transform duration-200" 
                onClick={handleSignOut}
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span className="font-medium">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
