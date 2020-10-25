import { useState } from 'react'
import axios from 'axios'

const CreatePost = ({ getPosts }) => {
  const [title, setTitle] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    if(!title) return null

    await axios.post('http://localhost:4000/posts', { title })
    setTitle('')
    getPosts()
  }

  return (
    <>
      <h2>Create a post</h2>

      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Post Title"
        />

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default CreatePost