const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  return res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  switch(type) {
    case 'POST_CREATED':
      posts[data.id] = {
        ...data,
        comments: []
      } 
      break

    case 'COMMENT_CREATED':
      posts[data.postId].comments = [
        ...posts[data.postId].comments,
        { commentId: data.commentId, content: data.content }
      ]
      console.log(posts[data.postId].comments)
      break
  }

  return res.status(200)
})

app.listen(4002, () => {
  console.log('listening on port 4002')
})
