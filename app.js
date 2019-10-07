
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const path = require('path');
const app = express();

app.use("/", express.static(path.join(__dirname,"dist/week9app")));

app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/movies',{useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/add/:name1/:name2', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:id/delete',actors.deleteMany);
app.delete('/actors/:id1/:id2',actors.removeMovie);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.get('/movies/:from/:to',movies.getMovie);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id',movies.deleteOne);
app.post('/movies/:id/actors',movies.addActor);
app.delete('/movies/:id1/:id2',movies.removeActor);
app.put('/movies/task/update', movies.updateYear);
app.delete('/movie/before/:year',movies.deleteBefore);