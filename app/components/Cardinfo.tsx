import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import MotionItem from "./defaults/MotionItem";

const Cardinfo = ({
  disc,
  title,
  image,
  textBtn,
  btnClasses,
}: {
  disc: string;
  title: string;
  image: string;
  textBtn?: string;
  btnClasses?: string;
}) => {
  return (
    <MotionItem
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      className="flex flex-col items-start absolute 
                 left-4 sm:left-8 md:left-16 lg:left-20 
                 top-4 sm:top-8 md:top-16 lg:top-20 
                 max-w-[90%] sm:max-w-xs md:max-w-sm lg:max-w-md 
                 p-3 sm:p-4"
    >
      <div className="w-full h-12 sm:h-16 md:h-24 lg:h-40 relative mb-2 sm:mb-3">
        <Image src={image} alt={title} fill className="object-contain object-left" />
      </div>
      <h1 className="text-white text-lg sm:text-xl md:text-2xl font-semibold line-clamp-2">{title}</h1>
      <p className="text-sm sm:text-base text-gray-200 line-clamp-3 md:line-clamp-4">{disc}</p>
      <Button 
        className={`rounded-full mt-2 sm:mt-3 md:mt-4 lg:mt-5 
                   text-xs sm:text-sm md:text-base
                   px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2
                   ${btnClasses || "text-gray-50"}`}
      >
        {textBtn || "Find out more !"}
      </Button>
    </MotionItem>
  );
};

export default Cardinfo;