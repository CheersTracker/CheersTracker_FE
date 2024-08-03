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
  const commentAPI = window.location.pathname;
  const navigate = useNavigate();
  const [commuDetail, setCommuDetail] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchPostsDetail = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/${commuDetailAPI}/`);
      setCommuDetail(response.data);
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
      await axios.delete(`http://127.0.0.1:8000/community/posts/${commuDetailAPI}/`);
      alert('글이 성공적으로 삭제되었습니다.');
      navigate('/community');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('글 삭제에 실패했습니다.');
    }
  };

  const addComment = async () => {
    if (!newComment) {
      alert('댓글을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/community/posts/${commuDetailAPI}/comments`, { text: newComment });
      setCommentList([...commentList, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const fetchCommentList = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/community/posts/$${commuDetailAPI}/comments/${commentAPI}`);
      setCommentList(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPostsDetail();
    fetchCommentList();
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
        <CommuDetail commuDetail={commuDetail} commentList={commentList} deletePost={deletePost} addComment={addComment} />
      </section>
    </div>
    </div>
  )
}

export default CommuDetailPage