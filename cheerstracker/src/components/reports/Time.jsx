import React from 'react';
import Times from '../graphs/Times';
import Clock from '../../assets/images/report/Clock.svg';
import Circled from '../../assets/images/button/CircledInfo.svg';

// Props로 monthly_analysis 객체를 받아옴
const Time = ({ monthly_analysis }) => {
    // avg_drinking_duration 값을 구조 분해 할당
    const { avg_drinking_duration } = monthly_analysis || {};

    console.log(avg_drinking_duration);
    console.log(avg_drinking_duration ? avg_drinking_duration : "데이터 없음");

    return (
        <div className='time-box'>
            <div className='time-text'><p>음주 시간</p></div>
            <div className='time-container'>
                <div className='time-summary'>
                    <div className='time-summary1'>
                        <div className='time-summary1-1'><p>2~3시간</p></div>
                        <div className='time-summary1-2'>
                            <p>2-3시간씩 마시는 날이 <br />제일 많아요</p>
                        </div>
                    </div>
                    <div className='time-summary-img'><img src={Clock} alt="Clock" /></div>
                </div>
                <div className='time-box-line'></div>
                <div className='time-total'>
                    <div className='time-total1'>
                        <div className='time-total1-1'><p>월 <span>{avg_drinking_duration}</span>시간</p></div>
                        <div className='time-total1-2'><p>월 평균 <span>{avg_drinking_duration}</span>시간 정도 음주 시간을 가져요</p></div>
                    </div>
                    <div className='time-total2'>
                        <div className='time-total2-1'><p>이번 달 총 <span>12</span>시간</p></div>
                        <div className='time-total2-2'><p>최근 6개월 평균 대비</p> <p className='time-total2-3'><span>-14</span>시간</p></div>
                    </div>
                </div>
                <div className='time-graph'>
                    <div className='time-graph1'>
                        <img src={Circled} alt="Circled Info" />
                        <div className='time-graph2'>최근 6개월과 비교해드려요</div>
                    </div>
                    <div className='time-graph-line'></div>
                    <Times />
                </div>
            </div>
        </div>
    );
};

export default Time;
