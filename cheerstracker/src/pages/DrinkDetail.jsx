import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import '../assets/scss/drinkcreate.scss';
import '../assets/scss/drinkdetail.scss';
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
import SideBar from '../components/SideBar';

const DrinkDetail = () => {
  const { date } = useParams(); // URL에서 날짜를 가져옴
  const navigate = useNavigate();
  const [drinkData, setDrinkData] = useState(null);

  const handleEdit = () => {
    navigate('/drinking', { state: drinkData });
  };

  const allWeatherIcons = [
    { icon: Sun, type: '좋음' },
    { icon: NormalWeather, type: '보통' },
    { icon: Rain, type: '나쁨' },
  ];

  const allMoodIcons = [
    { icon: Happy, type: '좋음' },
    { icon: Normal, type: '보통' },
    { icon: Cry, type: '나쁨' },
  ];

  const allDrinkIcons = [
    { icon: Beer, type: '맥주' },
    { icon: Soju, type: '소주' },
    { icon: Wine, type: '과실주' },
    { icon: Cocktail, type: '기타주' },
    { icon: Whisky, type: '증류주' },
    { icon: Makgeolli, type: '발효주' },
  ];

  const getIconStyle = (currentType, targetType) => ({
    filter: currentType === targetType ? 'none' : 'grayscale(100%)',
  });

  const getTextStyle = (currentType, targetType) => ({
    color: currentType === targetType ? 'black' : 'gray',
  });

  const getIconStyle1 = (foundDrink) => ({
    filter: foundDrink && foundDrink.quantity > 0 ? 'none' : 'grayscale(100%)',
  });

  const getTextStyle1 = (foundDrink) => ({
    color: foundDrink && foundDrink.quantity > 0 ? 'black' : 'gray',
  });

  const fetchDrinkDetail = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/drinking/records/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      // URL에서 받은 날짜와 일치하는 데이터 필터링
      const filteredData = response.data.filter(
        (record) => moment(record.date).format('YYYY-MM-DD') === date
      );

      if (filteredData.length > 0) {
        setDrinkData(filteredData[0]); // 첫 번째 일치하는 데이터 사용
        console.log('일치하는 첫번째 데이터:',filteredData[0]);
      } else {
        console.error('No matching data found');
      }
    } catch (error) {
      console.error('Error fetching drink detail:', error);
    }
  };

  useEffect(() => {
    fetchDrinkDetail();
  }, [date]); // date가 변경될 때마다 데이터를 다시 가져옴

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div className='drink-create-big-container'>
        <div className='drink-create-top'>
          <h2>음주 기록</h2>
          <div className='btn-container'>
            <button className='drink-create-delete-btn' onClick={handleEdit}>
              수정하기
            </button>
          </div>
        </div>
        <div className='drink-create-main-container'>
          <div>
            <div className='calendar-big-container'>
              <div className='calendar-toggle'>{moment(drinkData?.date).format('YYYY-MM-DD') || '없음'}</div>
            </div>
            <div className='drink-create-main-right'>
              <div className='drink-time-dropdown-container'>
                음주 시간 {drinkData?.drinking_duration || '없음'}
              </div>

              {/* 날씨 토글박스 */}
              <div className='weather-big-container'>
                <p>날씨</p>
                <div className='weather-container'>
                  {allWeatherIcons.map((weather, index) => (
                    <div key={index} className='weather-item'>
                      <img
                        src={weather.icon}
                        alt={`날씨 ${weather.type} 아이콘`}
                        style={getIconStyle(drinkData?.weather, weather.type)}
                      />
                      <p style={getTextStyle(drinkData?.weather, weather.type)}>{weather.type}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 기분 토글박스 */}
              <div className='mood-big-container'>
                <p>기분</p>
                <div className='mood-container'>
                  {allMoodIcons.map((mood, index) => (
                    <div key={index} className='mood-item'>
                      <img
                        src={mood.icon}
                        alt={`기분 ${mood.type} 아이콘`}
                        style={getIconStyle(drinkData?.mood, mood.type)}
                      />
                      <p style={getTextStyle(drinkData?.mood, mood.type)}>{mood.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 음주량 */}
          <div className='drink-log-big-container'>
            <div className='drink-column'>
              {allDrinkIcons.slice(0, 3).map((drink, index) => {
                const foundDrink = drinkData?.drinks?.find((d) => d.type === drink.type);
                return (
                  <div key={index} className='drink-item'>
                    <img
                      src={drink.icon}
                      alt={`${drink.type} 아이콘`}
                      style={getIconStyle1(foundDrink)}
                    />
                    <p style={getTextStyle1(foundDrink)}>{drink.type}</p>
                    <p style={getTextStyle1(foundDrink)}>{foundDrink ? `${foundDrink.quantity} ` : '0 '}</p>
                    <p style={getTextStyle1(foundDrink)}>잔</p>
                    <p style={getTextStyle1(foundDrink)}>{foundDrink?.description || ''}</p>
                  </div>
                );
              })}
            </div>

            <div className='drink-column'>
              {allDrinkIcons.slice(3).map((drink, index) => {
                const foundDrink = drinkData?.drinks?.find((d) => d.type === drink.type);
                return (
                  <div key={index} className='drink-item'>
                    <img
                      src={drink.icon}
                      alt={`${drink.type} 아이콘`}
                      style={getIconStyle1(foundDrink)}
                    />
                    <div>
                      <div className='drink-item-flex'>
                        <p style={getTextStyle1(foundDrink)}>{drink.type}</p>
                        <div className='drink-quantity'>
                          <p style={getTextStyle1(foundDrink)}>{foundDrink ? `${foundDrink.quantity}` : '0'}</p>
                          <p style={getTextStyle1(foundDrink)}>잔</p>
                        </div>
                        <p style={getTextStyle1(foundDrink)} className='drink-description'>{foundDrink?.description || ''}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* 메모 */}
          <div className='memo-container'>
            <h2>메모</h2>
            <p>{drinkData?.memo || ' '}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetail;
