import logo from './logo.svg'
import './App.css'
import BlogPost from './BlogPost'
import { useState } from 'react'

function App() {
  const [posts, setPosts] = useState([])
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [selectedPostIndex, setSelectedPostIndex] = useState(null)
  const [editedPost, setEditedPost] = useState(null)
  const [error, setError] = useState(null)

  const addPost = () => {
    if (title.trim() === '' || text.trim() === '') {
      setError('Title and body cannot be empty.') // set error message if title or body is empty
      return
    }

    const newPost = {
      title: title,
      body: text,
    }
    setPosts([...posts, newPost])
    setTitle('') // clear title and text after adding post
    setText('')
  }

  const deletePost = (index) => {
    const newPosts = [...posts]
    newPosts.splice(index, 1)
    setPosts(newPosts)
    setSelectedPostIndex(null)
    setEditedPost(null)
  }

  function generateRandomPost() {
    const loremIpsum = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Quisque sit amet arcu quis metus iaculis placerat.',
      'In hac habitasse platea dictumst.',
      'Praesent id est sed magna vestibulum bibendum quis ac velit.',
      'Donec faucibus libero ut odio feugiat, vel luctus magna faucibus.',
      'Suspendisse maximus nisl vitae dui pulvinar, eget pharetra augue ullamcorper.',
    ]

    const randomIndex = Math.floor(Math.random() * loremIpsum.length)
    const title = loremIpsum[randomIndex]
    const body = loremIpsum.slice(0, randomIndex + 1).join(' ')

    return { title, body }
  }

  function getRandomPicture() {
    const width = Math.floor(Math.random() * 500) + 500;
    const height = Math.floor(Math.random() * 500) + 500;
    const randomNum = Math.floor(Math.random() * 100000); // generate a random number
    return `https://picsum.photos/${width}/${height}?random=${randomNum}`;
  }

  const imageUrl = getRandomPicture(); // call the function to get a random image URL


  const generatePost = () => {
    const { title, body } = generateRandomPost()
    setTitle(title)
    setText(body)
  }

  const editSelectedPost = (index) => {
    setSelectedPostIndex(index)
    setEditedPost(posts[index])
  }

  const updatePost = () => {
    const newPosts = [...posts]
    newPosts[selectedPostIndex] = {
      ...editedPost,
      title: editedPost.title,
      body: editedPost.body,
    }
    {
      console.log(editedPost)
    }
    setPosts(newPosts)
    setSelectedPostIndex(null)
    setEditedPost(null)
  }

  return (
    <div>
      <header>
        <h1>My Blog</h1>
        <p>My first blog post!</p>
      </header>

      <div className="App">
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <br />
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        {error && (
        <div className="error-message">
         <p>❗ {error}</p>
        </div>
)}

        <div className="button-group">
          <button className="add-post-button" onClick={addPost}>
            Add Blog Post
          </button>
          <button className="generate-post-button" onClick={generatePost}>
            Generate Random Post
          </button>
        </div>
        {posts ? (
          posts.map((post, i) => (
            <div key={i} style={{marginBottom: '15px'}}>
              <BlogPost image={imageUrl} title={post.title} body={post.body} />

              <div className="edit-text-wrapper">
                {editedPost && selectedPostIndex !== null && (
                  <div>
                    <input
                      type="text"
                      value={editedPost.title}
                      onChange={(event) =>
                        setEditedPost({
                          ...editedPost,
                          title: event.target.value,
                        })
                      }
                    />
                    <textarea
                      value={editedPost.body}
                      onChange={(event) =>
                        setEditedPost({
                          ...editedPost,
                          body: event.target.value,
                        })
                      }
                    />
                    <button onClick={updatePost}>Save Changes</button>
                  </div>
                )}

                {selectedPostIndex === i && (
                  <button className="edit-button" onClick={() => deletePost(i)}>
                    Delete
                  </button>
                )}
                <div className="button-wrapper">
                  {selectedPostIndex !== i ? (
                    <button
                      className="edit-button"
                      onClick={() => editSelectedPost(i)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="edit-button"
                      onClick={() => setSelectedPostIndex(null)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts</p>
        )}
      </div>
    </div>
  )
}

export default App
