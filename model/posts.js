const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: {type: Date, default: Date.now},
  body: String
})

mongoose.model('Post', postSchema)