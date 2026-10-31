"use client";

import dynamic from "next/dynamic";

const BannerSlider = dynamic(() => import("@/components/banner-slider"), {
  ssr: false,
  loading: () => <div aria-label="Loading featured books" className="min-h-[490px] animate-pulse bg-[#fff4f4] sm:min-h-[540px]" />,
});

export function Banner() {
  return <BannerSlider />;
}
