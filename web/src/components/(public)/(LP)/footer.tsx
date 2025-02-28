import cn from "@/utils/cn";

export default function Footer() {
  return (
    <>
      <footer
        className={cn(
          "absolute bottom-0 h-12 w-screen bg-black/40",
          "flex items-center justify-center gap-2",
        )}
      >
        <p className="select-none text-sm">Yuri VGR</p>
        <div className="h-6/10 w-0.25 shrink-0 rounded-sm bg-white/25" />
        <p className="select-none text-sm">Notreallyuri</p>
      </footer>
    </>
  );
}
