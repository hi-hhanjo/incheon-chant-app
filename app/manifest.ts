import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "인천 유나이티드 팬 플랫폼",
    short_name: "인천 응원가",
    description: "인천 유나이티드 응원가 가사 및 구단 정보 플랫폼",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1116",
    theme_color: "#2e7dff",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
