import React from "react";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useState} from "react";

const List = ({ id, blog, title, author, setUpdateList, updateMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const displayContent = showFullContent ? blog : blog.slice(0, 300);

  const openModal = () => {
    setIsMenuOpen(true);
  };

  const closeModal = () => {
    setIsMenuOpen(false);
  };

  const removeBlog = () => {
    closeModal();
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      axios.delete(`${baseURL}/delete/${id}`).then((res) => {
        console.log(res);
        setUpdateList((prevState) => !prevState);
      });
    }
  };

  return (
    <li className="blog-single">
      <div className="blog-title">
        <h2>
          <strong>{title}</strong>
        </h2>
        {isMenuOpen && (
          <div className="menu">
            <button
              onClick={() => {
                updateMode(id, blog, title, author);
                closeModal();
              }}
            >
              Update
            </button>
            <button onClick={removeBlog}>Delete</button>
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        )}
        <div className="menu-icon" onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 38 38"
          >
            <circle cx="5" cy="35" r="5" />
            <circle cx="20" cy="35" r="5" />
            <circle cx="35" cy="35" r="5" />
          </svg>
        </div>
      </div>
      <p className="authortxt">By: {author}</p>
      <p className="blog-content">
        {displayContent}
      </p>
      <div className="readmore-div">
        {blog.length > 300 && (
          <button className="read-more-button" onClick={toggleContent}>
            {showFullContent ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      {/* <div className="button-container"></div> */}
    </li>
  );
};

export default List;
