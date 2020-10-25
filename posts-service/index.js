const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const posts = {}

app.get('/posts', (req, res) => {
  return res.send(posts)
})

app.post('/posts', (req, res) => {
  // generate an id
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = { id, title }

  return res.status(201).send(posts[id])
})

app.listen(4000, () => {
  console.log('listening on port 4000')
})
