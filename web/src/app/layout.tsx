import "./globals.css";
import { manrope } from "./fonts";
import cn from "@/utils/cn";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-body relative w-screen bg-zinc-950 text-white",
          manrope.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
