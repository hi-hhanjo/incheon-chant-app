import type { Metadata, Viewport } from "next";
import NavBar from "@/components/NavBar";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#2e7dff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "인천 유나이티드 팬 플랫폼",
  description:
    "인천 유나이티드의 응원가, 경기 일정, 전력 분석, 구단 정보 등을 한곳에서 확인할 수 있는 팬 통합 플랫폼",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "인천 응원가",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full antialiased">
        <ServiceWorkerRegister />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
