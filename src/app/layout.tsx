import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuma | SaaS Starter",
  description: "A secure starting point for your SaaS application.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
