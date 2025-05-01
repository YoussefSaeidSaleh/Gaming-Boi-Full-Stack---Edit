import React, { ReactNode } from "react";

const GridContainer = ({
  cols,
  children,
  className,
}: {
  cols: number;
  children: ReactNode;
  className?: string;
}) => {
  // Updated grid classes with responsive breakpoints
  const gridClasses = {
    1: `grid grid-cols-1`,
    2: `grid grid-cols-1 sm:grid-cols-2`,
    3: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3`,
    4: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`,
    5: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`,
    6: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`,
    7: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7`,
    8: `grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8`,
    9: `grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9`,
    10: `grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10`,
    11: `grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11`,
    12: `grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12`,
  }[cols] || "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${className || ""} ${gridClasses}`}>{children}</div>
  );
};

export default GridContainer;
