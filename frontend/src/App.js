import React, { useState } from 'react'
import { useEffect } from 'react'
import List from './components/list'
import axios from "axios"
import { baseURL } from "./utils/constant"

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [input, setInput] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [blogs, setBlogs] = useState([])
  const [updateList, setUpdateList] = useState(false)
  const [updateId, setUpdateId] = useState(null)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInput("");
    setTitle("");
    setAuthor("");
  };

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      setBlogs(res.data)
    });
  }, [updateList]);

  const addBlog = () => {
    if (input && title && author)
    {
      axios.post(`${baseURL}/save`, { blog: input, title: title, author: author }).then((res) => {
        setTitle("");
        setAuthor("");
        setInput("");
        closeModal();
        setUpdateList((prevState) => !prevState);
      });
    }
  };

  const updateMode = (id, text, title, author) => {
    openModal();
    setInput(text);
    setTitle(title);
    setAuthor(author);
    setUpdateId(id);
  };

  const updateBlog = () => {
    if (input && title && author) {
      axios.put(`${baseURL}/update/${updateId}`, { blog: input, title: title, author: author }).then((res) => {
        setUpdateList((prevState) => !prevState);
        setUpdateId(null);
        setTitle("");
        setAuthor("");
        setInput("");
        closeModal();
      });
    }
  };

  return (
    <main>
      <div className="title">
        <h1 className="main-title">Blogs Application</h1>
        <button className="open-modal-btn" onClick={openModal}>
          Add a new blog
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
        <div className="textarea-container modal-content">
          <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <span className="required-sign">*</span>
          <input
            type="text"
            placeholder="Title"
            className='tb-form'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className="required-sign">*</span>
          <input
            type="text"
            className='tb-form'
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            className="textarea-blog"
            placeholder='Write your blog here..'
            rows="10"
            cols="50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <span className="required-sign">*</span>
          <button
            className="new-blog-btn"
            type="submit"
            onClick={updateId ? updateBlog : addBlog}
          >
            {updateId ? "Update Blog" : "Add Blog"}
          </button>
        </div>
        </div>
      )}
      <h2 className="main-title">Latest Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <List
            key={blog._id}
            id={blog._id}
            blog={blog.blog}
            title={blog.title}
            author={blog.author}
            setUpdateList={setUpdateList}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
}

export default App