"use client";

import Empty from "@/app/components/defaults/Empty";
import GridContainer from "@/app/components/defaults/GridContainer";
import GameCard from "@/app/components/GameCard";
import GameSkeleton from "@/app/components/GameSkeleton";
import Heading from "@/app/components/Heading";
import { useWishlist } from "@/app/context/wishlistContext";
import { useGetGameWithIds } from "@/lib/queryFunctions";
import React from "react";

const page = () => {
  const { wishlist } = useWishlist();
  const { games, isLoading } = useGetGameWithIds(wishlist);
  return (
    <div className=" mt-10 flex flex-col gap-4">
      <Heading text="My WishList ❤️" />
      <GridContainer className=" gap-5" cols={4}>
        {isLoading ? (
          <GameSkeleton />
        ) : games && games.length > 0 ? (
          games?.map((game: any, i) => (
            <GameCard
              key={i}
              wishlist={true}
              game={{ ...game.data, short_screenshots: game.screenshots }}
            />
          ))
        ) : (
          <Empty />
        )}
      </GridContainer>
    </div>
  );
};

export default page;
