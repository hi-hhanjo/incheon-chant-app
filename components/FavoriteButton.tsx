"use client";

import { useFavorites } from "@/lib/favorites";

interface FavoriteButtonProps {
  id: number;
  size?: "sm" | "md";
  className?: string;
}

export default function FavoriteButton({
  id,
  size = "md",
  className = "",
}: FavoriteButtonProps) {
  const { isFavorite, toggle, isLoaded } = useFavorites();
  const active = isLoaded && isFavorite(id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  };

  const iconSize = size === "sm" ? 18 : 22;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? "세트리스트에서 제거" : "세트리스트에 추가"}
      title={active ? "내 세트리스트에서 제거" : "내 세트리스트에 추가"}
      className={`flex items-center justify-center rounded-full p-2 transition-transform active:scale-90 hover:brightness-125 min-h-[44px] min-w-[44px] ${className}`}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={active ? "#FFA42B" : "none"}
        stroke={active ? "#FFA42B" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );
}
