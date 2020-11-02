import { useState, useEffect } from 'react'
import axios from 'axios'

import CreatePost from './CreatePost'
import ListPosts from './ListPosts'

import './App.css'

const App = () => {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const res = await axios.get('http://microservices-blog.com/posts')
    setPosts([...Object.values(res.data)])
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <CreatePost getPosts={getPosts} />
        <ListPosts posts={posts} getPosts={getPosts} />
      </header>
    </div>
  );
}

export default App
