import React from "react";
import Image from "next/image";
import SwiperCards from "../components/SwiperCards";
import Link from "next/link";
import Heading from "./Heading";
import AddToWishList from "./AddToWishList";

const GamesSlider = ({
  games,
  title,
  slidesPerView,
  tabletSlidesPerView,
  mobileSlidesPerView,
  big,
  screenBig,
}: {
  games: Game[];
  title: string;
  slidesPerView?: number;
  tabletSlidesPerView?: number;
  mobileSlidesPerView?: number;
  big?: boolean;
  screenBig?: boolean;
}) => {
  return (
    <div>
      <div className=" flex flex-col gap-6 mt-14">
        <Heading text={title} />
        <SwiperCards
          className="h-full"
          slidesPerView={slidesPerView || 4}
          tabletSlidesPerView={tabletSlidesPerView}
          mobileSlidesPerView={mobileSlidesPerView}
          items={games.map((game: Game) => {
            return {
              // !
              src: game.background_image,
              card: big ? (
                <div className=" flex overflow-hidden items-center bg-[#333839] rounded-2xl">
                  <div className=" flex w-[60%]  px-6 flex-col items-start">
                    <h1 className=" text-xl border-b-2 pb-3 w-full border-neutral-100 font-semibold text-white">
                      {game.name}
                    </h1>
                    <p className=" text-sm line-clamp-4 pt-3 text-gray-100">
                      {game.description_raw}
                    </p>
                  </div>
                  <div className="w-[40%] h-64 relative">
                    <Image
                      className=" group-hover:scale-125 group-hover:rotate-6 duration-200 object-cover"
                      fill
                      src={game.background_image}
                      alt={game.name}
                    />
                  </div>
                </div>
              ) : (
                <div className=" relative cursor-pointer group ">
                  <div
                    className="  after:absolute after:inset-0 after:w-0 group-hover:w-full hover:after:w-full after:h-full
                               after:bg-rose-500/60 after:rounded-2xl after:duration-200  w-full h-96 rounded-2xl overflow-hidden relative"
                  >
                    <Image
                      className=" group-hover:scale-125 group-hover:rotate-6 duration-200 object-cover"
                      fill
                      src={game.background_image}
                      alt={game.name}
                    />
                  </div>
                  <Link
                    href={`/game/${game.id}`}
                    className=" text-base line-clamp-1 mt-2 text-white font-semibold"
                  >
                    {game.name}
                  </Link>
                  <div className=" absolute top-2 left-4">
                    <AddToWishList plus gameId={game.id.toString()} />
                  </div>
                </div>
              ),
            };
          })}
        />
      </div>
    </div>
  );
};

export default GamesSlider;