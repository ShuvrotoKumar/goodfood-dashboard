"use client";
import { usePathname, useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";

export function RouteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = pathname === "/login" || pathname === "/signup";
  if (isAuth) return <>{children}</>;
  return <AppShell>{children}</AppShell>;
}
