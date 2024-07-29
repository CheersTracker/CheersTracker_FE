import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import moment from 'moment';

const DrinkDetail = () => {

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/drink', { state: data });
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

  const getDrinkIcon = (type) => {
    switch (type) {
      case '맥주':
        return Beer;
      case '소주':
        return Soju;
      case '과실주':
        return Wine;
      case '기타주':
        return Cocktail;
      case '증류주':
        return Whisky;
      case '발효주':
        return Makgeolli;
      default:
        return null;
    }
  };

  const getIconStyle = (currentType, targetType) => ({
    filter: currentType === targetType ? 'none' : 'grayscale(100%)',
  });

  const getTextStyle = (currentType, targetType) => ({
    color: currentType === targetType ? 'black' : 'gray',
  });


  const allDrinkIcons = [
    { icon: Beer, type: '맥주' },
    { icon: Soju, type: '소주' },
    { icon: Wine, type: '과실주' },
    { icon: Cocktail, type: '기타주' },
    { icon: Whisky, type: '증류주' },
    { icon: Makgeolli, type: '발효주' },
  ];

  const getIconStyle1 = (foundDrink) => ({
    filter: foundDrink && foundDrink.quantity > 0 ? 'none' : 'grayscale(100%)',
  });

  const getTextStyle1 = (foundDrink) => ({
    color: foundDrink && foundDrink.quantity > 0 ? 'black' : 'gray',
  });

  return (
    <div className='drink-create-big-container'>
      <div className='drink-create-top'>
        <h2>음주 기록</h2>
        <div className='btn-container'>
          <button className='drink-create-delete-btn' onClick={handleEdit}>수정하기</button>
        </div>
      </div>
      <div className='drink-create-main-container'>
        <div>
          <div className='calendar-big-container'>
            <div className='calendar-toggle'>{data?.date ? data.date.toLocaleDateString() : '없음'}</div>
          </div>
          <div className='drink-create-main-right'>
            <div className='drink-time-dropdown-container'>
              음주 시간 {data?.duration || '없음'}
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
                      style={getIconStyle(data?.weather, weather.type)}
                    />
                    <p style={getTextStyle(data?.weather, weather.type)}>{weather.type}</p>
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
                      style={getIconStyle(data?.mood, mood.type)}
                    />
                    <p style={getTextStyle(data?.mood, mood.type)}>{mood.type}</p>
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
              const foundDrink = data?.drinks?.find((d) => d.type === drink.type);
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
              const foundDrink = data?.drinks?.find((d) => d.type === drink.type);
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
            <p>{data?.memo || ' '}</p>
        </div>

      </div>
    </div>
  );
};

export default DrinkDetail;
