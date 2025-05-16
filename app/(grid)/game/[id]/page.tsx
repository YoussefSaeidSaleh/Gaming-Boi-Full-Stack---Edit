import { getGame } from "@/app/api/api";
import GamesSlider from "@/app/components/GamesSlider";
import SwiperCards from "@/app/components/SwiperCards";
import Image from "next/image";
import React from "react";

/**
 * Next.js 15: `params` هو Promise
 */
type PageParams = Promise<{ id: string }>;

const Page = async ({ params }: { params: PageParams }) => {
  // لازم تستنى الـ Promise
  const { id } = await params;

  const {
    screenshots,
    data,
    similar,
  }: { screenshots: any; data: Game; similar: any } = await getGame(id);

  return (
    <div className="mt-10">
      <div className="col-span-4 flex flex-col gap-2">
        <h1 className="text-2xl text-white">{data.name}</h1>
        <div>Rating count : {data.ratings_count}</div>

        <SwiperCards
          slidesPerView={1}
          className="h-full"
          items={[
            ...screenshots.results,
            data.background_image,
            data.background_image,
          ]
            .filter(Boolean)
            .map((screenshot) => ({
              card: (
                <div className="relative h-[36rem] w-full overflow-hidden rounded-xl">
                  <Image
                    src={screenshot.image || screenshot}
                    alt={data.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ),
              src: screenshot.image || screenshot,
            }))}
          paginationImages
        />

        <p className="col-span-2 mt-10">{data.description_raw}</p>
      </div>

      <GamesSlider
        title="Similar Games"
        games={similar.results}
        slidesPerView={3}
        tabletSlidesPerView={3}
        mobileSlidesPerView={2}
      />
    </div>
  );
};

export default Page;
