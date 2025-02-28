"use client";
import React from "react";
import cn from "@/utils/cn";
import Logo from "@/public/Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/(auth)/input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faUsers,
  faGear,
  faCube,
  faBook,
} from "@awesome.me/kit-a322175488/icons/classic/regular";
import { faRightFromBracket } from "@awesome.me/kit-a322175488/icons/classic/solid";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  interface Link {
    label: string;
    href: string;
    icon: IconDefinition;
  }

  const myLinks: Link[] = [
    {
      label: "Feed",
      href: "/feed",
      icon: faHouse,
    },
    {
      label: "Communities",
      href: "/communities",
      icon: faUsers,
    },
    {
      label: "Packages",
      href: "/packages",
      icon: faCube,
    },
    {
      label: "Documentation",
      href: "/docs",
      icon: faBook,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: faGear,
    },
  ];

  const handleExit = () => {
    router.push("/");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-5 left-5 z-20 flex h-14 items-center px-4",
          "rounded-2xl border border-white/10 bg-zinc-800",
        )}
      >
        <div className="flex h-10 w-fit items-center">
          <Link className="" href={"/feed"}>
            <Image src={Logo} alt="Logo" className="size-10" />
          </Link>
          <Input placeholder="Search" />
        </div>
        <div className="relative flex w-72 items-center justify-around">
          {myLinks.map((link) => {
            return (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={cn(
                    "flex size-12 items-center justify-center",
                    "rounded-full transition-colors hover:bg-white/5",
                    (link.href === pathname ||
                      pathname.startsWith(`/${link.href}/`)) &&
                      "text-blue-400",
                  )}
                >
                  <FontAwesomeIcon icon={link.icon} className="text-xl" />
                </Link>
                <div
                  className={cn(
                    "absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap",
                    "rounded-md bg-zinc-800/90 px-2 py-1 text-xs text-white",
                    "opacity-0 transition-opacity group-hover:opacity-100",
                  )}
                >
                  {link.label}
                </div>
              </div>
            );
          })}
        </div>
      </header>
      <header
        className={cn(
          "fixed top-5 right-5 z-40 flex items-center justify-center divide-x divide-zinc-400 px-4",
          "h-14 min-w-14 rounded-2xl bg-zinc-800",
        )}
      >
        <div className="flex w-50 gap-2 px-2">
          <div className="size-10 rounded-full bg-red-300" />
          <div>
            <h1 className="select-none">Username</h1>
            <p className="text-xs text-white/80 select-none">@userid</p>
          </div>
        </div>
        <div className="flex items-center justify-center pl-2">
          <button
            onClick={handleExit}
            className={cn(
              "flex size-12 items-center justify-center text-xl transition-colors",
              "cursor-pointer rounded-full hover:text-blue-400",
            )}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      </header>
    </>
  );
}
