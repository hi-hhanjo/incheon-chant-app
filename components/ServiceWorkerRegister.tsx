"use client";

import { useEffect } from "react";

// PWA 서비스 워커 등록 컴포넌트 (경기장 오프라인 가사 캐싱 지원)
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch((err) => {
            console.warn("ServiceWorker registration error:", err);
          });
      });
    }
  }, []);

  return null;
}
