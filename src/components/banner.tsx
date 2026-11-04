"use client";

import dynamic from "next/dynamic";

const BannerSlider = dynamic(() => import("@/components/banner-slider"), {
  ssr: false,
  loading: () => <div aria-label="Loading featured books" className="min-h-122.5 animate-pulse bg-[#fff4f4] sm:min-h-135" />,
});

export function Banner() {
  return <BannerSlider />;
}
