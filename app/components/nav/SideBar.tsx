"use client";
import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import NavLink from "./NavLink";
import Logo from "../defaults/Logo";
import { useGetUser } from "@/lib/queryFunctions";
import { Menu, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { logout } from "@/app/actions/auth";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import ButtonGame from "../defaults/ButtonGame";
import { IoMdMenu } from "react-icons/io";

const NAV_LINKS = [
  {
    link: "/",
    label: "Home",
    icon: <GoHomeFill />,
  },
  // {
  //   link: "/category",
  //   label: "Category",
  //   icon: <MdDashboard />,
  // },
  {
    link: "/games",
    label: "Games",
    icon: <CgGames />,
  },
  {
    link: "/wishlist",
    label: "Wishlist",
    icon: <FaHeart />,
  },
  // {
  //   link: "/friends",
  //   label: "Friends",
  //   icon: <BsFillPeopleFill />,
  // },
];

const SideBar = () => {
  const { user, isLoading } = useGetUser();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      <ButtonGame 
        icon={isOpen ? <X size={24} /> : <IoMdMenu />}
        text={isOpen ? "Close menu" : "Open menu"}
        onClick={toggleSidebar} 
        className="top-16 md:top-20 left-4 z-50 p-2 rounded-full text-white lg:hidden"
        aria-label={isOpen ? "Close" : "Open"}
      />

      {/* Sidebar - different styles for mobile vs desktop */}
      <div className={`
        fixed inset-y-0 left-0 z-40 
        w-64 bg-black/30 text-gray-50
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:col-span-2 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
      <div className=" py-5 px-10   h-screen sticky inset-0 flex flex-col items-start bg-black/30 text-gray-50">
      <Logo />
          
          <div className="w-full mt-11 space-y-2">
            {NAV_LINKS.map((navLink, i: number) => (
              <div key={i} onClick={() => setIsOpen(false)}>
                <NavLink navLink={navLink} />
              </div>
            ))}
          </div>

          {isLoading ? (
            <div className="mt-auto">
              <Skeleton className="h-4 w-[130px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          ) : user?.data ? (
            <div className="mt-auto w-full">
              <NavLink
                navLink={{
                  link: "/settings",
                  label: "Settings",
                  icon: <Settings />,
                }}
              />
              <Button
                onClick={async () => {
                  const res = await logout();
                  if (res.success) {
                    toast.success(res.success);
                    queryClient.invalidateQueries({ queryKey: ["user"] });
                  } else toast.error(res.error);
                }}
                variant={`destructive`}
                className="w-full mt-2"
              >
                Logout
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Overlay for mobile - only visible when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
