import React, { useState } from 'react'
import Search from '../components/Search'
import '../assets/scss/search.scss'
import '../assets/scss/community.scss'
import WriteBtn from '../components/WriteBtn'
import CommuList from '../components/CommuList'
import SideBar from '../components/SideBar'

const CommunityPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['전체', '음주', '금주', 'Q&A'];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div style={{display: 'flex'}}>
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
        <div className="commu_list_item">
          <CommuList />
        </div>
        <div className="commu_list_item">
          <CommuList />
        </div>
        <div className="commu_list_item">
          <CommuList />
        </div>
        <div className="commu_list_item">
          <CommuList />
        </div>
        <div className="commu_list_item">
          <CommuList />
        </div>
      </section>
    </div>
    </div>
  )
}

export default CommunityPage