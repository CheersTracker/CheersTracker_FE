import React from 'react'
import Several from '../graphs/Several'
import Amount from '../graphs/Amount'

import Circled from '../../assets/images/button/CircledInfo.svg'

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
                        <div className='fre-graph1'>
                            <img src={Circled}></img>
                            <div className='fre-graph2'>최근 6개월과 비교해드려요</div>
                        </div>
                        <div className='fre-graph-line'></div>
                        <div className='fre-graph3'>
                            <Several /> 
                            <div className='fre-graph4'>적정 음주빈도 <br></br>월 4~8회</div>
                        </div>
                        
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
                        <div className='amount-graph1'>
                            <div className='amount-graph1-1'>청년(18~29세) 여성 기준</div>
                            <div className='amount-graph1-2'>
                                <img src={Circled}></img>
                                <div className='amount-graph2'>최근 6개월과 비교해드려요</div>
                            </div>
                                
                        </div>
                        <div className='amount-graph-line'></div>
                        <div className='amount-graph3'>
                             <Amount />
                             <div className='amount-graph4'>적정 알코올섭취량 <br></br>약 390g</div>
                        </div>
                        
                    </div>
            </div>
    </section>
  )
}

export default Frequency
