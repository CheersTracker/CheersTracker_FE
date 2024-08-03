import React, { useRef, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { LiaComment } from 'react-icons/lia'
import { FaEllipsisV, FaRegTrashAlt } from "react-icons/fa";
import { LuSendHorizonal, LuPencil } from "react-icons/lu";
import { BsShare, BsArrowReturnRight } from "react-icons/bs";
import Comment from '../components/Comment'
import ReComment from './ReComment';


const CommuDetail = ({ commuDetail, commentList, deletePost, addComment }) => {
    const inputRef = useRef(null);

    const [showComments, setShowComments] = useState(false);
    const [showReComments, setShowReComments] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const [showReCancel, setShowReCancel] = useState(false);
    const [showList, setShowLists] = useState(false);
    const [clickHeart, setClickHeart] = useState(false);

    const handleClickHeart = () => {
        setClickHeart(!clickHeart);
    };

    const toggleReComments = () => {
        setShowReComments(!showReComments);
    };

    const toggleComments = () => {
        setShowComments(!showComments);
        setShowReComments(false);
    };

    const toggleLists = () => {
        setShowLists(!showList);
    };

    const handleFocus = () => {
        setShowCancel(true);
    };

    const handleBlur = () => {
        setShowCancel(false);
    };

    const handleReFocus = () => {
        setShowReCancel(true);
    };

    const handleReBlur = () => {
        setShowReCancel(false);
    };

    const handleCancel = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
        setShowReCancel(false);
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
                console.error('URL 복사 실패:', err)
            });
    };

    return (
        <div className='commu_detail_container'>
            <section className='detail_sec1'>
                <div className='detail_category'>{commuDetail.category}</div>
                <div className="detail_title">{commuDetail.title}</div>
                <div className="list_box">
                    <div className="list_nick">
                        {commuDetail.author}
                    </div>
                    <div className="box_time">2024.7.21.18:10</div>
                    <div className="box_content">
                        <div className="content_item view_item">
                            <AiOutlineEye className='eye' />
                            <span>127</span>
                        </div>
                    </div>
                    <FaEllipsisV className="detail_list" onClick={toggleLists} />
                </div>
            </section>
            {showList && (
                <ul className='detail_list_box'>
                    <li><span className='li1'>수정하기</span><LuPencil className='li_icon li1_icon' /></li>
                    <li><span className='li2' onClick={deletePost}>삭제하기</span><FaRegTrashAlt className='li_icon li2_icon' /></li>
                    <li><span className='li3' onClick={handleCopyURL}>URL복사</span><BsShare className='li_icon li3_icon' /></li>
                </ul>
            )}
            <section className='detail_sec2'>
                <div className="detail_content">
                    {commuDetail.content}
                </div>
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
                        <span>4</span>
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
                            <div className="comment_list">
                                <Comment onClick={toggleReComments} comment={comment} />
                                {showReComments && (
                                    <div className="recomment_area">
                                        <div className="recomment">
                                            <BsArrowReturnRight className='recommet_arrow' />
                                            <div className="input_box_container">
                                                <input type="text"
                                                    className='comment_input_box'
                                                    ref={inputRef}
                                                    onFocus={handleReFocus}
                                                    onBlur={handleReBlur}
                                                    placeholder='댓글 추가'
                                                />
                                                {showCancel && (
                                                    <LuSendHorizonal className='comment_sendBtn' />
                                                )}
                                            </div>
                                        </div>
                                        {showReCancel && (
                                            <p><span onClick={handleReCancel}>취소</span></p>
                                        )}
                                        <div className="recomment">
                                            <BsArrowReturnRight className='recommet_arrow' />
                                            <ReComment />
                                        </div>
                                        <div className="recomment">
                                            <BsArrowReturnRight className='recommet_arrow' />
                                            <ReComment />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )) : <p style={{ textAlign: "center", paddingTop: "20px" }}>작성된 댓글이 없습니다.</p>}
                    </section>
                )
            }
        </div >
    )
}

export default CommuDetail