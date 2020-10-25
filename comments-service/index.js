const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const comments = {}

app.get('/posts/:id/comments', (req, res) => {
  return res.send(comments[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  // generate an id
  const postId = req.params.id
  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body

  const comment = { commentId, content }
  const existingComments = comments[postId] || []

  comments[postId] = [...existingComments, comment]

  // emit an event to our bus
  await axios.post('http://localhost:4005/events', {
    type: 'COMMENT_CREATED',
    data: {
      ...comment,
      postId
    }
  })

  return res.status(201).send(comments)
})

app.post('/events', (req, res) => {
  console.log('received event: ' + req.body.type)

  return res.status(200)
})

app.listen(4001, () => {
  console.log('listening on port 4001')
})
