import Nav from "@/components/(public)/(docs)/nav";

export default function DocLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
