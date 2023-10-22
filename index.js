 import express from 'express';
import route from './src/route/index.js'
import cors from 'cors'
 const app=express()
 app.use(express.json());
 app.use(cors())
const PORT=process.env.PORT;
app.use('/',route)
 app.listen(PORT,()=>{console.log(`server listen into ${PORT}`)})