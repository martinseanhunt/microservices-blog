const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

const handleEvent = (type, data) => {
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
        { 
          commentId: data.commentId, 
          content: data.content,
          status: data.status
        }
      ]
      break
    
    case 'COMMENT_UPDATED':
      posts[data.postId].comments = [
        ...posts[data.postId].comments.filter(c => c.commentId !== data.commentId),
        { 
          commentId: data.commentId, 
          content: data.content,
          status: data.status
        }
      ]
      break
  }
}

app.get('/posts', (req, res) => {
  return res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body
  handleEvent(type, data)

  return res.status(200).send({})
})

app.listen(4002, async () => {
  console.log('listening on port 4002')

  const res = await axios.get('http://localhost:4005/events')
  for (let event of res.data) {
    console.log('processing event:', event.type)
    handleEvent(event.type, event.data)
  }

})
