import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// bfsghwnksjaqfdnhtqzd.supabase.co는 만료되어 삭제된 도메인(Non-existent domain)입니다.
// 유효하지 않은 도메인이거나 키가 없으면 불필요한 DNS 조회/타임아웃 없이 정적 데이터(fallback)를 즉시 반환하도록 방어합니다.
export const isSupabaseAvailable = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('bfsghwnksjaqfdnhtqzd')
);

export const supabase: SupabaseClient | null = isSupabaseAvailable
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
