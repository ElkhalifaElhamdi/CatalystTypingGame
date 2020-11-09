const mongoose = require('mongoose');

var Typer = mongoose.model('Typer',{
    accuracy: Number,
    wpmSpeed: Number
    });
module.exports = {Typer};