import Link from "next/link";
import { BookOpen,  Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto bg-[#dff1ff] text-[#243b53]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-14">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="BookNook home">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/70 text-[#2878a5]"><BookOpen size={21} /></span>
            <span className="text-xl font-semibold tracking-tight">Book<span className="text-[#2878a5]">Nook</span></span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">A cozy corner for readers to discover new stories, share favorite books, and keep good reads moving.</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#2878a5]">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li><Link href="/" className="transition hover:text-sky-800">Home</Link></li>
            <li><Link href="/books" className="transition hover:text-sky-800">All Books</Link></li>
            <li><Link href="/login" className="transition hover:text-sky-800">Join BookNook</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#2878a5]">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-3"><Mail size={16} className="shrink-0 text-[#2878a5]" /><a href="mailto:hello@booknook.com" className="transition hover:text-sky-800">hello@booknook.com</a></li>
            <li className="flex items-center gap-3"><Phone size={16} className="shrink-0 text-[#2878a5]" /><a href="tel:+8801700000000" className="transition hover:text-sky-800">+880 1700-000000</a></li>
            <li className="flex items-center gap-3"><MapPin size={16} className="shrink-0 text-[#2878a5]" /><span>Dhaka, Bangladesh</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sky-200">
       
      </div>
    </footer>
  );
}
