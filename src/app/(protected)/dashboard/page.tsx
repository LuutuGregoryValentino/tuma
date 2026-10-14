import { getUserById, requireUser } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await requireUser();
  const user = await getUserById(session.userId);
  return <><p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">Workspace</p><h1 className="mt-2 text-3xl font-semibold">Your dashboard</h1><p className="mt-2 text-slate-600">Welcome{user?.name ? `, ${user.name}` : ""}. Your product starts here.</p><section className="mt-8 grid gap-4 sm:grid-cols-3"><article className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Account</p><p className="mt-2 font-semibold">{user?.email ?? "Account details"}</p></article><article className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Role</p><p className="mt-2 font-semibold capitalize">{session.role}</p></article><article className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Status</p><p className="mt-2 font-semibold text-emerald-800">Active</p></article></section></>;
}
