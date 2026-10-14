import { requireAdmin } from "@/lib/auth";

export default async function AdminPage() {
  await requireAdmin();
  return <><p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">Platform</p><h1 className="mt-2 text-3xl font-semibold">Admin panel</h1><p className="mt-2 text-slate-600">Administrative tools and platform metrics will live here.</p><section className="mt-8 rounded-xl border border-slate-200 bg-white p-6"><h2 className="font-semibold">Getting started</h2><p className="mt-2 text-sm leading-6 text-slate-600">Review audit events, manage users, and configure platform settings from this protected area.</p></section></>;
}
