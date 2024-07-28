import React, { useRef, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { LiaComment } from 'react-icons/lia'
import { FaEllipsisV, FaRegTrashAlt } from "react-icons/fa";
import { LuSendHorizonal, LuPencil } from "react-icons/lu";
import { BsShare, BsArrowReturnRight } from "react-icons/bs";
import Comment from '../components/Comment'
import ReComment from './ReComment';


const CommuDetail = () => {
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
                <div className='detail_category'>음주</div>
                <div className="detail_title">이정도면 음주 습관 안 좋은 편인가요?</div>
                <div className="list_box">
                    <div className="list_nick">
                        레몬나르고빚갚으리오
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
                    <li><span className='li2'>삭제하기</span><FaRegTrashAlt className='li_icon li2_icon' /></li>
                    <li><span className='li3' onClick={handleCopyURL}>URL복사</span><BsShare className='li_icon li3_icon' /></li>
                </ul>
            )}
            <section className='detail_sec2'>
                <div className="detail_content">
                    제목 그대로 제 음주 습관에 대한 내용입니다.
                    일주일에 3~4번 정도 친구들 만나서 술자리 가지는데 못해도 최소한 소주 1병반 이상은 마시는 편인 것 같아요. 친구가 좀 많아서인지 주변 다른 친구들에 비해 술을 많이 마시는 편인 것 같더라고요. 예전엔 신경 안 썼는데 요즘 들어서 회복이 잘 안 되다보니 해장에 더 신경쓰게 되고 다음 날 일정 수행할 때도 지장을 좀 미치는 것 같아서요. 이게 요즘 몸 상태가 안 좋은 건지, 아니면 제 음주 습관이 나쁜 건지 잘 모르겠어서 글 남깁니다.
                    아무래도 성인이라 그런지 시간 맞추기가 어렵다보니 맞는 시간 찾으려면 거의 밤에만 만나게 되어서 만났다하면 술을 먹게 되는 것 같은데, 밤에 만나도 술 안 먹고 시간 보내는 방법 있으시면 공유해주시면 감사할 것 같습니다. 금주 목표 세우기만 하면 상황상 자꾸 실패하게 되네요. 혼술은 안 한지 한참 되었는데...
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
                                    <LuSendHorizonal className='comment_sendBtn' />
                                )}
                            </div>
                            {showCancel && (
                                <p><span onClick={handleCancel}>취소</span></p>
                            )}
                        </div>
                        <div className="comment_list">
                            <Comment onClick={toggleReComments} />
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
                        <div className="comment_list">
                            <Comment />
                        </div>
                        <div className="comment_list">
                            <Comment />
                        </div>
                    </section>
                )
            }
        </div >
    )
}

export default CommuDetail