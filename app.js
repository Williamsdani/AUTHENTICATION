const express=require("express")
const route=require("./Routers/userRouters")

const PORT =process.env.PORT

const app =express()
app.use(express.json())

app.listen(PORT,()=>{
    console.log("server connected")
})

module.exports =app