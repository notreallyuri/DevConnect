export default function FeedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section className="fixed top-0 left-0 h-screen w-2/10 border-r border-violet-400"></section>
      <section className="flex h-screen w-screen justify-center">
        <main className="min-h-screen w-6/10">{children}</main>
      </section>
      <section className="fixed top-0 right-0 z-10 h-screen w-2/10 border-l border-violet-400"></section>
    </>
  );
}
