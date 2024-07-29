import React from 'react'
import '../assets/scss/deleteaccount.scss';
import alert from '../assets/images/alert.svg';

const DeleteAccount2 = () => {
    return (
        <div className='user-deleted-container'>
            <img src={alert} alt="경고 아이콘" />
            <p>탈퇴되었습니다.</p>
            <button>닫기</button>
        </div>
      )
}

export default DeleteAccount2
