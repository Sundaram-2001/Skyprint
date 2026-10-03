// @ts-nocheck
import { redirect } from "@sveltejs/kit";
export const GET=async(event)=>{
 const code=event.url.searchParams.get('code')
 if(code){
    const {error}=await event.locals.supabase.auth.exchangeCodeForSession(code)
    if(!error) redirect(303,"/home")
 }
 redirect(303,"/auth-code-error")
}