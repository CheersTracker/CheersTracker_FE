import React, { useState } from 'react'
import '../assets/scss/comment.scss'
import { GoPerson } from "react-icons/go";
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { LiaComment } from 'react-icons/lia'
import { AiOutlineAlert } from "react-icons/ai";
import ReportModal from './ReportModal';
import ReportComModal from './ReportComModal';

const ReComment = () => {
    const [clickHeart, setClickHeart] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);

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

    const handleClickHeart = () => {
        setClickHeart(!clickHeart);
    };

    return (
        <div className='recomment_container'>
            <ReportModal
                show={showConfirmModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
            />
            <ReportComModal
                show={showCompleteModal}
                onClose={handleCloseModal}
            />
            <section className='comment_sec1'>
                <div className="list_box">
                    <div className="list_nick">
                        <GoPerson /> &nbsp;
                        레몬나르고빚갚으리오
                    </div>
                    <div className="box_time">3분전</div>
                </div>
                <p>
                    <span className='p3' onClick={handleReportClick}>신고하기<AiOutlineAlert /></span>
                </p>
            </section>
            <section className='comment_sec2'>
                <div className="detail_content">
                    저는 대학교  1, 2학년 때는 그랬던 것 같은데 건강도 건강이지만 아무리 알바해도 금세 통장이 텅텅 비어서 음주 습관을 바꿀 수 밖에 없더라고요. 지금까지 쭉 그렇게 해오셨는데 요즘 들어서 회복이 잘 안 되는 거면 이제는 줄이시는 게 맞는 것 같습니다. 여럿이서 만나는 것보다 둘이서 만나면 시간 조율이 쉬워서 낮에 만나기 좋아요.
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
                        <LiaComment className='comment' />
                        <span>4</span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ReComment