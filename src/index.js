import 'dotenv/config'
import connectDB from "./db/index.js"
connectDB()







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