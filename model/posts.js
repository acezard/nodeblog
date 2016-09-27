const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String
})

mongoose.model('Post', postSchema)