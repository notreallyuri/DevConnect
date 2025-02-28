import cn from "@/utils/cn";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@awesome.me/kit-a322175488/icons/classic/solid";
import Logo from "@/public/Logo.svg";
import Image from "next/image";

export default function Nav() {
  return (
    <>
      <header
        className={cn(
          "fixed top-5 left-5 z-40 h-14",
          "flex items-center justify-center backdrop-blur-3xl",
          "gap-2 rounded-2xl p-1 pl-4",
          "border border-white/10 bg-zinc-800/40",
        )}
      >
        <div className="mr-4 flex items-center gap-2">
          <Image src={Logo} alt="Logo" className="size-6" />
          <h2 className="font-display text-2xl font-medium">DevConnect</h2>
        </div>
        <div className="ml-4 h-full w-0.25 shrink-0 rounded-sm bg-white/10" />
        <nav className="flex h-full w-full items-center justify-center">
          <Link
            href={"/docs"}
            className={cn(
              "h-full w-34 cursor-pointer rounded-xl p-4",
              "flex items-center justify-center",
              "hover:bg-white/5 hover:text-white/85",
            )}
          >
            Documentation
          </Link>
          <div className="mx-2 h-4/10 w-0.25 shrink-0 rounded-sm bg-white/10" />
          <Link
            href={"/"}
            className={cn(
              "h-full w-34 cursor-pointer rounded-xl",
              "flex items-center justify-center",
              "hover:bg-white/5 hover:text-white/85",
            )}
          >
            Showcase
          </Link>
        </nav>
      </header>
      <header
        className={cn(
          "fixed top-5 right-5 z-10 transition-colors",
          "size-14 rounded-2xl border px-1 py-1",
          "border-white/10 bg-zinc-800/40",
          "flex lg:hidden",
          "items-center justify-center",
        )}
      >
        <FontAwesomeIcon icon={faBars} />
      </header>
      <header
        className={cn(
          "fixed top-5 right-5 z-10 transition-colors",
          "h-14 rounded-2xl border px-1 py-1",
          "border-white/10 bg-zinc-800/40",
          "hidden lg:block",
        )}
      >
        <nav className={cn("flex h-full items-center justify-center")}>
          <Link
            href={"/sign-in"}
            className={cn(
              "h-full w-24 cursor-pointer rounded-xl py-4",
              "flex items-center justify-center",
              "hover:bg-white/5 hover:text-white/85",
            )}
          >
            Sign In
          </Link>
          <div className="mx-2 h-4/10 w-0.25 shrink-0 rounded-sm bg-white/10" />
          <Link
            href={"/sign-up"}
            className={cn(
              "h-full w-24 cursor-pointer rounded-xl py-4",
              "flex items-center justify-center",
              "hover:bg-white/5 hover:text-white/85",
            )}
          >
            Sign Up
          </Link>
        </nav>
      </header>
    </>
  );
}
