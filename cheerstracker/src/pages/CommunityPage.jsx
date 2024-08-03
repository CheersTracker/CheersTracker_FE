import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import '../assets/scss/search.scss'
import '../assets/scss/community.scss'
import WriteBtn from '../components/WriteBtn'
import CommuList from '../components/CommuList'
import SideBar from '../components/SideBar'
import axios from 'axios';
import { Link } from 'react-router-dom'

const CommunityPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [posts, setPosts] = useState([]);

  const categories = ['전체', '음주', '금주', 'Q&A'];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/community/posts/`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
          <WriteBtn />
        </section>
        <section className="commu_list_area">
          {posts.length > 0 ? posts.map((post) => (
            <Link to={`/community/posts/${post.id}`}>
              <div className="commu_list_item">
                <CommuList key={post.id} post={post} />
              </div>
            </Link>
          )) : <p style={{ textAlign: "center" }}>작성된 글이 없습니다.</p>}
        </section>
      </div>
    </div>
  )
}

export default CommunityPage