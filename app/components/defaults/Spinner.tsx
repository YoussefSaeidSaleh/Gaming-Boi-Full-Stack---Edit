import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const Spinner = () => {
  return (
    <span className=" h-11 w-14 flex justify-center">
      <BiLoaderCircle className=" block w-6 h-6 text-rose-400 text-center animate-spin" />
    </span>
  );
};

export default Spinner;
