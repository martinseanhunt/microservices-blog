const CommentList = ({ comments }) => {
  return (
    <>
      <h4>Comments</h4>
      <ul>
        {comments.map(c => (
          <li key={c.commentId}>{c.content}</li>
        ))}
      </ul>
    </>
  )
}

export default CommentList
