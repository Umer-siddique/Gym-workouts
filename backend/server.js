const mongoose=require("mongoose")
const workoutRoutes=require("./routes/workout")
const userRoutes=require('./routes/user')
require("dotenv").config()
const express =require("express")

// express setup
const app=express()

// Global middleware
app.use(express.json())

app.use((req,res,next)=>{
   console.log(req.path , req.method)
   next()
})

// Routes
app.use("/api/workout",workoutRoutes)
app.use("/api/user",userRoutes)

// Server is listening for request
app.listen(process.env.PORT, async()=>{
      try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`server is listening on port ${process.env.PORT}`)
        console.log("Connection successfull")
      }catch(err){
         console.log(err)
      }
    
})