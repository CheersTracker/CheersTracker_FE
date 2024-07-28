import React from 'react'
import '../assets/scss/report.scss'
import { LuAlertTriangle } from "react-icons/lu";

const ReportComModal = ({ show, onClose }) => {
    return (
        show && (
            <div className="modal-backdrop">
                <div className="modal">
                    <LuAlertTriangle className="modal-icon" />
                    <p>신고 완료되었습니다.</p>
                    <div className="modal-actions2">
                        <button className="close-btn" onClick={onClose}>닫기</button>
                    </div>
                </div>
            </div>
        )
    )
}

export default ReportComModal