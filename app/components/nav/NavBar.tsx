"use client";
import React from "react";
import Search from "../Search";
import ButtonGame from "../defaults/ButtonGame";
import { useGetUser } from "@/lib/queryFunctions";
import User from "../User";
import SkeletonCustom from "../SkeletonCustom";

const NavBar = () => {
  const { user, isLoading } = useGetUser();
  
  return (
    <nav className="w-full py-4">
      {/* Desktop and Tablet Layout - Elements side by side */}
      <header className="hidden sm:flex sm:flex-row justify-between items-center gap-4">
        {/* Search component */}
        <div className=" sm:w-[45%] ml-24 lg:ml-0">
          <Search />
        </div>
        
        {/* User authentication section */}
        <div className="flex items-center justify-center">
          {isLoading ? (
            <SkeletonCustom circle />
          ) : user?.data ? (
            <User user={user.data} />
          ) : (
            <div className="flex items-center gap-2">
              <ButtonGame link="/login" text="Login" />
              <ButtonGame link="/signup" text="Sign up" />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Layout - Login/Signup on top, Search below */}
      <header className="flex flex-col sm:hidden justify-between items-center gap-4">
        {/* User authentication section - first on mobile */}
        <div className="flex items-center justify-end w-full">
          {isLoading ? (
            <SkeletonCustom circle />
          ) : user?.data ? (
            <User user={user.data} />
          ) : (
            <div className="flex items-center gap-2">
              <ButtonGame link="/login" text="Login" />
              <ButtonGame link="/signup" text="Sign up" />
            </div>
          )}
        </div>
        
        {/* Search component - second on mobile */}
        <div className="w-full">
          <Search />
        </div>
      </header>
    </nav>
  );
};

export default NavBar;
