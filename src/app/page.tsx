import Link from "next/link";
import { NavBar } from "@/components/nav-bar";

export default function HomePage() {
  return <><NavBar /><main className="mx-auto max-w-6xl px-6 py-24"><div className="max-w-2xl"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-800">A thoughtful SaaS foundation</p><h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Build your next big idea on solid ground.</h1><p className="mt-6 text-lg leading-8 text-slate-600">Authentication, role-aware routes, an audit-ready database, and a clean dashboard shell — ready for your product.</p><div className="mt-9 flex gap-3"><Link href="/register" className="rounded-lg bg-emerald-800 px-5 py-3 font-medium text-white hover:bg-emerald-900">Create your account</Link><Link href="/login" className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-50">Log in</Link></div></div></main></>;
}
