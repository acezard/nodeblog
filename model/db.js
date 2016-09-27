const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog', (err) => {
  if (err) throw err
  console.log('Database connection established')
})
