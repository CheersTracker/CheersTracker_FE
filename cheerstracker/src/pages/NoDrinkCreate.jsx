import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/scss/nodrinkcreate.scss';
import Calendar from 'react-calendar';
import moment from 'moment';
import DownChevron from '../assets/images/DownChevron.svg';
import SideBar from '../components/SideBar'
import axios from 'axios';

const NoDrinkCreate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);
  const [averageCost, setAverageCost] = useState('');
  const [goalMessage, setGoalMessage] = useState('');
  const [drinkOptions, setDrinkOptions] = useState([
    { type: '맥주', isChecked: false, quantity: 0, description: '', description2: '' },
    { type: '소주', isChecked: false, quantity: 0, description: '', description2: '' },
    { type: '칵테일', isChecked: false, quantity: 0, description: '', description2: '' },
    { type: '과실주', isChecked: false, quantity: 0, description: '', description2: '(와인, 포도주)' },
    { type: '위스키', isChecked: false, quantity: 0, description: '', description2: '' },
    { type: '혼성주', isChecked: false, quantity: 0, description: '칵테일 외 혼성주 (인삼주, 매실주, 진 등)', description2: '' },
    { type: '발효주', isChecked: false, quantity: 0, description: '맥주, 과실주 외 (탁주, 약주, 청주 등)', description2: '(막걸리)' },
    { type: '증류주', isChecked: false, quantity: 0, description: '소주, 위스키 외 (브랜디, 리큐르 등)', description2: '' },
  ]);
  const navigate = useNavigate();

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setIsStartCalendarOpen(false);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setIsEndCalendarOpen(false);
  };

  const toggleStartCalendar = () => {
    setIsStartCalendarOpen(!isStartCalendarOpen);
    setIsEndCalendarOpen(false);
  };

  const toggleEndCalendar = () => {
    setIsEndCalendarOpen(!isEndCalendarOpen);
    setIsStartCalendarOpen(false);
  };

  const handleCheckboxChange = (index) => {
    setDrinkOptions((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index ? { ...option, isChecked: !option.isChecked } : option
      )
    );
  };

  const handleIncrement = (index) => {
    setDrinkOptions((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index && option.isChecked
          ? { ...option, quantity: option.quantity + 1 }
          : option
      )
    );
  };

  const handleDecrement = (index) => {
    setDrinkOptions((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index && option.isChecked && option.quantity > 0
          ? { ...option, quantity: option.quantity - 1 }
          : option
      )
    );
  };



  // 유저 이름 불러오기
  const [currentId, setCurrentId] = useState(null);

  const CurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/user/current/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        setCurrentId(response.data.id);
      } catch (error) {
      //   console.error('user:', error);
      }
    }

    useEffect(() => {
      CurrentUser();
    },[])

    const handleSubmit = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          alert('토큰이 없습니다.');
          return;
        }
        
        const requestData = {
          user: currentId,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          average_consumption: averageCost,
          sobriety_goal: goalMessage,
        };
        console.log('금주 기록 저장 시도:', requestData);
    
        const response = await axios.post('http://127.0.0.1:8000/sobriety/records/', requestData, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        console.log('금주 기록 저장 성공:', response.data);
        navigate('/sobriety/detail');
      } catch (error) {
        console.error('금주 기록 페이지 에러:', error);
        if (error.response) {
          alert(`오류 발생: ${JSON.stringify(error.response.data)}`);
        } else {
          alert('서버와의 연결에 문제가 있습니다.');
        }
      }
    };
    

  return (
    <div style={{display: 'flex'}}>
      <SideBar/>
    <div className='nodrink-detail-big-container'>
      <div className='nodrink-detail-header'>
        <div>
          <h1>금주 기록</h1>
          <h2>금주 기록을 시작해볼까요?</h2>
        </div>
        <button onClick={handleSubmit}>저장하기</button>
      </div>
      <div className='nodrink-detail-main-container'>
        <div className='nodrink-detail-main-top'>
          <div className='nodrink-detail-calendar-title'>
            <h3>금주 목표 설정</h3>
            <h4>한 번 입력한 목표는 수정할 수 없어요!</h4>
          </div>
          <div className='nodrink-detail-calendar-container'>
            <p>시작</p>
            <div className='calendar-big-container'>
              <div className='calendar-toggle-container' onClick={toggleStartCalendar}>
                {moment(startDate).format('YYYY-MM-DD')}
                <img src={DownChevron} alt="드롭다운 아이콘" />
                {isStartCalendarOpen && (
                  <Calendar
                    className="calendar"
                    onChange={handleStartDateChange}
                    value={startDate}
                    formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
                  />
                )}
              </div>
            </div>
            <p>~</p>
            <p>종료</p>
            <div className='calendar-big-container'>
              <div className='calendar-toggle-container' onClick={toggleEndCalendar}>
                {moment(endDate).format('YYYY-MM-DD')}
                <img src={DownChevron} alt="드롭다운 아이콘" />
                {isEndCalendarOpen && (
                  <Calendar
                    className="calendar"
                    onChange={handleEndDateChange}
                    value={endDate}
                    formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 평균 음주 지출 비용 */}
        <div className='nodrink-create-money-container'>
          <div>
            <h3>평균 음주 지출 비용</h3>
            <h4>(1일 기준)</h4>
          </div>
          <input
            type="text"
            placeholder='금액을 입력하세요.'
            value={averageCost}
            onChange={(e) => setAverageCost(e.target.value)}
          />
          <p>\</p>
        </div>

        {/* 평균 음주량 선택 */}
      <div className='nodrink-create-alcohol-average'>
        <div className='alcohol-average-title'>
          <h3>평균 음주량</h3>
          <h4>(1일 기준)</h4>
        </div>
        <div className='drink-type-container'>
          {drinkOptions.slice(0, 3).map((drink, index) => (
            <div key={index} className={`drink-option ${drink.isChecked ? 'checked' : 'unchecked'}`}>
              <div className='drink-type-left'>
                <input
                  type='checkbox'
                  id={drink.type}
                  checked={drink.isChecked}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label htmlFor={drink.type} className={`drink-type-name ${drink.isChecked ? 'checked' : 'unchecked'}`}>
                  {drink.type}
                  <p>{drink.description2}</p>
                  <p className='drink-description'>{drink.description}</p>
                </label>
              </div>
              <div className='drink-type-right'>
                <button
                  onClick={() => handleDecrement(index)}
                  disabled={!drink.isChecked || drink.quantity === 0}
                  className={`drink-type-btn ${drink.isChecked ? 'checked' : 'unchecked'}`}
                >
                  -
                </button>
                <span className={`drink-amount ${drink.isChecked ? 'checked' : 'unchecked'}`}>{drink.quantity}</span>
                <button
                  onClick={() => handleIncrement(index)}
                  disabled={!drink.isChecked}
                  className={`drink-type-btn ${drink.isChecked ? 'checked' : 'unchecked'}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='drink-type-container'>
          {drinkOptions.slice(3, 6).map((drink, index) => (
            <div key={index + 3} className={`drink-option ${drink.isChecked ? 'checked' : 'unchecked'}`}>
              <div className='drink-type-left'>
                <input
                  type='checkbox'
                  id={drink.type}
                  checked={drink.isChecked}
                  onChange={() => handleCheckboxChange(index + 3)}
                />
                <label htmlFor={drink.type} className={`drink-type-name ${drink.isChecked ? 'checked' : 'unchecked'}`}>
                  {drink.type}
                  <p>{drink.description2}</p>
                  <p className='drink-description'>{drink.description}</p>
                </label>
              </div>
              <div className='drink-type-right'>
                <button
                  onClick={() => handleDecrement(index + 3)}
                  disabled={!drink.isChecked || drink.quantity === 0}
                  className={`drink-type-btn ${drink.isChecked ? 'checked' : 'unchecked'}`}
                >
                  -
                </button>
                <span className={`drink-amount ${drink.isChecked ? 'checked' : 'unchecked'}`}>{drink.quantity}</span>
                <button
                  onClick={() => handleIncrement(index + 3)}
                  disabled={!drink.isChecked}
                  className={`drink-type-btn ${drink.isChecked ? 'checked' : 'unchecked'}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='drink-type-container'>
          {drinkOptions.slice(6, 8).map((drink, index) => (
            <div key={index + 6} className={`drink-option ${drink.isChecked ? 'checked' : 'unchecked'}`}>
              <div className='drink-type-left'>
                <input
                  type='checkbox'
                  id={drink.type}
                  checked={drink.isChecked}
                  onChange={() => handleCheckboxChange(index + 6)}
                />
                <label htmlFor={drink.type} className={`drink-type-name ${drink.isChecked ? 'checked' : 'unchecked'}`}>
                  {drink.type}
                  <p>{drink.description2}</p>
                  <p className='drink-description'>{drink.description}</p>
                </label>
              </div>
              <div className='drink-type-right'>
                <button
                  onClick={() => handleDecrement(index + 6)}
                  disabled={!drink.isChecked || drink.quantity === 0}
                  className={`drink-type-btn ${drink.isChecked ? 'checked' : 'unchecked'}`}
                >
                  -
                </button>
                <span className={`drink-amount ${drink.isChecked ? 'checked' : 'unchecked'}`}>{drink.quantity}</span>
                <button
                  onClick={() => handleIncrement(index + 6)}
                  disabled={!drink.isChecked}
                  className={`drink-type-btn ${drink.isChecked ? 'checked' : 'unchecked'}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className='drink-option'></div>
        </div>
        </div>
        <div className='nodrink-goal-container'>
          <p>단위 : 병</p>
          <h3>금주 목표(나에게 한마디)</h3>
          <input
            type="text"
            placeholder='목표를 입력하세요. (50자 이내)'
            value={goalMessage}
            onChange={(e) => setGoalMessage(e.target.value)}
          />
        </div>
      </div>
    </div>    
    </div>
  );
}

export default NoDrinkCreate;
