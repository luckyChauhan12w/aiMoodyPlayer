const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    title: String,
    artist: String,
    audio: String
})

module.export = song = mongoose.model('song', songSchema)