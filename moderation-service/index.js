const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', (req, res) => {
  const { type, data } = req.body

  switch(type) {
    case 'COMMENT_CREATED':
      // using timeout to simulate a delay in processing (i.e. a human moderating)
      setTimeout(() => {
        axios.post('http://localhost:4005/events', {
          type: 'COMMENT_MODERATED',
          data: {
            ...data,
            status: data.content.toLowerCase().includes('orange')
              ? 'REJECTED'
              : 'APPROVED'
          }
        })
      }, 5000)
      break
  }

  return res.status(200).send({})
})

app.listen(4003, () => {
  console.log('listening on port 4003')
})
