import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-4xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-ar-md border border-ar-border bg-ar-surface p-4 transition-shadow duration-ar-base hover:shadow-ar-md dark:border-white/[0.2] dark:bg-neutral-900",
        className,
      )}
    >
      {header}
      <div className="transition-transform duration-ar-fast group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-semibold text-ar-foreground dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-body-sm font-normal text-ar-fg-muted dark:text-neutral-400">
          {description}
        </div>
      </div>
    </div>
  );
};
