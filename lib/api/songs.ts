import { supabase } from "../supabase";
import type { Song, DataSource } from "./songs.schema";
import fallbackSongsData from "@/data/songs.json";

const fallbackSongs = fallbackSongsData as Song[];

export async function getSongs(): Promise<Song[]> {
  if (!supabase) {
    return fallbackSongs;
  }

  try {
    const { data, error } = await supabase
      .from("songs")
      .select("*, videos(*)");

    if (error || !data || data.length === 0) {
      return fallbackSongs;
    }

    return data.map(mapToSong);
  } catch {
    return fallbackSongs;
  }
}

export async function getSongById(id: number): Promise<Song | undefined> {
  if (!supabase) {
    return fallbackSongs.find((s) => s.id === id);
  }

  try {
    const { data, error } = await supabase
      .from("songs")
      .select("*, videos(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      return fallbackSongs.find((s) => s.id === id);
    }
    return mapToSong(data);
  } catch {
    return fallbackSongs.find((s) => s.id === id);
  }
}

function mapToSong(row: any): Song {
  const videos = (row.videos || [])
    .sort((a: any, b: any) => a.sort_order - b.sort_order)
    .map((v: any) => ({
      type: v.type,
      label: v.label,
      youtubeId: v.youtube_id,
    }));

  const source: DataSource | undefined = row.source_name
    ? { name: row.source_name, url: row.source_url }
    : undefined;

  return {
    id: row.id,
    title: row.title,
    lyrics: row.lyrics,
    category: row.category,
    tags: row.tags || [],
    isFavorite: row.is_favorite,
    videos,
    source,
  };
}
