const express = require('express')
const cors = require('cors')
const membersController = require('./controllers/membersController')
const moviesController = require('./controllers/moviesController')
const subscriptionsController = require('./controllers/subscriptionsController')
require('./config/DB')
const app = express()

// init with node subscriptionsWS.js

const corsOptions ={
    origin: process.env.CINEMA_URL || '*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: "GET,PUT,PATCH,POST,DELETE"
 }
 
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/subscriptions',subscriptionsController) //controller for students
app.use('/movies',moviesController)
app.use('/members',membersController)

app.listen(process.env.PORT || 8001,
    () => console.log("The server is Running ")
);
