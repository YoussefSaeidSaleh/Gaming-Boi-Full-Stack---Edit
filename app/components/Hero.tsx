"use client";
import React from "react";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import SwiperCards from "./SwiperCards";
import Image from "next/image";
import Cardinfo from "./Cardinfo";

const Hero = () => {
  return (
    <div className="mt-4 sm:mt-6 md:mt-8">
      <SwiperCards
        className="h-[18rem] sm:h-[24rem] md:h-[30rem]"
        paginationImages
        items={[
          {
            card: (
              <section className="relative rounded-2xl overflow-hidden h-full w-full">
                {/* inset-0 is top = 0 , right = 0 , bottom = 0 , left = 0  */}
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  className="object-top object-cover absolute w-full inset-0 h-full"
                >
                  <source src={"/spidervideo.mp4"} type="video/mp4" />
                </video>
                <Cardinfo
                  btnClasses="text-white bg-red-500 hover:bg-red-400"
                  disc={
                    "Peter Parker & Miles Morales return for an exciting new adventure in the acclaimed Marvel's Spider-Man franchise, out October 20 for PS5."
                  }
                  title={"BE GREATER TOGETHER"}
                  image={"/news1title.jpg"}
                />
              </section>
            ),
            src: "/poster.jpg",
          },
          {
            card: (
              <section className="relative rounded-2xl overflow-hidden h-full w-full">
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  className="object-top object-cover absolute w-full inset-0 h-full"
                >
                  <source
                    src={"/call-of-duty-black-animated-hero.mp4"}
                    type="video/mp4"
                  />
                </video>
                <Cardinfo
                  btnClasses="text-white bg-orange-500 hover:bg-orange-400"
                  disc={
                    "Last chance to pre-order and get access to additional premium content. Call of Duty®: Black Ops 6 launches on October 25th"
                  }
                  title={"The truth lies"}
                  image={"/call-of-duty-black-logo.jpg"}
                />
              </section>
            ),
            src: "/call-of-duty-black-hero-desktop.jpg",
          },
          {
            card: (
              <section className="relative rounded-2xl overflow-hidden h-full w-full">
                <Image
                  src={"/Dragon-Ball-Sparking-Zero-Hero-desktop.jpg"}
                  alt="hero"
                  fill
                  className="object-top object-cover absolute w-full inset-0 h-full"
                />
                <Cardinfo
                  btnClasses="text-white bg-red-500 hover:bg-red-400"
                  disc={
                    "A legendary series has returned. Reach new levels of power in Dragon Ball: Sparking! Zero, out now on PS5"
                  }
                  title={"Shake the earth. Break the universe !"}
                  image={"/Dragon-Ball-Sparking-Zero-logo.jpg"}
                />
              </section>
            ),
            src: "/Dragon-Ball-Sparking-Zero-Hero-desktop.jpg",
          },
          {
            card: (
              <section className="relative rounded-2xl overflow-hidden h-full w-full">
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  className="object-top object-cover absolute w-full inset-0 h-full"
                >
                  <source
                    src={"/cyberpunk-phantom-liberty-video-hero.mp4"}
                    type="video/mp4"
                  />
                </video>
                <Cardinfo
                  btnClasses="text-white bg-red-800 hover:bg-red-400"
                  disc={
                    "As cyber-enhanced mercenary V, join secret agent Solomon Reed to unravel a web of sinister political machinations."
                  }
                  title={"Freedom Always Comes At A Price…"}
                  image={"/iconcyber (2).jpg"}
                />
              </section>
            ),
            src: "/cyb.jpg",
          },
        ]}
      />
    </div>
  );
};

export default Hero;
