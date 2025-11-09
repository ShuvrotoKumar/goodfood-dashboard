"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = typeof localStorage !== "undefined" && localStorage.getItem("gf-theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 360) {
        // lightweight toast/alert
        const el = document.createElement("div");
        el.textContent = "For best experience, use larger screen";
        el.className = "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black text-white text-xs px-3 py-2 rounded-full shadow-lg dark:bg-white dark:text-black";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2500);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr]">
      {/* Desktop sidebar */}
      <div className="hidden md:block"><Sidebar /></div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-sidebar shadow-xl">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <main className="container-page">{children}</main>
      </div>

      <ThemeToggle />
    </div>
  );
}
