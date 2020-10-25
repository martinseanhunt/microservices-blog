import './ListPosts.css'

import Post from './Post'

const ListPosts = ({ posts }) => {
  return (
    <>
      <h3>Posts</h3>
      <ul className="posts">
        {posts.map(p => <Post post={p} key={p.id} />)}
      </ul>
    </>
  )
}

export default ListPosts
