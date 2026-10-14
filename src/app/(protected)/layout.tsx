import { NavBar } from "@/components/nav-bar";
import { requireUser } from "@/lib/auth";

export default async function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireUser();
  return <><NavBar signedIn /><main className="mx-auto min-h-[calc(100vh-65px)] max-w-6xl px-6 py-10">{children}</main></>;
}
