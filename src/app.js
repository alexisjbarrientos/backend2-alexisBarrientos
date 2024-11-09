import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import routerC from './router/current.router.js'
import routerL from './router/login.router.js'
import routerR from './router/current.router.js'

dotenv.config()
console.log('MONGO_URL:', process.env.MONGO_URL);
console.log('PORT:', process.env.PORT);


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

app.use('/api/register',routerR )
app.use('/api/login', routerL)
app.use('/api/current',routerC)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`El servidor está funcionando correctamente en el puerto ${PORT}`);
  })
  mongoose.connect(process.env.MONGO_URL)
  .then(() => { console.log("Conectado a la base de datos") })
  .catch(error => {console.error("Error en la conexion", error)})
  
