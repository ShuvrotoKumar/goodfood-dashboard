"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !dark;
    setDark(next);
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("gf-theme", next ? "dark" : "light");
    } catch {}
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gf-theme");
      if (saved) {
        const next = saved === "dark";
        document.documentElement.classList.toggle("dark", next);
        setDark(next);
      }
    } catch {}
  }, []);

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 rounded-xl px-4 py-2 flex items-center gap-2 bg-black text-white shadow-lg hover:shadow-xl active:scale-[.98] transition dark:bg-white dark:text-black"
    >
      {dark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
      <span className="text-sm font-medium">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
