import { Router } from "express";
const routes=Router()


routes.get("/",async(req,res)=>{
    await res.send("Hello world!")
})