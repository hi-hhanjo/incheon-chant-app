"use client";

import { useEffect, useState } from "react";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTime(kickoffAt: string): CountdownTime {
  const target = new Date(kickoffAt).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}

export default function MatchCountdown({ kickoffAt }: { kickoffAt: string }) {
  // lazy initializer로 마운트 시 최초 계산 (effect 내 동기 setState 방지)
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() => calculateTime(kickoffAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTime(kickoffAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [kickoffAt]);

  if (timeLeft.isPast) {
    return (
      <div className="flex items-center justify-center gap-2 py-1 text-xs font-bold text-brand">
        <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-ping" />
        <span>경기 진행 중 또는 종료</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-1.5 text-xs text-text-muted">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold uppercase tracking-wider text-emerald-400">Kickoff Countdown</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-center rounded-lg bg-black/40 border border-white/10 px-2.5 py-1.5 min-w-[48px]">
          <span className="font-mono text-lg font-black text-white">{timeLeft.days}</span>
          <span className="text-[9px] uppercase tracking-wider text-text-muted">Days</span>
        </div>
        <span className="font-mono text-base font-bold text-brand">:</span>
        <div className="flex flex-col items-center rounded-lg bg-black/40 border border-white/10 px-2.5 py-1.5 min-w-[48px]">
          <span className="font-mono text-lg font-black text-white">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-text-muted">Hours</span>
        </div>
        <span className="font-mono text-base font-bold text-brand">:</span>
        <div className="flex flex-col items-center rounded-lg bg-black/40 border border-white/10 px-2.5 py-1.5 min-w-[48px]">
          <span className="font-mono text-lg font-black text-white">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-text-muted">Mins</span>
        </div>
        <span className="font-mono text-base font-bold text-brand">:</span>
        <div className="flex flex-col items-center rounded-lg bg-black/40 border border-white/10 px-2.5 py-1.5 min-w-[48px]">
          <span className="font-mono text-lg font-black text-brand">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-text-muted">Secs</span>
        </div>
      </div>
    </div>
  );
}
