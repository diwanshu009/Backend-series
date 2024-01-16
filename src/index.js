import 'dotenv/config'
import connectDB from "./db/index.js"
import { app } from './app.js'

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is running on: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(` DB Connection failed!!`, err)
})







// import express from "express"
// const app = express()

// ( async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log(error)
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port: ${prcoess.env.PORT}`)
//         })
//     } catch (error) {
//         console.log("ERROR:" ,error)
//         throw err
//     }
// })()