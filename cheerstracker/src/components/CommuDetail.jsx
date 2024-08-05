import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { LiaComment } from 'react-icons/lia';
import { FaEllipsisV, FaRegTrashAlt } from 'react-icons/fa';
import { LuSendHorizonal, LuPencil } from 'react-icons/lu';
import { BsShare, BsArrowReturnRight } from 'react-icons/bs';
import Comment from '../components/Comment';
import ReComment from './ReComment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CommuDetail = ({ commuDetail, deletePost, nickname, postid }) => {
    console.log('commuDetail', commuDetail);
    const commuAPI = window.location.pathname.split('/').filter(segment => segment !== '').pop();
    const commuAPIInt = parseInt(commuAPI, 10);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const [showComments, setShowComments] = useState(false);
    const [openReCommentId, setOpenReCommentId] = useState(null);
    const [showCancel, setShowCancel] = useState(false);
    const [showReCancel, setShowReCancel] = useState(false);
    const [showList, setShowLists] = useState(false);
    const [clickHeart, setClickHeart] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [commentLength, setCommentLength] = useState(0);
    const [newReComment, setNewReComment] = useState('');
    const [reCommentList, setReCommentList] = useState([]);
    const [reCommentLength, setReCommentLength] = useState(0);

    const addComment = async () => {
        if (!newComment) {
            alert('댓글을 입력해주세요.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://127.0.0.1:8000/community/comments/`, { post: commuAPIInt, content: newComment }, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            console.log(response.data);
            setNewComment('');
            setShowCancel(false);
            fetchCommentList();
        } catch (error) {
            console.error('Error adding comment:', error.response.data);
            alert('댓글 작성에 실패했습니다.');
        }
    };

    const fetchCommentList = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/community/comments/`);
            const filteredComments = response.data.filter(comment => comment.post === postid && comment.parent === null);
            if (filteredComments.length > 0) {
                setCommentList(filteredComments);
                setCommentLength(filteredComments.length);
                console.log('Filtered comments:', filteredComments);
                setReCommentList([]);
                filteredComments.forEach(comment => {
                    fetchReCommentList(comment.id);
                });
            } else {
                console.log('해당 포스트에 댓글이 없습니다.');
                setCommentList([]);
                setReCommentList([]);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const addReComment = async (commentId) => {
        if (!newReComment) {
            alert('댓글을 입력해주세요.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://127.0.0.1:8000/community/comments/`, { post: commuAPIInt, content: newReComment, parent: commentId }, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            console.log('recomment', response.data);
            setNewReComment('');
            setShowReCancel(false);
            fetchReCommentList(commentId);
        } catch (error) {
            console.error('Error adding comment:', JSON.stringify(error.response.data));
            alert('댓글 작성에 실패했습니다.');
        }
    };

    const fetchReCommentList = async (commentId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/community/comments/`);
            const filteredReComments = response.data.filter(comment => comment.post === postid && comment.parent === commentId);
            if (filteredReComments.length > 0) {
                setReCommentList(prevReComments => [
                    ...prevReComments.filter(recomment => recomment.parent !== commentId),
                    ...filteredReComments
                ]);
                setReCommentLength(filteredReComments.length);
                console.log('Filtered recomments:', filteredReComments);
            } else {
                console.log('해당 댓글에 대댓글이 없습니다.');
                setReCommentList(prevReComments => [
                    ...prevReComments.filter(recomment => recomment.parent !== commentId)
                ]);
            }
        } catch (error) {
            console.error('댓글을 가져오는 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        fetchCommentList();
    }, [postid]);

    const updatePost = () => {
        const postId = window.location.pathname.split('/').filter(segment => segment !== '').pop();
        navigate(`/post/${postId}`, { state: { isEditing: true } });
    };

    const handleClickHeart = () => {
        setClickHeart(!clickHeart);
    };

    const toggleReComments = (commentId) => {
        if (openReCommentId === commentId) {
            setOpenReCommentId(null);
        } else {
            setOpenReCommentId(commentId);
        }
    };

    const toggleComments = () => {
        setShowComments(!showComments);
        setOpenReCommentId(null);
    };

    const toggleLists = () => {
        setShowLists(!showList);
    };

    const handleFocus = () => {
        setShowCancel(true);
    };

    const handleBlur = () => {
        if (!newComment) {
            setShowCancel(false);
        }
    };

    const handleReFocus = () => {
        setShowReCancel(true);
    };

    const handleReBlur = () => {
        if (!newReComment) {
            setShowReCancel(false);
        }
    };

    const handleCancel = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
        setShowCancel(false);
    };

    const handleReCancel = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
        setShowReCancel(false);
    };

    const handleCopyURL = () => {
        const urlToCopy = window.location.href;
        navigator.clipboard.writeText(urlToCopy)
            .then(() => {
                alert('URL이 복사되었습니다!');
            })
            .catch(err => {
                console.error('URL 복사 실패:', err);
            });
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}.${month}.${day}.${hours}:${minutes}`;
    };

    return (
        <div className='commu_detail_container'>
            <section className='detail_sec1'>
                <div className='detail_category'>{commuDetail.category}</div>
                <div className="detail_title">{commuDetail.title}</div>
                <div className="list_box">
                    <div className="list_nick">
                        {nickname}
                    </div>
                    <div className="box_time">{formatDateTime(commuDetail.updated_at)}</div>
                    <FaEllipsisV className="detail_list" onClick={toggleLists} />
                </div>
            </section>
            {showList && (
                <ul className='detail_list_box'>
                    <li><span className='li1' onClick={updatePost}>수정하기</span><LuPencil className='li_icon li1_icon' /></li>
                    <li><span className='li2' onClick={deletePost}>삭제하기</span><FaRegTrashAlt className='li_icon li2_icon' /></li>
                    <li><span className='li3' onClick={handleCopyURL}>URL복사</span><BsShare className='li_icon li3_icon' /></li>
                </ul>
            )}
            <section className='detail_sec2'>
                <div className="detail_content">
                    {commuDetail.content ? commuDetail.content.replace(/<[^>]+>/g, '') : '내용이 없습니다.'}
                </div>
                {commuDetail.image && (
                    <img src={commuDetail.image} alt="" style={{ height: "250px" }} />
                )}
                <div className="box_content">
                    <div className="content_item heart_item">
                        {clickHeart ? (
                            <GoHeartFill className='fillheart' onClick={handleClickHeart} />
                        ) : (
                            <GoHeart className='heart' onClick={handleClickHeart} />
                        )}
                        <span>14</span>
                    </div>
                    <div className="content_item comment_item">
                        <LiaComment className='comment' onClick={toggleComments} />
                        <span>{commentLength}</span>
                    </div>
                </div>
            </section>
            {
                showComments && (
                    <section className='comment_box'>
                        <div className="comment_input_container">
                            <div className="input_box_container">
                                <input type="text"
                                    className='comment_input_box'
                                    ref={inputRef}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder='댓글 추가'
                                />
                                {showCancel && (
                                    <LuSendHorizonal className='comment_sendBtn' onClick={addComment} />
                                )}
                            </div>
                            {showCancel && (
                                <p><span onClick={handleCancel}>취소</span></p>
                            )}
                        </div>
                        {commentList.length > 0 ? commentList.map((comment) => (
                            <div className="comment_list" key={comment.id}>
                                <Comment onClick={() => toggleReComments(comment.id)} comment={comment} fetchCommentList={fetchCommentList} reCommentLength={reCommentLength}
                                />
                                {openReCommentId === comment.id && (
                                    <div className="recomment_area">
                                        <div className="recomment">
                                            <BsArrowReturnRight className='recommet_arrow' />
                                            <div className="input_box_container">
                                                <input type="text"
                                                    className='comment_input_box'
                                                    ref={inputRef}
                                                    value={newReComment}
                                                    onFocus={handleReFocus}
                                                    onBlur={handleReBlur}
                                                    onChange={(e) => setNewReComment(e.target.value)}
                                                    placeholder='대댓글 추가'
                                                />
                                                {showReCancel && (
                                                    <LuSendHorizonal className='comment_sendBtn'
                                                        onClick={() => addReComment(comment.id)} />
                                                )}
                                            </div>
                                        </div>
                                        {showReCancel && (
                                            <p style={{ marginTop: "5px" }}><span onClick={handleReCancel}>취소</span></p>
                                        )}
                                        {reCommentList.length > 0 ? reCommentList.map((recomment) => (
                                            <div className="recomment" key={recomment.id}>
                                                <BsArrowReturnRight className='recommet_arrow' />
                                                <ReComment recomment={recomment} nickname={nickname} />
                                            </div>
                                        )) : <p style={{ textAlign: "center", paddingTop: "20px" }}>작성된 대댓글이 없습니다.</p>}
                                    </div>
                                )}
                            </div>
                        )) : <p style={{ textAlign: "center", paddingTop: "20px" }}>작성된 댓글이 없습니다.</p>}
                    </section>
                )
            }
        </div>
    );
};

export default CommuDetail;
