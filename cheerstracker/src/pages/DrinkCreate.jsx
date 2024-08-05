import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import '../assets/scss/drinkcreate.scss';
import '../assets/scss/mediaquery.scss';
import DownChevron from '../assets/images/DownChevron.svg';
import Sun from '../assets/images/sun.svg';
import NormalWeather from '../assets/images/normal_weather.svg';
import Rain from '../assets/images/rain.svg';
import Happy from '../assets/images/happy.svg';
import Normal from '../assets/images/normal.svg';
import Cry from '../assets/images/cry.svg';
import Beer from '../assets/images/beer.svg';
import Cocktail from '../assets/images/cocktail.svg';
import Makgeolli from '../assets/images/makgeolli.svg';
import Soju from '../assets/images/soju.svg';
import Whisky from '../assets/images/whisky.svg';
import Wine from '../assets/images/wine.svg';
import SideBar from '../components/SideBar'
import axios from 'axios';

const DrinkCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const [value, setValue] = useState(() => {
    const dateFromData = new Date(data.date);
    return isNaN(dateFromData.getTime()) ? new Date() : dateFromData;
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onChange = (date) => {
    setValue(date);
    setIsCalendarOpen(false);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(data.duration || '음주 시간 선택');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const [selectedWeather, setSelectedWeather] = useState(data.weather || '');
  const [selectedMood, setSelectedMood] = useState(data.mood || '');

  const handleWeatherSelect = (weather) => {
    setSelectedWeather(weather);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const [drinkOptions, setDrinkOptions] = useState([
    { type: '맥주', isChecked: false, quantity: 0, description: '', description2: '', img: Beer },
    { type: '소주', isChecked: false, quantity: 0, description: '', description2: '', img: Soju },
    { type: '과실주', isChecked: false, quantity: 0, description: '', description2: '(와인, 포도주)', img: Wine },
    { type: '기타주', isChecked: false, quantity: 0, description: '칵테일, 진, 인삼주 등', description2: '', img: Cocktail },
    { type: '증류주', isChecked: false, quantity: 0, description: '소주 외 (위스키, 브랜디, 럼 등)', description2: '', img: Whisky },
    { type: '발효주', isChecked: false, quantity: 0, description: '맥주, 과실주 외 (탁주, 약주, 청주 등)', description2: '(막걸리)', img: Makgeolli },
  ]);

  useEffect(() => {
    if (data.drinks) {
      const updatedOptions = drinkOptions.map((option) => {
        const found = data.drinks.find((drink) => drink.type === option.type);
        return {
          ...option,
          isChecked: found ? found.isChecked : option.isChecked,
          quantity: found ? found.quantity : option.quantity,
          description: found ? found.description : option.description
        };
      });
      setDrinkOptions(updatedOptions);
    }
  }, [data.drinks]);

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

  const firstColumn = drinkOptions.slice(0, 3);
  const secondColumn = drinkOptions.slice(3, 6);

  const [memo, setMemo] = useState(data.memo || '');
  const [currentId, setCurrentId] = useState(null);
  // currentId에 id 담겨있음

  const CurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/user/current/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      console.log("user data",response.data);
      setCurrentId(response.data.id);
    } catch (error) {
      console.error('user:', error);
    }
  }

  useEffect(() => {
    CurrentUser();
  },[])

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const requestData = {
        user: currentId,
        date: moment(value).format('YYYY-MM-DD'),
        drinking_duration: selectedOption.slice(0, 10),
        weather: selectedWeather,
        mood: selectedMood,
        memo: memo || "",
        servings: drinkOptions
          .filter(option => option.isChecked)
          .map(option => ({
            drink_type: option.type,
            quantity: parseInt(option.quantity, 10) || 0,
          })),
      };
  
      if (requestData.servings.length === 0) {
        alert('적어도 하나의 음료를 선택해야 합니다.');
        return;
      }
  
      console.log('음주 기록 저장 시도:', requestData);
  
      const response = await axios.post('http://127.0.0.1:8000/drinking/records/', requestData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('음주 기록 저장 성공:', response.data);
      alert('음주 기록이 성공적으로 저장되었습니다!');
      navigate('/drinking/detail');
  
    } catch (error) {
      console.error('음주 기록 페이지 에러:', error);
      if (error.response) {
        console.log('Response Data:', error.response);
        console.log('Response Data:', error.response.data);
        alert(`오류 발생: ${JSON.stringify(error.response.data)}`);
      }
      if (error.response && error.response.status === 400) {
        alert('400에러');
      }
    }
  };
  

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div className='drink-create-big-container'>
        <div className='drink-create-top'>
          <h2>음주 기록</h2>
          <div className='btn-container'>
            <button className='drink-create-cancel-btn'>취소하기</button>
            <button className='drink-create-delete-btn' onClick={handleSave}>저장하기</button>
          </div>
        </div>

        <div className='drink-create-main-container'>
          <div>
            <div className='calendar-big-container'>
              <div className='calendar-toggle' onClick={toggleCalendar}>
                {moment(value).format('MM월 DD일')}
                <img src={DownChevron} alt="드롭다운 아이콘" />

                {isCalendarOpen && (
                  <Calendar
                    className="calendar"
                    onChange={onChange}
                    value={value}
                    formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
                  />
                )}
              </div>
            </div>

            <div className='drink-create-main-right'>
              <div className='drink-time-dropdown-container'>
                <div className='drink-time-dropdown-toggle' onClick={toggleDropdown}>
                  {selectedOption}
                  <img src={DownChevron} alt="드롭다운 아이콘" />
                </div>
                {
                  isDropdownOpen && (
                    <div className='drink-time-dropdown-options'>
                      <div className='drink-time-dropdown-option line' onClick={() => handleOptionSelect('1시간 미만')}>
                        1시간 미만
                      </div>
                      <div className='drink-time-dropdown-option line' onClick={() => handleOptionSelect('1~2시간')}>
                        1~2시간
                      </div>
                      <div className='drink-time-dropdown-option line' onClick={() => handleOptionSelect('2~3시간')}>
                        2~3시간
                      </div>
                      <div className='drink-time-dropdown-option line' onClick={() => handleOptionSelect('3~4시간')}>
                        3~4시간
                      </div>
                      <div className='drink-time-dropdown-option line' onClick={() => handleOptionSelect('4시간 이상 6시간 미만')}>
                        4시간 이상 6시간 미만
                      </div>
                      <div className='drink-time-dropdown-option line' onClick={() => handleOptionSelect('6시간 이상 12시간 미만')}>
                        6시간 이상 12시간 미만
                      </div>
                      <div className='drink-time-dropdown-option line' onClick={() => handleOptionSelect('12시간 이상 18시간 미만')}>
                        12시간 이상 18시간 미만
                      </div>
                      <div className='drink-time-dropdown-option' onClick={() => handleOptionSelect('18시간 이상 24시간 미만')}>
                        18시간 이상 24시간 미만
                      </div>
                    </div>
                  )
                }
              </div>

              <div className='weather-big-container'>
                <p>날씨</p>
                <div className={`weather-container ${selectedWeather === '좋음' ? 'selected' : ''}`} onClick={() => handleWeatherSelect('좋음')}>
                  <img src={Sun} alt="날씨 좋음 아이콘" />
                  <p>좋음</p>
                </div>
                <div className={`weather-container ${selectedWeather === '보통' ? 'selected' : ''}`} onClick={() => handleWeatherSelect('보통')}>
                  <img src={NormalWeather} alt="날씨 보통 아이콘" />
                  <p>보통</p>
                </div>
                <div className={`weather-container ${selectedWeather === '나쁨' ? 'selected' : ''}`} onClick={() => handleWeatherSelect('나쁨')}>
                  <img src={Rain} alt="날씨 나쁨 아이콘" />
                  <p>나쁨</p>
                </div>
              </div>

              <div className='mood-big-container'>
                <p>기분</p>
                <div className={`mood-container ${selectedMood === '좋음' ? 'selected' : ''}`} onClick={() => handleMoodSelect('좋음')}>
                  <img src={Happy} alt="기분 좋음 아이콘" />
                  <p>좋음</p>
                </div>
                <div className={`mood-container ${selectedMood === '보통' ? 'selected' : ''}`} onClick={() => handleMoodSelect('보통')}>
                  <img src={Normal} alt="기분 보통 아이콘" />
                  <p>보통</p>
                </div>
                <div className={`mood-container ${selectedMood === '나쁨' ? 'selected' : ''}`} onClick={() => handleMoodSelect('나쁨')}>
                  <img src={Cry} alt="기분 나쁨 아이콘" />
                  <p>나쁨</p>
                </div>
              </div>
            </div>
          </div>

          <div className='drink-options-big-container'>
            <div className='drink-options-group'>
              {firstColumn.map((drink, index) => (
                <div className='alcohol-quantity' key={index}>
                  <input
                    type="checkbox"
                    checked={drink.isChecked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <div className='drink-type'>
                    <p className={`drink-type-name ${drink.isChecked ? 'active' : ''}`}>{drink.type}
                      <span className='drink-description'>{drink.description}</span>
                    </p>
                    <p className={`drink-description2 ${drink.isChecked ? 'active' : ''}`}>{drink.description2}</p>
                  </div>
                  <button
                    className={`quantity-button ${drink.isChecked ? 'active' : ''}`}
                    onClick={() => handleDecrement(index)}
                    disabled={!drink.isChecked || drink.quantity === 0}
                  >
                    -
                  </button>
                  <span className={`quantity-display ${drink.isChecked ? 'active' : ''}`}>
                    {drink.quantity}
                  </span>
                  <button
                    className={`quantity-button ${drink.isChecked ? 'active' : ''}`}
                    onClick={() => handleIncrement(index)}
                    disabled={!drink.isChecked}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
            <div className='drink-options-group'>
              {secondColumn.map((drink, index) => (
                <div className='alcohol-quantity' key={index + 3}>
                  <input
                    type="checkbox"
                    checked={drink.isChecked}
                    onChange={() => handleCheckboxChange(index + 3)}
                  />
                  <div className='drink-type'>
                    <p className={`drink-type-name ${drink.isChecked ? 'active' : ''}`}>{drink.type}
                      <span className='drink-description'>{drink.description}</span>
                    </p>
                    <p className={`drink-description2 ${drink.isChecked ? 'active' : ''}`}>{drink.description2}</p>
                  </div>
                  <button
                    className={`quantity-button ${drink.isChecked ? 'active' : ''}`}
                    onClick={() => handleDecrement(index + 3)}
                    disabled={!drink.isChecked || drink.quantity === 0}
                  >
                    -
                  </button>
                  <span className={`quantity-display ${drink.isChecked ? 'active' : ''}`}>
                    {drink.quantity}
                  </span>
                  <button
                    className={`quantity-button ${drink.isChecked ? 'active' : ''}`}
                    onClick={() => handleIncrement(index + 3)}
                    disabled={!drink.isChecked}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='ment-container'>
            <p className='ment1'>음주 기록을 자세히 입력할 수록 나의 음주 습관을 더 자세히 분석할 수 있어요!</p>
            <div>
              <p>단위 : 잔</p>
              <div>
                <p>1병 기준</p>
                <span>
                  <p>맥주 </p> 2~3잔 <p>소주 </p> 7잔 <p>와인 </p> 5잔
                </span>
              </div>
            </div>
          </div>

          <div className='drink-create-memo-container'>
            <h2>메모</h2>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder='메모를 입력하세요. (250자 이내)'
              maxLength={250}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkCreate;
