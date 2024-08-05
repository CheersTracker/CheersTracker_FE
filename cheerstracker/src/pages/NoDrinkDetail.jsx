import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/scss/nodrinkdetail.scss';
import SideBar from '../components/SideBar';
import axios from 'axios';

const NoDrinkDetail = () => {
    const location = useLocation();    
    const { startDate, endDate, averageCost, goalMessage } = location.state || {};
    
    const [isEditing, setIsEditing] = useState(false);
    const [note, setNote] = useState('');
    const [tempNote, setTempNote] = useState('');

    const handleEditClick = () => {
        setTempNote(note);
        setIsEditing(true);
    };

    const handleWriteClick = () => {
        setIsEditing(true);
        setTempNote(note); 
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setTempNote('');
    };

    
    // 메모 저장 함수
    const handleCompleteClick = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('토큰이 없습니다.');
                return;
            }

            const requestData = {
                user: currentId,
                start_date: startDay,
                end_date: endDay,
                savings: money,
                calories_saved: calories,
                sobriety_goal: goal,
                daily_memo: tempNote,
            };

            // 서버로 메모 저장 요청
            const response = await axios.post('http://localhost:8000/sobriety/records/', requestData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // 응답 성공 시
            if (response.status === 201 || response.status === 200) {
                setNote(tempNote);
                setIsEditing(false);
                setTempNote('');
            } else {
                alert('메모 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('메모 저장 에러:', error);
            if (error.response) {
                alert(`오류 발생: ${JSON.stringify(error.response.data)}`);
            } else {
                alert('서버와의 연결에 문제가 있습니다.');
            }
        }
    };

    // 유저 이름 불러오기
    const [currentId, setCurrentId] = useState(null);
    const [currentName, setCurrentName] = useState(null);

    const CurrentUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/user/current/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            setCurrentId(response.data.id);
            setCurrentName(response.data.username);
        } catch (error) {
            console.error('user:', error);
        }
    }

    useEffect(() => {
        CurrentUser();
    }, []);

    // 데이터 불러오기
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const [money, setMoney] = useState('');
    const [calories, setCalories] = useState('');
    const [goal, setGoal] = useState('');

    // 금주 기간 관련 정보
    const [passDay, setPassDay] = useState(0);
    const [duration, setDuration] = useState(0);
    const [remain, setRemain] = useState(0);

    const getNodrink = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/sobriety/records/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.data) {
                const record = response.data[0];
                setStartDay(record['start_date']);
                setEndDay(record['end_date']);
                setMoney(record['savings']);
                setCalories(record['calories_saved']);
                setGoal(record['sobriety_goal']);
                setNote(record['daily_memo']);
                setTempNote(record['daily_memo']);

                const currentDate = new Date(); 
                const startDate = new Date(record['start_date']); 
                const endDate = new Date(record['end_date']); 
                
                const passDay = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) +1;
                const duration = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                const remain = Math.floor((endDate - currentDate) / (1000 * 60 * 60 * 24));
                
                setPassDay(passDay);
                setDuration(duration);
                setRemain(remain);
            }
        } catch (error) {
            console.log('오류 발생: ' + error.message);
        }
    }
      
    useEffect(() => {
        getNodrink();
    }, []);

    return (
        <div style={{display: 'flex'}}>
          <SideBar/>
        <div className='nodrink-detail-big-container'>
            <div className='nodrink-detail-header'>
                <div className='nodrink-detail-header-left'>
                    <div>
                        <p>{currentName}</p>
                        <p>님의 금주 기록</p>

                        <input type="checkbox" id="toggle" hidden />
                        <label htmlFor="toggle" className="toggleSwitch">
                            <span className="toggleButton"></span>
                            <p className="public">공개</p>
                            <p className="private">비공개</p>
                        </label>                   
                    </div>
                </div>
                <div className='nodrink-detail-header-right'>
                    <div>
                        오늘,
                        <p>{passDay}일</p>
                        째 금주 중
                    </div>
                    <div>
                        목표인
                        <p>{duration}일</p>
                        까지 
                        <p>{remain}일</p>
                        남았어요!
                    </div>
                </div>
            </div>

            <div className='nodrink-detail-content-container'>
            <div className='nodrink-detail-container section2'>
                <div>
                    <h3>금주 시작</h3>
                    <div className='section2-date'>
                    {startDay}
                    </div>
                </div>
                <div></div>
                <div>
                    <h3>금주 종료(목표)</h3>
                    <div className='section2-date'>
                        {endDay}
                    </div>
                </div>
            </div>
            <div className='nodrink-detail-container section2'>
                <div>
                    <h3>절약 비용</h3>
                    <div className='money-saved'>
                        <p>{money}</p>
                        <p>\</p>
                    </div>
                </div>
                <div></div>
                <div>
                    <h3>섭취하지 않은 칼로리</h3>
                    <p className='kcal-text'>{calories}kcal</p>
                </div>
            </div>

            <div className='nodrink-detail-container'>
                <h3>금주 목표</h3>
                <p className='norink-detail-goal-container'>{goal}</p>
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
    </div>
    );
}

export default NoDrinkDetail;
