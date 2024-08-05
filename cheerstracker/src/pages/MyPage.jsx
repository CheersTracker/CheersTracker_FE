import React, { useEffect, useState } from 'react';
import '../assets/scss/mypage.scss';
import Comment from '../assets/images/comment.svg';
import Mypost from '../assets/images/mypost.svg';
import Heart from '../assets/images/heart.svg';
import SideBar from '../components/SideBar';
import axios from 'axios';

const MyPage = () => {

  // 인증된 사용자인지에 대한 조건 추가해야 됨
  const [id,setId] = useState('');
  const getId = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/user/account/`);
      setId(response.data.id);
      console.log(response.data);
    } catch (error) {
      console.log('오류 발생: ' + error.message);
    }
  };

  useEffect(() => {
    getId();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div className='mypage-main-container'>
        <h1>마이페이지</h1>
        <div className='mapage-account-container'>
          <h2>계정</h2>
          <div>
            <h4>아이디</h4>
            <p>{id}</p>
          </div>
          <div>
            <h4>비밀번호</h4>
            <p>********</p>
          </div>
          <button className='change-password-btn'>비밀번호 변경</button>
        </div>
        <div className='mypage-line'></div>
        <div className='mypage-mypost-container'>
          <h2>모아보기</h2>
          <div>
            <img src={Mypost} alt="" />
            <p>내가 쓴 글</p>
          </div>
          <div>
            <img src={Comment} alt="" />
            <p>좋아요 누른 글</p>
          </div>
          <div>
            <img src={Heart} alt="" />
            <p>댓글 단 글</p>
          </div>
        </div>

        <button className='delete-account-btn'>CheersTracker 탈퇴하기</button>


      </div>
    </div>
  );
};

export default MyPage;
