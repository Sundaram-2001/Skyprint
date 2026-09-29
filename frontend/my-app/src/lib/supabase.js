import { createBrowserClient } from "@supabase/ssr";
import { PUBLIC_SUPABSE_URL,PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
export const supabase=createBrowserClient(
    PUBLIC_SUPABSE_URL,
    PUBLIC_SUPABASE_ANON_KEY
);