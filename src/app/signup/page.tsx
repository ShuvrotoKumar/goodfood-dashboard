"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthIllustration } from "@/components/auth-illustration";

export default function SignupPage() {
  const router = useRouter();
  const search = useSearchParams();
  const from = search?.get("from") || "/";
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthDate, phone, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Signup failed");
      }
      router.replace(from || "/");
    } catch (err: any) {
      setError(err.message || "Signup failed");
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
            <div className="mt-2 text-indigo-100">Create your account to start managing your restaurant data.</div>
            <div className="mt-6">
              <AuthIllustration />
            </div>
          </div>
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-end gap-2 mb-6">
              <a
                href={`/login${from ? `?from=${encodeURIComponent(from)}` : ""}`}
                className="px-4 py-1.5 rounded-md border border-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                Login
              </a>
              <a
                href={`/signup${from ? `?from=${encodeURIComponent(from)}` : ""}`}
                className="px-4 py-1.5 rounded-md border border-slate-200 text-sm font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
              >
                Sign Up
              </a>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-semibold">Create account</div>
              <div className="text-sm text-slate-500">Please enter your details</div>
            </div>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm md:text-base font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input w-full ml-2 border border-slate-300 rounded-lg bg-white/95 hover:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm md:text-base font-medium text-slate-700">Birth Date</label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="input w-full ml-2 border border-slate-300 rounded-lg bg-white/95 hover:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm md:text-base font-medium text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input w-full ml-2 border border-slate-300 rounded-lg bg-white/95 hover:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition"
                  placeholder="+1 555 123 4567"
                />
              </div>
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
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full rounded-full bg-indigo-700 text-white border border-indigo-700 hover:bg-white hover:text-indigo-700 transition-colors"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>
            <div className="text-sm text-slate-600 mt-4">
              Already have an account? <a href={`/login${from ? `?from=${encodeURIComponent(from)}` : ""}`} className="text-indigo-600 hover:underline">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
