// @ts-nocheck
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABSE_URL } from "$env/static/public";
import { createServerClient } from "@supabase/ssr";

export const handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(PUBLIC_SUPABSE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll: () => event.cookies.getAll(),
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    try {
                        event.cookies.set(name, value, { ...options, path: '/' })
                    } catch {
                        
                    }
                });
            }
        }
    })

    event.locals.safeGetSession = async () => {
        const { data: { session } } = await event.locals.supabase.auth.getSession()
        if (!session) return { session: null, user: null }
        const { data: { user }, error } = await event.locals.supabase.auth.getUser()
        if (error) return { session: null, user: null }
        return { session, user }
    };

    // checkin the session exists or not before the response is sent
    await event.locals.supabase.auth.getSession()

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version';
        }
    });
}