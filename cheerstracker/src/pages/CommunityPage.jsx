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
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [postid, setPostId] = useState(null);

  const categories = ['전체', '음주', '금주', 'Q&A'];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const fetchPosts = async (search = '') => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/community/posts/`, {
        params: { search },
      });
      setPosts(response.data);
      console.log("community",response.data)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchPosts(searchTerm);
    } else {
      fetchPosts();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (activeIndex === 0) {
      setFilteredPosts(posts);
    } else {
      const category = categories[activeIndex];
      const newFilteredPosts = posts.filter(post => post.category === category);
      setFilteredPosts(newFilteredPosts);
    }
  }, [activeIndex, posts]);

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div className='commupg_container'>
        <section className='commupg_header'>
          <div className="header_search_cate">
            <Search setSearchTerm={setSearchTerm} />
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
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Link to={`/community/posts/${post.id}`}>
                <div className="commu_list_item">
                  <CommuList key={post.id} post={post} postid={post.id} />
                </div>
              </Link>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>작성된 글이 없습니다.</p>
          )}
        </section>
      </div>
    </div>
  )
}

export default CommunityPage