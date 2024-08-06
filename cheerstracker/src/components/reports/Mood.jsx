import React from 'react'
import Sun from '../../assets/images/report/sun.svg'
import Rain from '../../assets/images/rain.svg';
import Normal_weather from '../../assets/images/normal_weather.svg';
import Happy from '../../assets/images/happy.svg'
import Normal from '../../assets/images/normal.svg';
import Cry from '../../assets/images/report/cry.svg'

const Mood = ({monthly_mood, monthly_weather}) => {
  const avg_mood = monthly_mood?.avg_mood;
  const avg_weather = monthly_weather?.avg_weather;

  // console.log(avg_mood ? avg_mood : '평균 감정 데이터 없음');
  // console.log(avg_weather ? avg_weather : '평균 날씨 데이터 없음');

  let moodMessage = '';
  let moodImg = '';
  if (avg_mood === '좋음') {
    moodImg=Happy;
    moodMessage = '좋은 기분을 유지하기 위해, 친구와 대화하며 산책하는 시간을 보내는 것도 좋을 것 같아요.';
  } else if (avg_mood === '보통') {
    moodImg=Normal;
    moodMessage = '책을 읽거나 영화를 보며 몰입하는 시간을 가진다면 기분이 더 좋아질 거예요.';
  } else if (avg_mood === '나쁨') {
    moodImg=Cry;
    moodMessage = '부정적인 감정을 해소하기 위해 산책이나 운동을 해보세요. 신체 활동이 기분을 전환시키는 데 많은 도움이 된답니다!';
  } else {
    moodMessage = '기분 데이터를 확인할 수 없습니다.';
  }

  let weatherMessage = '';
  let weatherdImg = '';
  if (avg_weather === '좋음') {
    weatherdImg=Sun;
    weatherMessage = '햇빛이 좋은 날에는 창가에서 독서를 하거나 음악을 들으면서 시간을 보내보세요.';
  } else if (avg_weather === '보통') {
    weatherdImg=Normal_weather;
    weatherMessage = '평범한 날씨에는 가까운 공원에서 짧은 산책을 하며 자연을 즐겨보세요.';
  } else if (avg_weather === '나쁨') {
    weatherdImg=Normal;
    weatherMessage = '비가 오거나 날씨가 나쁠 때는 집에서 따뜻한 차를 마시며 독서를 즐기는 것도 좋은 방법이에요.';
  } else {
    weatherMessage = '날씨 데이터를 확인할 수 없습니다.';
  }

  return (
    <div className='mood-box'>
        <div className='mood-text'><p>날씨 & 기분</p></div>
        <div className='mood-container'>
                <div className='weather'>
                        <div className='weather1'><p>날씨</p></div>
                        <div className='weather2'>
                            <div className='weather2-1'><img src={weatherdImg}></img></div>
                            <div className='weather2-2'><p>{  weatherMessage }</p></div>
                        </div>
                </div>
                
                <div className='mood-line'></div>

                <div className='mood'>
                        <div className='mood1'><p>기분</p></div>
                        <div className='mood2'>
                            <div className='mood2-1'><img src={moodImg} style={{ width: "110px" }}></img></div>
                            <div className='mood2-2'><p>{moodMessage}</p></div>
                        </div>
                </div>
        </div>
    </div>
  )
}

export default Mood
