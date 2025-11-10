"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthIllustration } from "@/components/auth-illustration";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Request failed");
      }
      setMessage("If an account exists for this email, a reset link has been sent.");
    } catch (err: any) {
      setError(err.message || "Request failed");
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
            <div className="mt-2 text-indigo-100">Reset your password to get back to your dashboard.</div>
            <div className="mt-6">
              <AuthIllustration />
            </div>
          </div>
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-end gap-2 mb-6">
              <a
                href="/login"
                className="px-4 py-1.5 rounded-md border border-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-1.5 rounded-md border border-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                Sign Up
              </a>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-semibold">Forgot password</div>
              <div className="text-sm text-slate-500">Enter your email and we'll send you a reset link</div>
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
              {error && <div className="text-sm text-red-600">{error}</div>}
              {message && <div className="text-sm text-green-600">{message}</div>}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full rounded-full bg-indigo-700 text-white border border-indigo-700 hover:bg-white hover:text-indigo-700 transition-colors"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <div className="text-sm text-slate-600 text-center">
                Remembered it? <button type="button" onClick={() => router.push("/login")} className="text-indigo-600 hover:underline">Back to Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
