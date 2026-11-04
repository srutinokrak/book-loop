"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
];

const privateLinks = [
  { label: "Add Book", href: "/books/add" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

export function Navbar() {
  const { data: session } = authClient.useSession();

  const user = session?.user;


  // const [user, setUser] = useState<{ name: string; photo: string } | null>(null);

  const handleLogout = () =>{
    authClient.signOut()
  }
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;
  // const links = [...publicLinks, ...privateLinks];
  return (
    <header className="sticky top-0 z-50 border-b border-sky-200 bg-[#eaf6ff]/95 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="BookNook home"
        >
          <span className="flex size-11 items-center justify-center rounded-2xl bg-[#334e68] text-white shadow-sm transition-transform group-hover:-rotate-3">
            <BookOpen size={22} strokeWidth={1.8} />
          </span>
          <span className="font-(family-name:--font-geist-sans) text-[22px] font-semibold tracking-tight text-[#243b53]">
            Book<span className="text-[#2da7db]">Nook</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2.5 text-base font-semibold text-slate-600 transition-all duration-200 hover:bg-sky-100 hover:text-sky-800"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                aria-label="Open account menu"
                className="flex items-center gap-2 rounded-full border border-stone-200 bg-white p-1.5 pr-3 transition hover:border-[#b9c8b8]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Avatar className="size-9">
                  <AvatarImage referrerPolicy="no-referrer" src={user.image ?? undefined} alt={user.name} />
                  <AvatarFallback>
                    {user.name?.trim().charAt(0).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown
                  size={15}
                  className={`text-stone-500 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] w-60 rounded-2xl border border-stone-200 bg-white p-2 shadow-xl shadow-stone-900/10">
                  <div className="border-b border-stone-100 px-3 py-3">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-400">
                      Signed in as
                    </p>
                    <p className="mt-1 truncate font-semibold text-[#243b30]">
                      {user.name}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-[#315c48]"
                  >
                    <UserRound size={17} /> My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#a44d3f] hover:bg-[#fbf3f0]"
                  >
                    <LogOut size={17} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#334e68] transition hover:bg-sky-100 hover:text-sky-800"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#334e68] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#243b53]"
              >
                Create account
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          className="flex size-10 items-center justify-center rounded-full text-[#334e68] hover:bg-sky-100 lg:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-sky-200 bg-[#eaf6ff] px-5 pb-5 pt-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-slate-600 transition-colors hover:bg-sky-100 hover:text-sky-800"
              >
                {label}
              </Link>
            ))}
            {user ? (
              <>
                <div className="mt-2 border-t border-stone-200 pt-3 text-sm font-medium text-stone-500">
                  {user.name}
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-stone-600 hover:bg-[#f1f1e9]"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-xl px-3 py-3 text-left font-medium text-[#a44d3f] hover:bg-[#fbf3f0]"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-3 flex gap-3 border-t border-stone-200 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full border border-slate-300 py-2.5 text-center text-sm font-semibold text-[#334e68]"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full bg-[#334e68] py-2.5 text-center text-sm font-semibold text-white"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
