"use client";

import { useEffect, useState, useRef } from "react";

interface Section {
  id: string;
  label: string;
}

interface FloatingNavProps {
  sections: Section[];
}

interface NavPosition {
  x: number;
  y: number;
}

const STORAGE_KEY = "incheon_quicknav_pos_v2";

export default function FloatingNav({ sections }: FloatingNavProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [position, setPosition] = useState<NavPosition | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);

  const dragStartRef = useRef<{
    pointerX: number;
    pointerY: number;
    widgetX: number;
    widgetY: number;
  } | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const desktopWidgetRef = useRef<HTMLDivElement>(null);

  // 1. 저장된 위치 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          const maxX = Math.max(16, window.innerWidth - 180);
          const maxY = Math.max(16, window.innerHeight - 100);
          setPosition({
            x: Math.min(maxX, Math.max(16, parsed.x)),
            y: Math.min(maxY, Math.max(16, parsed.y)),
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // 2. 화면 리사이즈 시 화면 바깥으로 벗어난 위치 재보정
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return null;
        const maxX = Math.max(16, window.innerWidth - 180);
        const maxY = Math.max(16, window.innerHeight - 100);
        return {
          x: Math.min(maxX, Math.max(16, prev.x)),
          y: Math.min(maxY, Math.max(16, prev.y)),
        };
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. 스크롤 위치 감지
  useEffect(() => {
    let frameId: number;

    const handleScrollEvent = () => {
      if (frameId) window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        // 스크롤이 맨 밑에 도달했는지 확인 (여유 버퍼 20px)
        const isBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;

        let newActiveId = sections[0]?.id;

        if (isBottom) {
          newActiveId = sections[sections.length - 1]?.id;
        } else {
          const scrollPosition = window.scrollY + 120;

          for (const section of sections) {
            const element = document.getElementById(section.id);
            if (element) {
              const elementTop = element.getBoundingClientRect().top + window.scrollY;
              if (elementTop <= scrollPosition) {
                newActiveId = section.id;
              }
            }
          }
        }

        if (newActiveId && newActiveId !== activeId) {
          setActiveId(newActiveId);

          // 모바일 가로 스크롤 시 선택된 탭이 화면 중앙에 오도록 스크롤 이동
          if (navRef.current) {
            const activeBtn = navRef.current.querySelector(
              `[data-id="${newActiveId}"]`
            ) as HTMLElement;
            if (activeBtn) {
              const containerWidth = navRef.current.offsetWidth;
              const btnLeft = activeBtn.offsetLeft;
              const btnWidth = activeBtn.offsetWidth;
              navRef.current.scrollTo({
                left: btnLeft - containerWidth / 2 + btnWidth / 2,
                behavior: "smooth",
              });
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScrollEvent);
    handleScrollEvent(); // 초기 1회 실행

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [sections, activeId]);

  // 4. 드래그 이동 인터랙션
  const handlePointerDown = (e: React.PointerEvent) => {
    // 닫기/리셋 버튼 등은 드래그 시작 대상에서 제외
    if ((e.target as HTMLElement).closest("button[data-action]")) {
      return;
    }

    const widget = desktopWidgetRef.current;
    if (!widget) return;

    const rect = widget.getBoundingClientRect();
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      widgetX: rect.left,
      widgetY: rect.top,
    };

    setDragMoved(false);
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current || !desktopWidgetRef.current) return;

    const dx = e.clientX - dragStartRef.current.pointerX;
    const dy = e.clientY - dragStartRef.current.pointerY;

    if (Math.hypot(dx, dy) > 3) {
      setDragMoved(true);
    }

    const widget = desktopWidgetRef.current;
    const widgetWidth = widget.offsetWidth || 160;
    const widgetHeight = widget.offsetHeight || 380;

    const maxX = Math.max(16, window.innerWidth - widgetWidth - 16);
    const maxY = Math.max(16, window.innerHeight - widgetHeight - 16);

    const nextX = Math.min(maxX, Math.max(16, dragStartRef.current.widgetX + dx));
    const nextY = Math.min(maxY, Math.max(16, dragStartRef.current.widgetY + dy));

    setPosition({ x: nextX, y: nextY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return;

    if (position) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
      } catch {
        // ignore
      }
    }

    dragStartRef.current = null;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // 기본 위치로 초기화
  const handleResetPosition = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPosition(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleScroll = (id: string) => {
    if (dragMoved) return; // 드래그 중 실수 클릭 방지
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const currentSection = sections.find((s) => s.id === activeId);

  return (
    <>
      {/* 1. 모바일 탭 바 (lg 미만에서는 상단 sticky 노출) */}
      <div
        ref={navRef}
        className="lg:hidden sticky top-0 z-50 flex overflow-x-auto bg-[#0E1116]/95 backdrop-blur-sm border-b border-border-dim whitespace-nowrap -mx-4 px-4 py-3 gap-2 hide-scrollbar shadow-md"
      >
        {sections.map((section) => (
          <button
            key={section.id}
            data-id={section.id}
            onClick={() => handleScroll(section.id)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-colors shrink-0 shadow-sm ${
              activeId === section.id
                ? "bg-brand text-white"
                : "bg-bg-surface text-text-muted hover:text-white border border-border-dim"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* 2. 데스크톱 와이드 화면: 원하는 위치로 자유롭게 드래그 이동 가능한 빠른 탐색 플로팅 바 */}
      <div
        ref={desktopWidgetRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={
          position
            ? {
                left: `${position.x}px`,
                top: `${position.y}px`,
                right: "auto",
                bottom: "auto",
                transform: "none",
              }
            : undefined
        }
        className={`hidden lg:flex fixed z-50 flex-col p-2.5 rounded-2xl bg-[#0B1324]/90 backdrop-blur-md border transition-shadow select-none shadow-2xl ${
          position
            ? ""
            : "top-1/2 -translate-y-1/2 right-4 xl:right-8"
        } ${
          isDragging
            ? "cursor-grabbing border-blue-400 shadow-[0_0_30px_rgba(46,125,255,0.45)] scale-[1.02]"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        {/* 상단 드래그 핸들 바 & 조작 버튼 */}
        <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-white/10 cursor-grab active:cursor-grabbing px-1.5 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-blue-400 text-sm font-mono tracking-tighter">
              ⠿
            </span>
            <span className="text-xs font-bold text-white tracking-tight">
              빠른 탐색
            </span>
            <span className="text-[10px] text-text-muted opacity-80 hidden xl:inline">
              (드래그 이동)
            </span>
          </div>

          <div className="flex items-center gap-1">
            {position && (
              <button
                type="button"
                data-action="reset"
                onClick={handleResetPosition}
                className="text-[11px] text-text-muted hover:text-white px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
                title="기본 우측 위치로 초기화"
              >
                ↺
              </button>
            )}
            <button
              type="button"
              data-action="collapse"
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(!isCollapsed);
              }}
              className="text-[11px] text-text-muted hover:text-white px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
              title={isCollapsed ? "목록 펼치기" : "간략히 접기"}
            >
              {isCollapsed ? "＋" : "−"}
            </button>
          </div>
        </div>

        {/* 접힌 상태 (컴팩트 배지) */}
        {isCollapsed ? (
          <div className="flex items-center gap-1.5 px-2 py-1 text-xs text-blue-300 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>{currentSection?.label || "탐색"}</span>
          </div>
        ) : (
          /* 펼쳐진 전체 섹션 버튼 목록 */
          <div className="flex flex-col gap-1 w-36">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleScroll(section.id)}
                className={`text-xs px-2.5 py-1.5 rounded-lg transition-all text-left relative flex items-center justify-between cursor-pointer ${
                  activeId === section.id
                    ? "text-white font-bold bg-blue-600/30 border border-blue-500/40 shadow-sm"
                    : "text-text-muted hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <span>{section.label}</span>
                {activeId === section.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
