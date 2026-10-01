// @ts-nocheck
import { supabase } from "./supabase";
export const signInWithGoogle=async()=>{
    try {
        const {data,error}=await supabase.auth.signInWithOAuth({
            provider:"google",
            options:{
                redirectTo:`${window.location.origin}/callback`
            }
        })
        if(error) throw error
        return {data,error:null}
    } catch (err) {
        console.error("Error signing in:", err.message)
        return {data:null,error:err}
    }
}

export const signout=async()=>{
    try {
        const {error}=await supabase.signout()
        if(error) throw error
        return {error:null}
    } catch (err) {
        console.error('Error signing out:', err.message || err);
        return{error:err}
    }
}