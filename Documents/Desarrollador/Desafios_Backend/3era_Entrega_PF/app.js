import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from "socket.io"
import __dirname from './utils.js'
import productRouter from './router/product.router.js'
import viewsProduct from './router/views.product.router.js'
import cartsRouter from './router/cart.router.js'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import bodyParser from 'body-parser'
import session from 'express-session'
import sessionRouter from  './router/session.router.js'
import passport from "passport";
import cookieParser from "cookie-parser";
import initializePassport from "./config/passport.config.js";
import config from "./config/config.js";




const PORT = process.env.PORT || 3000;
const app = express(); 

// traermos información de post como JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser(config.cookieSecret))
app.use(express.static( __dirname + '/public'))

//Configurar motor plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const MONGO_URI = process.env.MONGO_URL
app.use(session({
  store: MongoStore.create({
      mongoUrl: MONGO_URI,
      mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true
      },
      ttl: 1000
  }),
  secret: process.env.ADMIN_PASSWORD,
  resave: true,
  saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(MONGO_URI, 
  { dbName: "baseCRUD" },  
  (error) => { 
      if(error) {
        console.log('Not Found Connecting');
      process.exit();
        }
      
        const httpServer = app.listen(PORT, () => console.log('Server Listening...!!!'));
        const socketServer = new Server(httpServer)
        httpServer.on("error", (e) => console.log("ERROR: " + e))
    
        app.use((req, res, next) => {
            req.io = socketServer
            next()
    })   


//Ruta de Vistas
app.use('/products', passportCall('jwt'), productRouter)
app.use('/session', sessionRouter);


app.use('/views_products', viewsProduct );

app.use('/carts', cartsRouter);


mongoose.set("strictQuery", false);


    
    socketServer.on("connection", socket => {
      console.log("New client connected")
      socket.on("message", async data => {
      await messagesModel.create(data)
      let messages = await messagesModel.find().lean().exec()
      socketServer.emit("logs", messages)
      })
  })
})
