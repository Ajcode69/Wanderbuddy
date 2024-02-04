const express =require('express')
const cors= require('cors')
const app =express()

app.use(express.json())
app.use(cors)

app.get('/',(req,res)=>{

        res.status(200).json({'message':'succesfully received the request'})
})

app.listen(3000,(e)=>{
    console.log("server is listening")
})