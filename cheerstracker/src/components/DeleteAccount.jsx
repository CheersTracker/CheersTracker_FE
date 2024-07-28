import React from 'react';
import '../assets/scss/deleteaccount.scss';
import alert from '../assets/images/alert.svg';

const DeleteAccount = () => {
  return (
    <div className='user-delete-container'>
        <img src={alert} alt="경고 아이콘" />
        <p>정말 탈퇴하시겠습니까?</p>
        <div>
          <button>확인</button>
          <button>취소</button>
        </div>
    </div>
  )
}

export default DeleteAccount
