const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

router.use(bodyParser.urlencoded({extended: true}))
router.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method
    delete req.body._method
    return method
  }
}))

router.route('/').get((req, res) => {
  mongoose.model('Post').find({}, (err, posts) => {
    if (err) throw err
    res.format({
      html: () => res.render('posts/index', {title: 'All my posts', 'posts': posts}),
      json: () => res.json(posts)
    })
  })
})

router.route('/').post((req, res) => {
  const title = req.body.title
  const author = req.body.author
  const body = req.body.body
  const date = req.body.date

  mongoose.model('Post').create({
    title,
    author,
    body,
    date
  }), (err, post) => {
    if (err) throw err

    res.format({
      html: () => {
        res.location('posts')
        res.redirect('/posts')
      },
      json: () => res.json(post)
    })
  }
})

router.get('/new', function(req, res) {
  res.render('posts/new', { title: 'Add a New Post' })
})

router.param('id', (req, res, next, id) => {
  mongoose.model('Post').findById(id, (err) => {
    if (err) {
      res.status(404)
      res.format({
        html: () => next(err),
        json: () => () => res.json({message: err.status + ' ' + err})
      })
    }

    req.id = id
    next()
  })
})

router.route('/:id').get((req, res) => {
  mongoose.model('Post').findById(req.id, (err, post) => {
    if (err) throw err

    let date = post.date.toISOString()
    date = date.substring(0, date.indexof('T'))

    res.format({
      html: () => res.render('posts/show', {
        date,
        post
      }),
      json: () => res.json(post)
    })
  })
})

router.get('/:id/edit', (req, res) => {
  mongoose.model('Post').findById(req.id, (err, post) => {
    if (err) throw err

    let date = post.date.toISOString()
    date = date.substring(0, date.indexOf('T'))

    res.format({
      html: () => res.render('posts/edit', {
        title: `Post ${post._id}`,
        date,
        post
      }),
      json: () => res.json(post)
    })
  })
})

router.put('/:id/edit', (req, res) => {
  const title = req.body.title
  const author = req.body.author
  const body = req.body.body
  const date = req.body.date

  mongoose.model('Post').findById(req.id, (err, post) => {
    post.update({
      title,
      author,
      body,
      date
    }, (err) => {
      if (err) throw err

      res.format({
        html: () => res.redirect(`/posts/${post._id}`),
        json: () => res.json(post)
      })
    })
  })
})

router.delete('/:id/delete', (req, res) => {
  mongoose.model('Post').findById(req.id, (err, post) => {
    if (err) throw err

    post.remove((err, post) => {
      if (err) throw err

      res.format({
        html: () => res.redirect('/posts'),
        json: () => res.json({message: 'deleted', item: post})
      })
    })
  })
})

module.exports = router