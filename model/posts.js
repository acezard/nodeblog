const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    uppercase: true
  },
  author: {
    type: String
  },
  body: String
})

mongoose.model('Post', postSchema)