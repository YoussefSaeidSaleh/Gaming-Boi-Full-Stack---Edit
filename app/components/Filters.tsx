"use client";

import React, { useState } from "react";
import GridContainer from "./defaults/GridContainer";
import { useGetGames } from "@/lib/queryFunctions";
import GameSkeleton from "./GameSkeleton";
import GameCard from "./GameCard";
import Empty from "./defaults/Empty";
import PaginationCustom from "./PaginationCustom";

const Filters = ({ genres }: { genres: any[] }) => {
  const [page, setPage] = useState(1);
  const [activeGenres, setActiveGenres] = useState<number[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { games, isLoading } = useGetGames({
    page,
    filters:
      activeGenres.length > 0
        ? [{ filterName: "genres", option: activeGenres?.join(",") }]
        : [],
  });
  const totalPage = Math.ceil(games?.data.count / 21);

  return (
    <div className="w-full">
      {/* Mobile Filter Toggle Button */}
      <div className="flex justify-between items-center mb-4 2xl:hidden">
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 bg-[#333839] text-white px-4 py-2 rounded-xl"
        >
          <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
        </button>
        <div className="text-white text-sm">
          {activeGenres.length > 0 ? `${activeGenres.length} filters applied` : 'No filters applied'}
        </div>
      </div>

      <GridContainer className="gap-5 relative" cols={11}>
        {/* Filters Section - Different styling for screens >= 1500px (2xl) */}
        <div className={`
          col-span-full 2xl:col-span-2
          ${isFilterOpen ? 'block' : 'hidden 2xl:block'}
          transition-all duration-300
          2xl:sticky 2xl:h-screen 2xl:top-0
        `}>
          <div className="
            flex flex-col gap-3 bg-[#333839] py-4 px-3 sm:px-4 md:px-6 lg:px-8 rounded-2xl
            2xl:py-6 2xl:px-10
          ">
            <h3 className="text-white font-semibold text-lg mb-2 px-2 2xl:text-xl 2xl:mb-4">Genres</h3>
            
            <div className="
              flex flex-row flex-wrap 2xl:flex-col gap-2 md:gap-3 2xl:gap-4
            ">
              {genres.map((genre: any, i: number) => (
                <button
                  onClick={() => {
                    activeGenres.includes(genre.id)
                      ? setActiveGenres(
                          activeGenres.filter((id) => id !== genre.id)
                        )
                      : setActiveGenres([...activeGenres, genre.id]);
                  }}
                  className={`
                    ${activeGenres.includes(genre.id) 
                      ? "bg-rose-500 text-white" 
                      : "bg-[#444849] text-gray-100 hover:bg-[#505455]"
                    } 
                    text-sm md:text-base rounded-xl px-3 py-2 
                    transition-colors duration-200
                    flex-grow sm:flex-grow-0
                    2xl:py-3 2xl:px-5 2xl:text-lg 2xl:w-full 2xl:text-center
                  `}
                  key={i}
                >
                  {genre.name}
                </button>
              ))}
            </div>
            
            {activeGenres.length > 0 && (
              <button 
                onClick={() => setActiveGenres([])}
                className="mt-3 text-sm text-rose-300 hover:text-rose-100 self-start px-2 2xl:mt-6 2xl:text-base"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Games Grid */}
        <GridContainer 
          cols={3} 
          className="gap-3 col-span-full 2xl:col-span-9 2xl:gap-5"

        >
          {isLoading ? (
            <GameSkeleton number={21} />
          ) : games?.data.results.length > 0 ? (
            games?.data.results.map((game: Game) => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <Empty message="Sorry, no games found in this page" />
          )}
        </GridContainer>

        {/* Pagination */}
        <div className="col-span-full 2xl:col-start-3 2xl:col-span-9">
          <PaginationCustom setPage={setPage} page={page} count={totalPage} />
        </div>
      </GridContainer>
    </div>
  );
};

export default Filters;