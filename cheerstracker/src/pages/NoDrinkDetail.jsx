import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/scss/nodrinkdetail.scss';

const NoDrinkDetail = () => {
    const location = useLocation();
    const { startDate, endDate, averageCost, goalMessage } = location.state || {};
    
    const [isEditing, setIsEditing] = useState(false);
    const [note, setNote] = useState('');
    const [tempNote, setTempNote] = useState('');

    const handleWriteClick = () => {
        setIsEditing(true);
        setTempNote('');
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setTempNote('');
    };

    const handleCompleteClick = () => {
        setNote(tempNote);
        setIsEditing(false);
        setTempNote('');
    };

    const handleEditClick = () => {
        setTempNote(note);
        setIsEditing(true);
    };

    return (
        <div className='nodrink-detail-big-container'>
            <div className='nodrink-detail-header'>
                <div className='nodrink-detail-header-left'>
                    <div>
                        <p>OOO</p>
                        <p>님의 금주 기록</p>

                        {/* 공개 비공개 버튼 자리 */}
                        <div>

                        </div>
                    </div>
                </div>
                <div className='nodrink-detail-header-right'>
                    <div>
                        오늘,
                        <p>13일</p>
                        째 금주 중
                    </div>
                    <div>
                        목표인
                        <p>31일</p>
                        까지 
                        <p>18일</p>
                        남았어요!
                    </div>
                </div>
            </div>

            <div className='nodrink-detail-content-container'>
            <div className='nodrink-detail-container section2'>
                <div>
                    <h3>금주 시작</h3>
                    <div className='section2-date'>
                    {startDate ? new Date(startDate).toLocaleDateString() : ''}
                    </div>
                </div>
                <div></div>
                <div>
                    <h3>금주 종료(목표)</h3>
                    <div className='section2-date'>
                        {endDate ? new Date(endDate).toLocaleDateString() : ''}
                    </div>
                </div>
            </div>
            <div className='nodrink-detail-container section2'>
                <div>
                    <h3>절약 비용</h3>
                    <div className='money-saved'>
                        <p>{averageCost || ''}</p>
                        <p>\</p>
                    </div>
                </div>
                <div></div>
                <div>
                    <h3>섭취하지 않은 칼로리</h3>
                    <p className='kcal-text'>kcal</p>
                </div>
            </div>

            <div className='nodrink-detail-container'>
                <h3>금주 목표</h3>
                <p className='norink-detail-goal-container'>{goalMessage || ''}</p>
            </div>

            <div className='nodrink-detail-container'>
                <div className='nodrink-detail-memo'>
                    {isEditing ? (
                        <>
                            <div>
                                <h3>오늘의 금주 메모</h3>
                                {note ? (
                                    <div>
                                        <button onClick={handleCancelClick} className='btn-gray'>취소</button>
                                        <button onClick={handleCompleteClick}>수정 완료</button>
                                    </div>
                                ) : (
                                    <div>                                        
                                        <button onClick={handleCancelClick} className='btn-gray'>취소</button>
                                        <button onClick={handleCompleteClick}>작성 완료</button>
                                    </div>
                                )}
                            </div>
                            
                            <input className='nodrink-today-goal-input'
                                type="text"
                                value={tempNote}
                                onChange={(e) => setTempNote(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            {note ? (                                
                                <>
                                    <div>
                                        <h3>오늘의 금주 메모</h3>
                                        <button onClick={handleEditClick}>수정하기</button>
                                    </div>
                                    <p>{note}</p>
                                </>                                
                            ) : (
                                <>
                                    <div>
                                        <h3>오늘의 금주 메모</h3>
                                        <button onClick={handleWriteClick}>작성하기</button>
                                    </div>
                                    <span>작성하러 가볼까요?</span>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>            
    );
}

export default NoDrinkDetail;
