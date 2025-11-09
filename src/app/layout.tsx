import "./globals.css";
import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GoodFood Dashboard",
  description: "Admin dashboard UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
