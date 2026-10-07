import { createClient } from "@supabase/supabase-js/dist/index.cjs";
export const supabase=createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
)


// SUPABASE_URL=https://zithqbpojkmywesqmcgi.supabase.co
// SUPABASE_SECRET_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppdGhxYnBvamtteXdlc3FtY2dpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDQzMzMyMSwiZXhwIjoyMTA2MDA5MzIxfQ.afxm4pf-3HWru5DoPMeuBtPhLPAu-xWKURWw4s1XLLI