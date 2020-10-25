import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import CommentList from './CommentList'
import CreateComment from './CreateComment'

const Post = ({ post }) => {
  const [comments, setComments] = useState([])
  
  const getComments = useCallback(async () => {
    const res = await axios.get(`http://localhost:4001/posts/${post.id}/comments`)
    setComments(res.data)
  }, [post.id])

  useEffect(() => { getComments() }, [getComments])

  return (
    <li>
      {post.title}
      <CommentList comments={comments} />
      <CreateComment postId={post.id} getComments={getComments} />
    </li>
  )
}

export default Post
