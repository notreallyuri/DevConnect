"use client";
import cn from "@/utils/cn";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@awesome.me/kit-a322175488/icons/classic/regular";

interface Embeds {
  type: "link" | "image" | "snippet" | "video";
  url: string;
}

interface Comments {
  id: string;
  author: string;
  content: string;
}

interface PostProps {
  title: string;
  tags?: Readonly<{ label: string }>[];
  embeds?: Embeds[];
  comments?: Comments[];
  children?: Readonly<React.ReactNode>;
}

export default function Post({ title, tags, embeds, children }: PostProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="mb-6 w-full max-w-200 rounded-lg bg-zinc-800 p-3">
      <div>
        <h1 className="mb-2 text-2xl font-semibold text-white">{title}</h1>
        <div className="my-2 pb-1">
          <h2 className="mb-1 font-medium">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags ? (
              tags.map((s, index) => (
                <div
                  key={index}
                  className="w-fit rounded-full border border-white/40 bg-black/25 px-4"
                >
                  <p className="text-sm text-gray-100">{s.label}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-300">No tag provided</p>
            )}
          </div>
        </div>
        <div className="relative overflow-clip rounded-lg bg-black/40 font-medium">
          {children && (
            <div
              className={cn(
                "overflow-hidden ease-in-out",
                isActive ? "max-h-full" : "max-h-18",
              )}
            >
              <p className={cn("p-2 pb-8 text-sm text-gray-200")}>{children}</p>
            </div>
          )}
          <button
            onClick={() => setIsActive((prev) => !prev)}
            className={cn(
              "absolute right-0 bottom-0 left-0 flex h-5",
              "w-full cursor-pointer items-center justify-center",
              !isActive && "bg-gradient-to-t from-black",
            )}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className={cn(
                "transition-transform duration-300",
                isActive && "rotate-180",
              )}
            />
          </button>
        </div>
      </div>
      {embeds && embeds.length > 0 && (
        <div className="mt-3">
          {embeds.map((e, index) => (
            <div key={index}></div>
          ))}
        </div>
      )}
    </div>
  );
}
