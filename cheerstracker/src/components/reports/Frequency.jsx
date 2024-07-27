import React from 'react'
import Several from '../graphs/Several'
import Amount from '../graphs/Amount'

// 음주 빈도 & 음주량

const Frequency = () => {
  return (
    <section className='fre-container'>
            <div className='drink-frequency'>
                    <div className='fre-text'>
                        <div className='fre-text1'><p>음주 빈도</p></div>
                        <div className='fre-text2'>
                            <div className='fre-text2-1'><p>평균 <span>12</span> 회</p></div>
                            <div className='fre-text2-2'><p>적정 횟수 대비 <span>+6회</span></p></div>
                        </div>
                    </div>
                    <div className='fre-graph'>
                        <Several />
                    </div>
            </div>
            <div className='drink-amount'>
                    <div className='amount-text'>
                        <div className='amount-text1'><p>음주량</p></div>
                        <div className='amount-text2'>
                            <div className='amount-text2-1'><p>평균 <span>430</span> g</p></div>
                            <div className='amount-text2-2'><p>적정량 대비 <span>+40g</span></p></div>
                        </div>
                    </div>
                    <div className='amount-graph'>
                        <Amount />
                    </div>
            </div>
    </section>
  )
}

export default Frequency
