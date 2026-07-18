const express = require('express')
const app = express();

const db = require('./db')

const bodyParser= require('body-parser');
app.use(bodyParser.json());//req.body
require('dotenv').config()

app.get('/', function(req,res){
    res.send('Welcome to our hotel Vishal_ColdDrink')
})  

const PORT = process.env.PORT || 3000;

app.listen(3000, function(){ 
    console.log("succesfully run server!!!!");
});   

const personRoutes = require('./routes/personRoutes');//Import the router file
const menuRoutes = require('./routes/menuRoutes');//Import the router file

app.use('/person',personRoutes);//use the router
app.use('/menu',menuRoutes);//use the router 