const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  return res.send(posts)
})

app.post('/posts', async (req, res) => {
  // generate an id
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = { id, title }

  // emit an event to our bus
  await axios.post('http://localhost:4005/events', {
    type: 'POST_CREATED',
    data: posts[id]
  })

  return res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
  console.log('received event: ' + req.body.type)

  return res.status(200).send({})
})

app.listen(4000, () => {
  console.log('listening on port 4000')
})
