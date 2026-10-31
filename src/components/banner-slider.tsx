"use client";

import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { label: "THE BOOKWORM EDITORS' PICKS", title: "Featured Books of the Month", description: "Find a story to love, borrow it for a few days, then pass it along to another reader.", cover: "Episodes of the Road", color: "bg-[#50644f]" },
  { label: "FRESH FROM THE BOOKSHELF", title: "A New Story Is Waiting", description: "Explore the shelves, discover a new favorite, and make room for one more good read.", cover: "Letters from the Sea", color: "bg-[#587d8b]" },
  { label: "READ IT. LOVE IT. SHARE IT.", title: "Good Books Keep Moving", description: "Borrow a book from the community and return it when you are ready for your next chapter.", cover: "Small Wonders", color: "bg-[#946b61]" },
];

export default function BannerSlider() {
  return (
    <section aria-label="Featured books" className="bg-[#fff4f4]">
      <Swiper modules={[Autoplay, Pagination]} slidesPerView={1} loop autoplay={{ delay: 5000, disableOnInteraction: false }} pagination={{ clickable: true }} className="booknook-banner">
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative mx-auto grid min-h-[490px] max-w-7xl items-center gap-10 overflow-hidden px-6 py-14 sm:px-10 md:grid-cols-2 lg:min-h-[540px] lg:px-16">
              <div className="absolute -bottom-40 -left-32 size-96 rounded-full bg-[#f2dfe1]" />
              <div className="relative z-10 max-w-xl">
                <p className="text-xs font-bold tracking-[0.16em] text-[#a59495]">{slide.label}</p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-[#242124] sm:text-5xl">{slide.title}</h1>
                <p className="mt-5 max-w-lg text-base leading-7 text-[#6d6263]">{slide.description}</p>
                <Link href="/books" className="mt-7 inline-flex bg-[#242124] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#3b5265]">Browse Books</Link>
              </div>
              <div className="relative mx-auto flex h-[260px] w-full max-w-[450px] items-center justify-center sm:h-[310px]">
                <div className="absolute left-[5%] top-[26%] flex h-[190px] w-[125px] -rotate-12 items-end rounded-md bg-gradient-to-br from-slate-700 to-rose-400 p-3 text-xs font-semibold text-white shadow-lg sm:left-[8%] sm:h-[220px] sm:w-[145px]">A good story</div>
                <div className="absolute right-[5%] top-[25%] flex h-[190px] w-[125px] rotate-12 items-end rounded-md bg-gradient-to-br from-amber-500 to-orange-800 p-3 text-xs font-semibold text-white shadow-lg sm:right-[8%] sm:h-[220px] sm:w-[145px]">New adventures</div>
                <div className={`relative z-10 flex h-[240px] w-[165px] flex-col justify-between rounded-md ${slide.color} p-5 text-white shadow-xl sm:h-[285px] sm:w-[195px] sm:p-6`}>
                  <span className="text-[9px] font-semibold tracking-[0.2em] text-white/75">BOOKNOOK PICKS</span>
                  <span className="text-3xl font-semibold leading-tight">{slide.cover}</span>
                  <span className="text-[9px] tracking-[0.18em] text-white/80">A STORY TO SHARE</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .booknook-banner .swiper-pagination { bottom: 18px !important; }
        .booknook-banner .swiper-pagination-bullet { background: #bca9aa; opacity: .7; }
        .booknook-banner .swiper-pagination-bullet-active { background: #242124; opacity: 1; }
      `}</style>
    </section>
  );
}
