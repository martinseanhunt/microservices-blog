import { useState } from 'react'
import axios from 'axios'

const CreateComment = ({ postId, getComments }) => {
  const [comment, setComment] = useState('')
  
  const postComment = async e => {
    e.preventDefault()
    if(!comment) return null

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: comment
    })
    setComment('')
    getComments()
  }

  return (
    <>
      <form onSubmit={postComment}>
        <textarea 
          value={comment}
          placeholder={'Comment text'}
          onChange={e => setComment(e.target.value)}
        />
        <br/>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default CreateComment
