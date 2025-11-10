"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthIllustration } from "@/components/auth-illustration";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const from = search?.get("from") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Login failed");
      }
      router.replace(from || "/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-4xl card p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative p-8 md:p-10 bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 text-white">
            <div className="text-2xl font-semibold">GoodFood Dashboard</div>
            <div className="mt-2 text-indigo-100">Sign in to continue managing orders, menus and insights.</div>
            <div className="mt-6">
              <AuthIllustration />
            </div>
          </div>
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-end gap-2 mb-6">
              <a
                href={`/login${from ? `?from=${encodeURIComponent(from)}` : ""}`}
                className="px-4 py-1.5 rounded-md border border-slate-200 text-sm font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
              >
                Login
              </a>
              <a
                href={`/signup${from ? `?from=${encodeURIComponent(from)}` : ""}`}
                className="px-4 py-1.5 rounded-md border border-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                Sign Up
              </a>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-semibold">Welcome back</div>
              <div className="text-sm text-slate-500">Please enter your details</div>
            </div>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm md:text-base font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full ml-2 border border-slate-300 rounded-lg bg-white/95 hover:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm md:text-base font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full ml-0.5 border border-slate-300 rounded-lg bg-white/95 hover:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition"
                  placeholder="••••••••"
                />
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <div className="flex justify-end -mt-1 mb-1">
                <a href="/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full rounded-full bg-indigo-700 text-white border border-indigo-700 hover:bg-white hover:text-indigo-700 transition-colors"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <div className="text-sm text-slate-600 mt-4">
              Don't have an account? <a href={`/signup${from ? `?from=${encodeURIComponent(from)}` : ""}`} className="text-indigo-600 hover:underline">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
