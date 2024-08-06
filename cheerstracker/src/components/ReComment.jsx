import React, { useState } from 'react'
import '../assets/scss/comment.scss'
import { GoPerson } from "react-icons/go";
import { AiOutlineAlert } from "react-icons/ai";
import ReportModal from './ReportModal';
import ReportComModal from './ReportComModal';

const ReComment = ({recomment}) => {
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
                        {recomment.author.nickname}
                    </div>
                    <div className="box_time">3분전</div>
                </div>
                <p>
                    <span className='p3' onClick={handleReportClick}>신고하기<AiOutlineAlert /></span>
                </p>
            </section>
            <section className='comment_sec2'>
                <div className="detail_content">
                    { recomment.content }
                </div>
            </section>
        </div>
    )
}

export default ReComment