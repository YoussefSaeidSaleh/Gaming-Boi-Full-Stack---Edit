import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const MaxWidthWrapper = ({
  children,
  className,
  noPadding,
  customPadding,
}: {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  customPadding?: string;
}) => {
  return (
    <section
      className={cn(
        "max-w-[1375px] w-full px-4 sm:px-6 md:px-10 lg:px-20",
        className || "",
        { "py-0": noPadding && !customPadding },
        { "py-4 sm:py-6 md:py-8": !noPadding && !customPadding },
         customPadding 
      )}
    >
      {children}
    </section>
  );
};

export default MaxWidthWrapper;
