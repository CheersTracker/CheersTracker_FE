import React, { useState } from 'react'
import Search from '../components/Search'
import '../assets/scss/search.scss'
import '../assets/scss/community.scss'
import CommuList from '../components/CommuList'
import SideBar from '../components/SideBar'
import axios from 'axios';

const MyCommunity = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [myPosts, setMyPosts] = useState([]);

  const categories = ['내가 쓴 글', '좋아요 누른 글', '댓글 단 글'];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const fetchMyPosts = async () => {
    try {
      const response = await axios.get(`/api/myalcom`);
      setMyPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
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
        </section>
        <section className="commu_list_area">
          {myPosts.length > 0 ? myPosts.map(() => (
            <div className="commu_list_item">
              <CommuList />
            </div>
          )) : "작성한 글이 없습니다."}
        </section>
      </div>
    </div>
  )
}

export default MyCommunity