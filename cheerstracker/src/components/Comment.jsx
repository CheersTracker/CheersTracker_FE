import React, { useEffect, useState } from 'react'
import '../assets/scss/comment.scss'
import '../assets/scss/report.scss'
import { GoPerson } from "react-icons/go";
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { LiaComment } from 'react-icons/lia'
import { AiOutlineAlert } from "react-icons/ai";
import ReportModal from './ReportModal';
import ReportComModal from './ReportComModal';
import axios from 'axios';

const Comment = ({ onClick, comment, fetchCommentList, reCommentLength, currentUserId, commentOwnerId }) => {
  const commuAPI = window.location.pathname.split('/').filter(segment => segment !== '').pop();
  const commuAPIInt = parseInt(commuAPI, 10);
  const [clickCommentHeart, setClickCommentHeart] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [likeCommentCount, setLikeCommentCount] = useState(0);

  const handleCommentLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://127.0.0.1:8000/community/comments/${comment.id}/like/`, {}, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      if (response.status === 200) {
        setClickCommentHeart(true);
        setLikeCommentCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', JSON.stringify(error.response.data));
    }
  };

  const handleCommentUnlike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://127.0.0.1:8000/community/comments/${comment.id}/like/`, {}, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      if (response.status === 200) {
        setClickCommentHeart(false);
        setLikeCommentCount(prevCount => prevCount - 1);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', JSON.stringify(error.response.data));
    }
  };

  const handleCountCommentHeart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/community/comments/${comment.id}/like/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("likecount", response.data)
        const { is_liked, likes_count } = response.data;
        setClickCommentHeart(is_liked);
        setLikeCommentCount(likes_count);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    handleCountCommentHeart();
  }, [])
  
  const handleClickCommentHeart = () => {
    if (clickCommentHeart) {
      handleCommentUnlike();
    } else {
      handleCommentLike();
    }
  };

  useEffect(() => {
    if (isEditing) {
      setEditedContent(comment.content);
    }
  }, [isEditing, comment.content]);

  const handleReportClick = () => {
    setShowConfirmModal(true);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setShowCompleteModal(false);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowCompleteModal(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/community/comments/${comment.id}/`, {
        post: commuAPIInt,
        content: editedContent
      }, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      fetchCommentList();
      setIsEditing(false);
      alert('댓글이 성공적으로 수정되었습니다!');
    } catch (error) {
      console.error('Error updating comment:', JSON.stringify(error.response.data));
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const deleteComment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/community/comments/${comment.id}/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      fetchCommentList();
      alert('댓글이 성공적으로 삭제되었습니다!');
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm('댓글을 정말 삭제하시겠습니까?')) {
      deleteComment(comment.id);
    }
  };

  return (
    <div className='comment_container'>
      <ReportModal
        show={showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        className='report_modal'
      />
      <ReportComModal
        show={showCompleteModal}
        onClose={handleCloseModal}
      />
      <section className='comment_sec1'>
        <div className="list_box">
          <div className="list_nick">
            <GoPerson /> &nbsp;
            {comment.author.nickname}
          </div>
          <div className="box_time">3분전</div>
        </div>
        <p>
          {currentUserId === commentOwnerId ? (isEditing ? (
            <>
              <span className='p1' onClick={handleSaveClick}>저장</span>
              <span className='p2' onClick={() => setIsEditing(false)}>취소</span>
            </>
          ) : (
            <>
              <span className='p1' onClick={handleEditClick}>수정</span>
              <span className='p2' onClick={handleDeleteClick}>삭제</span>
              <span className='p3' onClick={handleReportClick}>신고하기<AiOutlineAlert /></span>
            </>
          )) : (
            <span className='p3' onClick={handleReportClick}>신고하기<AiOutlineAlert /></span>
          )}
        </p>
      </section>
      <section className='comment_sec2'>
        {isEditing ? (
          <div className="detail_content">
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="댓글을 수정하세요..."
            />
          </div>
        ) : (
          <div className="detail_content">
            {comment.content}
          </div>
        )}
        <div className="box_content">
          <div className="content_item heart_item">
            {clickCommentHeart ? (
              <GoHeartFill className='fillheart' onClick={handleClickCommentHeart} />
            ) : (
              <GoHeart className='heart' onClick={handleClickCommentHeart} />
            )}
            <span>{likeCommentCount}</span>
          </div>
          <div className="content_item comment_item">
            <LiaComment className='comment' onClick={onClick} />
            <span>{reCommentLength}</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Comment