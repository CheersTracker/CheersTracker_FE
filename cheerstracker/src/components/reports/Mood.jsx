import React from 'react'
import Sun from '../../assets/images/report/sun.svg'
import Cry from '../../assets/images/report/cry.svg'

const Mood = () => {
  return (
    <div className='mood-box'>
        <div className='mood-text'><p>날씨 & 기분</p></div>
        <div className='mood-container'>
                <div className='weather'>
                        <div className='weather1'><p>날씨</p></div>
                        <div className='weather2'>
                            <div className='weather2-1'><img src={Sun}></img></div>
                            <div className='weather2-2'><p>날씨가 좋은 날에 음주를 즐기는 편이에요</p></div>
                        </div>
                </div>
                
                <div className='mood-line'></div>

                <div className='mood'>
                        <div className='mood1'><p>기분</p></div>
                        <div className='mood2'>
                            <div className='mood2-1'><img src={Cry}></img></div>
                            <div className='mood2-2'><p>기분이 나쁜 날에 음주를 즐기는 편이에요</p></div>
                        </div>
                </div>
        </div>
    </div>
  )
}

export default Mood
