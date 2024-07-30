import React from 'react'
import '../assets/scss/commudetail.scss'
import Search from '../components/Search'
import WriteBtn from '../components/WriteBtn'
import CommuDetail from '../components/CommuDetail'
import SideBar from '../components/SideBar'

const CommuDetailPage = () => {
  return (
    <div style={{display: 'flex'}}>
    <SideBar />
    <div className='commu_detailpg_container'>
      <section className='commupg_header'>
        <div className="header_search_cate">
          <Search />
        </div>
        <WriteBtn />
      </section>
      <section className="commu_list_area">
        <CommuDetail />
      </section>
    </div>
    </div>
  )
}

export default CommuDetailPage