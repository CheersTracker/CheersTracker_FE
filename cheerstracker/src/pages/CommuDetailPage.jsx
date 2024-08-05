import React, { useEffect, useState } from 'react'
import '../assets/scss/commudetail.scss'
import Search from '../components/Search'
import WriteBtn from '../components/WriteBtn'
import CommuDetail from '../components/CommuDetail'
import SideBar from '../components/SideBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const CommuDetailPage = () => {
  const commuDetailAPI = window.location.pathname;
  const navigate = useNavigate();
  const [commuDetail, setCommuDetail] = useState([]);
  const [nickname, setNickname] = useState('');
  const [postid, setPostId] = useState(null);
  // const currentUser = localStorage.getItem('username');

  const fetchPostsDetail = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/${commuDetailAPI}/`);
      if (response.data) {
        setCommuDetail(response.data);
        setNickname(response.data.author.nickname);
        setPostId(response.data.id);
    } else {
        console.error('No data found in response');
    }
      console.log("commuDetail", response.data)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async () => {
    const confirmed = window.confirm('정말로 이 글을 삭제하시겠습니까?');
    if (!confirmed) {
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/${commuDetailAPI}/`, {
        headers: {
            'Authorization': `Token ${token}`,
        },
    });
      alert('글이 성공적으로 삭제되었습니다.');
      navigate('/community');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('글 삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchPostsDetail();
  }, []);


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
        <CommuDetail commuDetail={commuDetail} deletePost={deletePost} nickname={nickname} postid={postid} />
      </section>
    </div>
    </div>
  )
}

export default CommuDetailPage