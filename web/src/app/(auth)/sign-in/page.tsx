"use client";
import { Input } from "@/components/(auth)/input";
import Image from "next/image";
import Logo from "@/public/Logo.svg";
import cn from "@/utils/cn";

export default function Auth() {
  return (
    <>
      <div
        className={cn(
          "flex w-fit items-center gap-2 rounded-xl border p-2",
          "absolute inset-x-1/2 top-5 -translate-x-1/2",
          "border-zinc-100/10 bg-zinc-700/25 select-none",
        )}
      >
        <div className="size-7 shrink-0 rounded-full">
          <Image src={Logo} alt="Logo"/>
        </div>
        <h1 className="font-display text-xl">DevConnect</h1>
      </div>
      <main className="flex h-screen w-screen items-center justify-center">
        <div className="h-fit w-80 rounded-xl border border-zinc-100/10 bg-zinc-700/20 p-4">
          <h1 className="font-display text-2xl font-medium">Sign In</h1>
          <form action="" className="mt-2 flex flex-col gap-1">
            <Input label="Email" />
            <Input label="Password" type="password" showPasswordToggle />
            <button
              className={cn(
                "mt-2 h-10 rounded-xl transition-colors",
                "bg-blue-500 hover:bg-blue-400",
              )}
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
