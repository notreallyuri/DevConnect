"use client";
import Nav from "@/components/(public)/(LP)/nav";
import cn from "@/utils/cn";
import LPInput from "@/components/(public)/(LP)/input";
import InfoSquare from "@/components/(public)/(LP)/info";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import {
  faSearch,
  faUsers,
  faCubes,
  faBookmark,
  faShare,
  faComment,
} from "@awesome.me/kit-a322175488/icons/classic/solid";

export default function Home() {
  const Box = ({ label, colors }: { label: string; colors: string }) => {
    return (
      <div
        className={cn(
          "flex h-5 w-20 items-center justify-center rounded-full text-xs",
          "font-medium select-none",
          colors,
        )}
      >
        {label}
      </div>
    );
  };

  interface BoxProps {
    id: number;
    label: string;
    colors: string;
    position: number;
    speed: number;
  }

  const allBoxes = useMemo(
    () => [
      { id: 1, label: "Go", colors: "text-sky-200 bg-sky-300/25" },
      { id: 2, label: "TypeScript", colors: "text-blue-500 bg-blue-600/25" },
      {
        id: 3,
        label: "JavaScript",
        colors: "text-yellow-200 bg-yellow-300/25",
      },
      { id: 4, label: "Rust", colors: "text-orange-200 bg-orange-300/25" },
      { id: 5, label: "Java", colors: "text-red-200 bg-red-300/25" },
      { id: 6, label: ".NET", colors: "text-violet-200 bg-violet-300/25" },
      { id: 7, label: "Elixir", colors: "text-purple-500 bg-purple-600/25" },
      { id: 8, label: "Python", colors: "text-green-300 bg-green-400/25" },
      { id: 9, label: "Ruby", colors: "text-red-400 bg-red-500/25" },
      { id: 10, label: "C++", colors: "text-blue-300 bg-blue-400/25" },
      { id: 11, label: "PHP", colors: "text-indigo-300 bg-indigo-400/25" },
      { id: 12, label: "Swift", colors: "text-orange-400 bg-orange-500/25" },
      { id: 13, label: "Kotlin", colors: "text-purple-300 bg-purple-400/25" },
      { id: 14, label: "Scala", colors: "text-red-500 bg-red-600/25" },
      { id: 15, label: "Dart", colors: "text-blue-200 bg-blue-300/25" },
      { id: 16, label: "C#", colors: "text-green-700 bg-green-600/25" },
      { id: 17, label: "R", colors: "text-blue-700 bg-blue-800/25" },
      { id: 18, label: "SQL", colors: "text-blue-600 bg-blue-700/25" },
      { id: 19, label: "HTML", colors: "text-orange-600 bg-orange-700/25" },
      { id: 20, label: "CSS", colors: "text-blue-400 bg-blue-500/25" },
      { id: 21, label: "Bash", colors: "text-gray-200 bg-gray-500/25" },
      { id: 22, label: "Perl", colors: "text-purple-400 bg-purple-500/25" },
      { id: 23, label: "COBOL", colors: "text-blue-800 bg-blue-900/25" },
      { id: 24, label: "Clojure", colors: "text-green-500 bg-green-600/25" },
      { id: 25, label: "Lua", colors: "text-blue-300 bg-blue-400/25" },
      { id: 26, label: "Assembly", colors: "text-red-700 bg-red-800/25" },
    ],
    [],
  );

  const [visibleBoxes, setVisibleBoxes] = useState<BoxProps[]>([]);

  useEffect(() => {
    // Animation Utilities
    const boxWidth = 80;
    const gap = 15;
    const boxSpeed = 1.5;
    const boxUnitWidth = boxWidth + gap;

    const initialBoxes = allBoxes.map((box, index) => {
      return {
        ...box,
        position: index === 0 ? 0 : -boxUnitWidth * (allBoxes.length - index),
        speed: boxSpeed,
      };
    });

    setVisibleBoxes(initialBoxes);

    let animationFrameId: number;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      setVisibleBoxes((boxes) =>
        boxes.map((box) => {
          const newPosition = box.position + box.speed * (deltaTime / 16);

          if (newPosition > window.innerWidth) {
            const leftMostBox = boxes.reduce((prev, curr) =>
              prev.position < curr.position ? prev : curr,
            );

            return {
              ...box,
              position: leftMostBox.position - boxUnitWidth,
            };
          }

          return { ...box, position: newPosition };
        }),
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [allBoxes]);

  return (
    <>
      <Nav />
      <main className="relative flex h-[95vh] w-screen flex-col items-center justify-center bg-radial">
        <div className="flex h-full w-6xl flex-col items-center justify-center border-x border-dashed border-zinc-600">
          <h1
            className={cn(
              "font-display bg-clip-text text-7xl font-semibold text-transparent",
              "bg-gradient-to-r from-purple-400 via-blue-400",
              "animate-gradient bg-[length:200%_100%]",
            )}
          >
            Make it better
          </h1>
          <h1
            className={cn(
              "font-display bg-clip-text text-7xl font-semibold text-transparent",
              "bg-gradient-to-r from-green-400 via-blue-400",
              "animate-gradient -mt-5 bg-[length:200%_100%]",
            )}
          >
            Make it faster
          </h1>
          <h1
            className={cn(
              "font-display bg-clip-text text-7xl font-semibold text-transparent",
              "bg-gradient-to-r from-pink-400 via-blue-400",
              "animate-gradient -mt-5 bg-[length:200%_100%]",
            )}
          >
            Make it happen
          </h1>

          <h2 className="font-display text">
            A platform for developers to collaborate
          </h2>
          <h2 className="font-display text-lg font-medium">
            Connect your environment
          </h2>
          <LPInput />
        </div>
      </main>

      {/* Info Section */}

      <section
        className={cn(
          "space-x- relative flex h-8 w-screen items-center overflow-x-hidden border-y border-dashed border-zinc-600",
        )}
      >
        {visibleBoxes.map((box) => (
          <motion.div
            key={box.id}
            className={cn("absolute mx-1 whitespace-nowrap")}
            style={{
              left: `${box.position}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Box label={box.label} colors={box.colors} />
          </motion.div>
        ))}
      </section>

      <section className="flex w-screen justify-center">
        <div className="mx-auto max-w-6xl border-x border-dashed border-zinc-600 px-8 py-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <InfoSquare
              title="Find Projects"
              desc="Discover exciting mini-projects and collaboration opportunities"
              icon={faSearch}
              className="text-emerald-400"
            />
            <InfoSquare
              title="Collaborate"
              desc="Connect with other developers and build together"
              icon={faUsers}
              className="text-pink-400"
            />
            <InfoSquare
              title="Tech Stacks"
              desc="Filter projects by your preferred technologies"
              icon={faCubes}
              className="text-violet-400"
            />
            <InfoSquare
              title="Bookmark"
              desc="Save interesting projects to review later"
              icon={faBookmark}
              className="text-red-400"
            />
            <InfoSquare
              title="Share Your Projects"
              desc="Showcase your work and receive feedback from the community."
              icon={faShare}
              className="text-green-400"
            />
            <InfoSquare
              title="Stay Updated"
              desc="Get notifications for new projects and collaboration requests in your feed."
              icon={faComment}
              className="text-blue-400"
            />
          </div>
        </div>
      </section>

      <section className="w-screen border-b border-dashed border-zinc-600"></section>

      <section className="flex h-120 w-full justify-center">
        <div className="h-full w-6xl border-x border-dashed border-zinc-600"></div>
      </section>
    </>
  );
}
