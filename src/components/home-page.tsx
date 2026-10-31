import { Banner } from "@/components/banner";
import Link from "next/link";
import { ArrowRight, BookMarked, BookOpen, FlaskConical, Heart, Search, Star } from "lucide-react";

const categories = [
  { name: "Fiction", detail: "Novels, fantasy & more", href: "/books?category=fiction", icon: BookOpen, color: "bg-[#e9e3f5] text-[#68558b]", count: "Stories to get lost in" },
  { name: "Nonfiction", detail: "True stories & ideas", href: "/books?category=nonfiction", icon: BookMarked, color: "bg-[#f7e8df] text-[#a26246]", count: "Knowledge worth sharing" },
  { name: "Science", detail: "Discover how it works", href: "/books?category=science", icon: FlaskConical, color: "bg-[#dcefe9] text-[#407b67]", count: "Curiosity starts here" },
];

const steps = [
  { number: "01", title: "Find a book", detail: "Browse the shelves and choose a book that catches your eye.", icon: Search },
  { number: "02", title: "Borrow & enjoy", detail: "Borrow it for a few days and enjoy your next great read.", icon: BookOpen },
  { number: "03", title: "Return it", detail: "Send the book back when you finish, ready for its next reader.", icon: BookMarked },
];

export function HomePage() {
  return (
    <>
      <Banner />

      <section className="bg-[#f8fafc] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Pick your next read</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#243b53] sm:text-4xl">Explore the shelves</h2>
              <p className="mt-3 max-w-xl leading-7 text-slate-600">From make-believe worlds to real discoveries, find a book to borrow and enjoy.</p>
            </div>
            <Link href="/books" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-800 transition hover:gap-3">Browse all books <ArrowRight size={17} /></Link>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {categories.map(({ name, detail, href, icon: Icon, color, count }) => (
              <Link key={name} href={href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg sm:p-7">
                <div className={`flex size-12 items-center justify-center rounded-2xl ${color}`}><Icon size={23} strokeWidth={1.8} /></div>
                <p className="mt-6 text-xs font-medium uppercase tracking-wider text-slate-400">{count}</p>
                <div className="mt-2 flex items-center justify-between"><h3 className="text-xl font-semibold text-[#243b53]">{name}</h3><ArrowRight size={19} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-700" /></div>
                <p className="mt-1 text-sm text-slate-500">{detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf6ff] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">A little library, shared</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#243b53] sm:text-4xl">Good books keep moving.</h2>
            <p className="mt-4 max-w-lg leading-7 text-slate-600">BookNook makes it easy to find a book, borrow it for a few days, and return it for the next reader. That’s all it takes to keep a community bookshelf going.</p>
            <Link href="/books" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#334e68] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#243b53]">Find a book <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map(({ number, title, detail, icon: Icon }) => (
              <article key={number} className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between"><span className="text-sm font-bold tracking-widest text-sky-700">{number}</span><Icon size={20} className="text-sky-700" /></div>
                <h3 className="mt-8 text-lg font-semibold text-[#243b53]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Notes from our readers</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#243b53] sm:text-4xl">A good read is worth sharing</h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">A few kind words from readers keeping the BookNook shelves in motion.</p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              { quote: "Found a novel I would never have picked up. Ended up reading it in two evenings!", name: "Nadia R.", initials: "NR", book: "Fiction reader" },
              { quote: "Borrowing is simple, and returning the book for someone else feels really good.", name: "Imran K.", initials: "IK", book: "Community member" },
              { quote: "The science shelf has become my favorite place to find something new to learn.", name: "Tania S.", initials: "TS", book: "Curious reader" },
            ].map((review) => (
              <article key={review.name} className="rounded-3xl border border-slate-200 bg-[#fbfdff] p-6 sm:p-7">
                <div className="flex gap-1 text-amber-500" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
                <Heart size={18} className="mt-5 text-sky-700" />
                <blockquote className="mt-3 min-h-20 text-[15px] leading-7 text-slate-700">“{review.quote}”</blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5"><span className="flex size-10 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-800">{review.initials}</span><div><p className="text-sm font-semibold text-[#243b53]">{review.name}</p><p className="text-xs text-slate-500">{review.book}</p></div></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

