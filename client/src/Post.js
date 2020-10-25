import CommentList from './CommentList'
import CreateComment from './CreateComment'

const Post = ({ post, getPosts }) => {
  return (
    <li>
      {post.title}
      <CommentList comments={post.comments} />
      <CreateComment postId={post.id} getPosts={getPosts} />
    </li>
  )
}

export default Post
