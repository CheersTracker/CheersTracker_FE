import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import '../assets/scss/search.scss'
import '../assets/scss/community.scss'
import CommuList from '../components/CommuList'
import Comment from '../components/Comment'
import SideBar from '../components/SideBar'
import axios from 'axios';
import { Link } from 'react-router-dom'

const MyCommunity = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const [myComments, setMyComments] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const categories = ['내가 쓴 글', '좋아요 누른 글', '내가 쓴 댓글'];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const fetchMyPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/community/user/posts/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      console.log(response.data)
      setMyPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchMyComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/community/user/comments/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      console.log(response.data);
      setMyComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchMyLikedPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/community/user/liked-posts/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      console.log(response.data);
      setLikedPosts(response.data);
    } catch (error) {
      console.error('Error fetching liked posts:', error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  useEffect(() => {
    if (activeIndex === 2) {
      fetchMyComments();
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === 1) {
      fetchMyLikedPosts();
    }
  }, [activeIndex]);

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div className='commupg_container'>
        <section className='commupg_header'>
          <div className="header_search_cate">
            <Search />
            <ul className="category_list">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={activeIndex === index ? 'active' : ''}
                  onClick={() => handleClick(index)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="commu_list_area">
          {activeIndex === 0 && myPosts.length > 0 ? (
            myPosts.map((post) => (
              <Link to={`/community/posts/${post.id}`}>
                <div className="commu_list_item" key={post.id}>
                  <CommuList post={post} postid={post.id} />
                </div>
              </Link>
            ))
          ) : activeIndex === 1 && likedPosts.length > 0 ? (
            likedPosts.map((post) => (
              <div className="commu_list_item" key={post.id}>
                <CommuList post={post} postid={post.id} />
              </div>
            ))
          ) : activeIndex === 2 && myComments.length > 0 ? (
            myComments.map((comment) => (
              <div style={{ width: "95%", position: "relative", left: "5%" }} key={comment.id}>
                <Comment comment={comment} />
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              {activeIndex === 0 ? '작성한 글이 없습니다.' : '작성한 댓글이 없습니다.'}
            </p>
          )}
        </section>
      </div>
    </div>
  )
}

export default MyCommunity