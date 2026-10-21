import OfficialLinks from "./OfficialLinks";

// docs/design/components/layout.md — 전 화면 공통 틀: 배경·최대폭·여백
export default function Layout({ 
  children,
  wide = true 
}: { 
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <main className={`mx-auto flex min-h-dvh w-full flex-col gap-6 px-4 py-8 sm:px-6 transition-all duration-300 ${wide ? "max-w-7xl lg:px-8 xl:px-10" : "max-w-[640px]"}`}>
      {children}
      <footer className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-center text-xs text-text-muted">공식 채널 바로가기</p>
        <OfficialLinks />
      </footer>
    </main>
  );
}
