"use client";

import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Temporary placeholder for icons
const Mail = ({ className }: { className?: string }) => <div className={`w-4 h-4 bg-white rounded ${className}`}></div>;
const Chrome = ({ className }: { className?: string }) => <div className={`w-4 h-4 bg-white rounded ${className}`}></div>;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    }) as { error?: string; ok?: boolean } | null;
      
      if (result?.ok) {
        router.push("/dashboard");
      } else {
        console.error("Sign in failed:", result?.error);
        alert("Invalid credentials. Please check your email and try again.");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      alert("An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Google sign in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
      
      <Card className="w-full max-w-md tf-card relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
            <div className="text-white font-black text-xl tracking-wider">SM</div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
          <CardDescription className="text-white/60">
            Sign in to manage your portfolio content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleCredentialsSignIn} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Email Address</label>
              <Input
                type="email"
                placeholder="shawnmutogo5@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="tf-input"
              />
              <p className="text-xs text-white/40 mt-1">Use: shawnmutogo5@gmail.com</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="tf-input"
              />
              <p className="text-xs text-white/40 mt-1">Use: ShawnMutogo@22200207</p>
            </div>
            <Button 
              type="submit" 
              className="w-full tf-button" 
              disabled={loading}
            >
              <Mail className="w-4 h-4 mr-2" />
              {loading ? "Signing in..." : "Sign in with Credentials"}
            </Button>
          </form>
          
          {providers?.google && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full tf-divider" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-4 text-white/50 font-medium tracking-wider">Or continue with</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full tf-button"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <Chrome className="w-4 h-4 mr-2" />
                Sign in with Google
              </Button>
            </>
          )}
          
          {/* Footer text */}
          <p className="text-xs text-white/40 text-center mt-6">
            Secure access to your portfolio management dashboard
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
