import Link from "next/link";

export function NavBar({ signedIn = false }: { signedIn?: boolean }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Main navigation">
        <Link href="/" className="text-lg font-bold tracking-tight text-emerald-800">tuma<span className="text-slate-400">.</span></Link>
        <div className="flex items-center gap-5 text-sm font-medium text-slate-600">
          {signedIn ? <><Link href="/dashboard" className="hover:text-emerald-800">Dashboard</Link><Link href="/admin" className="hover:text-emerald-800">Admin</Link><form action="/api/auth/logout" method="post"><button className="rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50">Log out</button></form></> : <><Link href="/login" className="hover:text-emerald-800">Log in</Link><Link href="/register" className="rounded-lg bg-emerald-800 px-4 py-2 text-white hover:bg-emerald-900">Get started</Link></>}
        </div>
      </nav>
    </header>
  );
}
