import Filters from "@/app/components/Filters";
import Heading from "@/app/components/Heading";
import { APIURL, KEY } from "@/app/constants";
import React from "react";

const page = async () => {
  const data = await fetch(`${APIURL}genres?key=${KEY}`).then((res) =>
    res.json()
  );
  const genres = data.results.slice(0, 15);
  return (
    <div className="mt-10 relative flex flex-col gap-5">
      <Heading text="Games From Genres" />
      <Filters genres={genres} />
    </div>
  );
};

export default page;
