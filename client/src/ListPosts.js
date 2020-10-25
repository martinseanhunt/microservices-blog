import './ListPosts.css'

import Post from './Post'

const ListPosts = ({ posts, getPosts }) => {
  return (
    <>
      <h3>Posts</h3>
      <ul className="posts">
        {posts.map(p => <Post post={p} key={p.id} getPosts={getPosts} />)}
      </ul>
    </>
  )
}

export default ListPosts
