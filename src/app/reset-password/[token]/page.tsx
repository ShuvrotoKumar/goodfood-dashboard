"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthIllustration } from "@/components/auth-illustration";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams<{ token: string }>();
  const token = params?.token || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Reset failed");
      }
      setMessage("Password has been reset. You can now login.");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: any) {
      setError(err.message || "Reset failed");
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
            <div className="mt-2 text-indigo-100">Choose a new password for your account.</div>
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
              <div className="text-2xl font-semibold">Reset password</div>
              <div className="text-sm text-slate-500">Enter and confirm your new password</div>
            </div>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm md:text-base font-medium text-slate-700">New Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full ml-0.5 border border-slate-300 rounded-lg bg-white/95 hover:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm md:text-base font-medium text-slate-700">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="input w-full ml-0.5 border border-slate-300 rounded-lg bg-white/95 hover:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition"
                  placeholder="••••••••"
                />
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              {message && <div className="text-sm text-green-600">{message}</div>}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full rounded-full bg-indigo-700 text-white border border-indigo-700 hover:bg-white hover:text-indigo-700 transition-colors"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
