"use client";

import { useSyncExternalStore, useCallback } from "react";

const STORAGE_KEY = "incheon_favorite_songs";
const FAVORITES_CHANGE_EVENT = "incheon_favorites_changed";

let cachedFavorites: number[] = [];
let isCacheInitialized = false;

/**
 * 로컬 스토리지에서 즐겨찾기(세트리스트) ID 목록을 읽어옵니다.
 */
export function getStoredFavoriteIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "number") : [];
  } catch {
    return [];
  }
}

/**
 * 로컬 스토리지에 즐겨찾기 ID 목록을 저장하고 이벤트를 발생시킵니다.
 */
export function setStoredFavoriteIds(ids: number[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    cachedFavorites = ids;
    window.dispatchEvent(new CustomEvent(FAVORITES_CHANGE_EVENT, { detail: ids }));
  } catch (e) {
    console.warn("Failed to save favorites to localStorage:", e);
  }
}

/**
 * 특정 응원가의 세트리스트 포함 여부를 토글합니다.
 */
export function toggleFavoriteId(id: number): boolean {
  const current = getStoredFavoriteIds();
  const exists = current.includes(id);
  const next = exists ? current.filter((item) => item !== id) : [...current, id];
  setStoredFavoriteIds(next);
  return !exists;
}

function subscribe(callback: () => void) {
  const handleSync = () => {
    cachedFavorites = getStoredFavoriteIds();
    callback();
  };

  window.addEventListener(FAVORITES_CHANGE_EVENT, handleSync);
  window.addEventListener("storage", handleSync);

  return () => {
    window.removeEventListener(FAVORITES_CHANGE_EVENT, handleSync);
    window.removeEventListener("storage", handleSync);
  };
}

function getSnapshot(): number[] {
  if (typeof window === "undefined") return [];
  if (!isCacheInitialized) {
    cachedFavorites = getStoredFavoriteIds();
    isCacheInitialized = true;
  }
  return cachedFavorites;
}

const SERVER_EMPTY: number[] = [];
function getServerSnapshot(): number[] {
  return SERVER_EMPTY;
}

/**
 * useSyncExternalStore를 활용한 React 19 호환 실시간 동기화 훅.
 */
export function useFavorites() {
  const favoriteIds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds]
  );

  const toggle = useCallback((id: number) => {
    return toggleFavoriteId(id);
  }, []);

  return { favoriteIds, isFavorite, toggle, isLoaded: true };
}
