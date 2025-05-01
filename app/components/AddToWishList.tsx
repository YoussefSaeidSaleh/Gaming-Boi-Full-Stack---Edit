"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import { useWishlist } from "../context/wishlistContext";

const AddToWishList = ({
  gameId,
  plus,
}: {
  gameId: string;
  plus?: boolean;
}) => {
  const { handleAddToWishList, wishlist } = useWishlist();
  const isInWishList = wishlist.includes(gameId)!!;
  return plus ? (
    isInWishList ? (
      <XCircle onClick={() => handleAddToWishList(gameId)} />
    ) : (
      <PlusCircle onClick={() => handleAddToWishList(gameId)} />
    )
  ) : (
    <Button className=" capitalize" onClick={() => handleAddToWishList(gameId)}>
      {isInWishList ? "Remove From Wishlist" : "Add To Wishlist"}
    </Button>
  );
};

export default AddToWishList;
