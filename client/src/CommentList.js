const CommentList = ({ comments }) => {
  return (
    <>
      <h4>Comments</h4>
      <ul>
        {comments.map(c => (
          <li key={c.commentId}>{c.status === 'APPROVED' ? c.content : c.status}</li>
        ))}
      </ul>
    </>
  )
}

export default CommentList
