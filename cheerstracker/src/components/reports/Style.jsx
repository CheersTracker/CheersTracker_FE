import React from 'react'
import Beer from '../../assets/images/Alcohol-type/beer.svg'
import Wine from '../../assets/images/Alcohol-type/wine.svg'

const Style = () => {
  return (
    <div className='style-box'>
        <div className='style-text'><p>음주 스타일</p></div>
        <div className='style-container'>
            <div className='style-month'>
                <div className='style-month1'><img src={Beer}></img></div>
                <div className='style-month2'>
                    <div className='style-month2-1'>이번 달에는 <span className='style-month2-2'>맥주</span>를 가장 많이 마셨어요</div>
                    <div className='style-month2-3'>나와 비슷한 연령대의 사용자들은</div>
                    <div className='style-month2-4'>이번 달에 <span className='style-month2-5'>소주</span>를 가장 많이 마셨어요</div>
                </div>
            </div>

            <div className='style-line'></div>

            <div className='style-6month'>
                <div className='style-6month1'><img src={Wine}></img></div>
                    <div className='style-6month2'>
                        <div className='style-6month2-1'>최근 6개월간 <span className='style-6month2-2'>기타주</span>를 가장 많이 마셨어요</div>
                        <div className='style-6month2-3'>나와 비슷한 연령대의 사용자들은</div>
                        <div className='style-6month2-4'>최근 6개월간 <span className='style-6month2-5'>소주</span>를 가장 많이 마셨어요</div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Style
