import express from 'express'
import cors from 'cors'
const app =express()
import request from '../backend/LLM_requests/request.js'

app.use(express.json())
app.use(cors)

app.get('/',async (req,res)=>{

    const city = req.headers.city
    const days= parseInt(req.headers.days)
    
    const completion= await request(city,days)

    res.send.json({message: completion})
})


app.listen(3000,(e)=>{
    console.log("server is listening")
})