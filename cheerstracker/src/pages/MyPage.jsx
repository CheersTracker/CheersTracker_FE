import React, { useEffect, useState } from 'react';
import '../assets/scss/mypage.scss';
import Comment from '../assets/images/comment.svg';
import Mypost from '../assets/images/mypost.svg';
import Heart from '../assets/images/heart.svg';
import SideBar from '../components/SideBar';
import axios from 'axios';

const MyPage = () => {

  const [id,setId] = useState('');

  const getId = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/user/account/', {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        
        if (response.data) {
          console.log('리스폰스 데이터:',response.data);
            setId(response.data.username);
        }
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
