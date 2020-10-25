const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const comments = {}

app.get('/posts/:id/comments', (req, res) => {
  return res.send(comments[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
  // generate an id
  const postId = req.params.id
  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body

  const comment = { commentId, content }
  const existingComments = comments[postId] || []

  comments[postId] = [...existingComments, comment]

  return res.status(201).send(comments)
})

app.listen(4001, () => {
  console.log('listening on port 4001')
})
