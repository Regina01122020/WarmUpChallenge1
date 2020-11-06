const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const ejs = require('ejs')
const app = express()
const port = 3000

// TO USE THE EJS TEMPLATE ENGINE
app.set('view engine', 'ejs')
// FOR PARSING THE URL ENCODED DATA 
app.use(express.urlencoded({extended: true}))
// MIDDLEWARE FOR PARSING JSON OBJECTS
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

// IMPORT THE DB SCHEMA
const schema = require('./model/schema.js')

// CONNECTING TO THE DATABASE 
mongoose.connect('mongodb+srv://regina:lJh3MVjYfGtkzJRn@cluster1.utlod.gcp.mongodb.net/WarmUpDB?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true },
    // GIVES AN ERROR IF NOT CONNECTED TO THE DB
    function(err, database) { 
    if (err) { 
    throw err;
    }  
    // LOG OUT THIS MESSAGE IF CONNECTION IS SUCCESSFUL
    console.log("Connection made to database.")
    }
) 

app.get('/', function(req, res){
    console.log('Routes are working...')
})

app.get('/movie', function(req, res) {
    schema.find({})
        .then(function(movies) {
            console.log(movies)
            res.send(movies)
        })
        .catch(function(err) {
            console.log(err)
            res.send(err)
        })
})


// POST REQUEST TO POST THE FORM 
app.post('/movie', function(req, res) {
    console.log("Post route hit")
    console.log(req.body)
// CREATES THE MOVIE OBJECT
movieObject = {
    Picture: req.body.Picture,
    Title: req.body.Title,
    Genre: req.body.Genre,
    Year_Released: req.body.Year_Released,
    Favorite_Cast: req.body.Favorite_Cast
}
// ADD THE MOVIE TO THE DB
movieToAdd = new schema(movieObject)  
// SAVES THE MOVIE DATA FORM TO THE DB
movieToAdd.save() 
    .then(function(movie) {
        console.log("Movie Details Saved!")
        console.log(movie)
        res.send(movie)
    })
    // DISPLAYS AN ERROR MESSAGE IF THERE'S AN ERROR
    .catch(function(err) {
        console.log(err)
    })
}) 

// SERVER LISTENING AT THIS PORT
app.listen(port, function(){
    console.log(`Express App running at http://localhost:${port}`)
})