import React from 'react'
import '../assets/scss/commudetail.scss'
import Search from '../components/Search'
import WriteBtn from '../components/WriteBtn'
import CommuDetail from '../components/CommuDetail'

const CommuDetailPage = () => {
  return (
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
  )
}

export default CommuDetailPage