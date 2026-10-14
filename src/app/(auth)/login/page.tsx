import Link from "next/link";
import { NavBar } from "@/components/nav-bar";

export default function LoginPage() {
  return <><NavBar /><main className="mx-auto max-w-md px-6 py-16"><h1 className="text-3xl font-semibold">Welcome back</h1><p className="mt-2 text-slate-600">Log in to continue to your workspace.</p><form action="/api/auth/login" method="post" className="mt-8 space-y-4"><label className="block text-sm font-medium">Email<input required type="email" name="email" autoComplete="email" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5" /></label><label className="block text-sm font-medium">Password<input required type="password" name="password" autoComplete="current-password" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5" /></label><button className="w-full rounded-lg bg-emerald-800 px-4 py-3 font-medium text-white">Log in</button></form><p className="mt-6 text-sm text-slate-600">New here? <Link className="font-medium text-emerald-800" href="/register">Create an account</Link></p></main></>;
}
