import React from 'react'
import '../assets/scss/report.scss'
import { LuAlertTriangle } from "react-icons/lu";

const ReportModal = ({ show, onClose, onConfirm }) => {
    return (
        show && (
            <div className="modal-backdrop">
                <div className="modal">
                    <LuAlertTriangle className="modal-icon" />
                    <p>정말 신고하시겠습니까?</p>
                    <div className="modal-actions">
                        <button className="confirm-btn" onClick={onConfirm}>확인</button>
                        <button className="cancel-btn" onClick={onClose}>취소</button>
                    </div>
                </div>
            </div>
        )
    )
}

export default ReportModal