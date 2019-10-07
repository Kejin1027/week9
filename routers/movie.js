var Actor = require('../models/Actor');
var Movie = require('../models/Movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find().populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },

    getMovie: function(req,res){
        let year1 = parseInt(req.params.from);
        let year2 = parseInt(req.params.to);
        Movie.where('year').gte(year1).lte(year2).exec(function(err, movies){
            res.json(movies);
        })
    },

    deleteBefore: function(req,res){
        let target = parseInt(req.params.year);
        Movie.deleteMany({year: {$lte: target}}).exec(function(err,movies){
            if(err) return res.status(400).json(err);
            res.json(movies);
        })
    },

    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req,res){
        Movie.findOneAndDelete({_id: req.params.id}, function(err){
            if(err) return res.status(400).json(err);
            res.json();
        })
    },

    addActor: function(req,res){
        Movie.findOne({_id: req.params.id},function(err,movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: req.body.id},function(err, actor){
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor.id);
                movie.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                })
            })
        })
    },

    removeActor: function(req,res){
        Movie.findOne({_id: req.params.id1},function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            let actor = movie.actors;
            let actorID = toString(req.params.id2);
            for(i = 0; i < actor.length; i++){
                actor[i] = toString(actor[i]);
                if(actor[i] === actorID){
                    actor.splice(i, 1);
                }
            }

            movie.save(function(err){
                if (err) return res.status(500).json(err);
                    res.json(movie);
            })
        })
    },

    updateYear: function(req,res){
        Movie.updateMany({year: {$gte: 1995}},{$inc: {year: 7}},function(err,result){
            if (err) return res.status(500).json(err);
                 res.json(result);
        })
    }    
};