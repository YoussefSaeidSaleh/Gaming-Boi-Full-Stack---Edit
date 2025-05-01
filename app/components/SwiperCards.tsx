"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import SwiperType from "swiper";

const SwiperCards = ({
  items,
  paginationImages,
  className,
  slidesPerView,
  tabletSlidesPerView,
  mobileSlidesPerView,
}: {
  items: { src: string; card: ReactNode }[];
  paginationImages?: boolean;
  className?: string;
  slidesPerView?: number;
  tabletSlidesPerView?: number;
  mobileSlidesPerView?: number;
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 3.7));
    }, 110);
    return () => clearInterval(t);
  }, [progress]);

  useEffect(() => {
    swiper?.on("slideChange", () => {
      setProgress(0);
    });
  }, [swiper]);

  return (
    <div className=" flex flex-col gap-4">
      <Swiper
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        className={` w-full relative ${className || "h-96"}`}
        spaceBetween={20}
        slidesPerView={slidesPerView || 1}
        breakpoints={{
          // عندما يكون العرض >= 1024px (شاشات كبيرة)
          1024: {
            slidesPerView: slidesPerView || 1,
          },
          // عندما يكون العرض >= 768px (تابلت)
          768: {
            slidesPerView: tabletSlidesPerView || 1,
          },
          // عندما يكون العرض < 768px (موبايل)
          0: {
            slidesPerView: mobileSlidesPerView || 1,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {items.map(({ card }, i) => (
          <SwiperSlide key={i}>{card}</SwiperSlide>
        ))}
      </Swiper>
      <div className=" hidden md:flex items-center gap-4 mt-2">
        {paginationImages &&
          items.map(({ src }, i) => (
            <div
              onClick={() => {
                swiper?.slideTo(i);
                swiper?.autoplay.stop();
              }}
              key={i}
              className={` ${
                swiper?.realIndex === i &&
                "  shadow-md -translate-y-5 border-rose-500 border opacity-90"
              } cursor-pointer hover:-translate-y-5 z-10 hover:shadow-md duration-200 hover:opacity-90 rounded-xl 
              overflow-hidden max-w-lg w-full h-40 relative`}
            >
              {swiper?.realIndex === i && swiper.autoplay.running && (
                <div
                  style={{ width: `${progress}%` }}
                  className=" duration-200 absolute w-0 h-full inset-0 bg-gray-600 opacity-50 z-10"
                ></div>
              )}
              {src && src !== "" ? (
                <Image
                  alt={"Image-pagination"}
                  src={src}
                  fill
                  className=" object-cover"
                />
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SwiperCards;