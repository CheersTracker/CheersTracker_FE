import React from 'react'
import LastMonth from '../graphs/LastMonth'

import Beer from '../../assets/images/Alcohol-type/beer.svg'
import Soju from '../../assets/images/Alcohol-type/soju.svg'
import Wine from '../../assets/images/Alcohol-type/wine.svg'
import Cocktail from '../../assets/images/Alcohol-type/cocktail.svg'
import Whisky from '../../assets/images/Alcohol-type/whisky.svg'
import Makgeolli from '../../assets/images/Alcohol-type/makgeolli.svg'
import '../../assets/scss/report.scss'

const MonthSummary = () => {
  return (
    <section className='month-summary'>
        <p>이번 달 요약 리포트</p>
        <div className='summary-box'>
                <div className='number'>
                    <div className='number1'>7회</div>
                    <div className='number2'>지난달에 비해<br></br>
                    <span>9회</span> 덜 마셨어요
                    </div>
                </div>
                <div className='alcohol-type'>
                    <ul className='alcohol-type1'>
                        <li>
                            <img src={Beer}></img>
                            <div className='type1'>맥주</div>
                            <div className='glass1'>0잔</div>
                            <div className='compare1'>지난 달 대비 <span>0병</span></div>
                        </li>
                        <li>
                            <img src={Soju}></img>
                            <div className='type2'>소주</div>
                            <div className='glass2'>0잔</div>
                            <div className='compare2'>지난 달 대비 <span>0병</span></div>
                        </li>
                        <li>
                            <img src={Wine}></img>
                            <div className='type3'>과실주</div>
                            <div className='glass3'>0잔</div>
                            <div className='compare3'>지난 달 대비 <span>0병</span></div>
                        </li>
                        
                    </ul>
                    <ul className='alcohol-type2'>
                        <li>
                            <img src={Cocktail}></img>
                            <div className='type4'>기타주</div>
                            <div className='glass4'>0잔</div>
                            <div className='compare4'>지난 달 대비 <span>0잔</span></div>
                        </li>
                        <li>
                            <img src={Whisky}></img>
                            <div className='type5'>증류주</div>
                            <div className='glass5'>0잔</div>
                            <div className='compare5'>지난 달 대비 <span>0병</span></div>
                        </li>
                        <li>
                            <img src={Makgeolli}></img>
                            <div className='type6'>발효주</div>
                            <div className='glass6'>0잔</div>
                            <div className='compare6'>지난 달 대비 <span>0병</span></div>
                        </li>
                    </ul>
                </div>
                <div className='summary-box-line'></div>
                <div className='last-month'>
                    <div className='last-month1'><p>지난달보다 <span>적게</span> 마셨어요</p></div>
                    
                    <div className='last-month2'>
                        <div className='last-month2-3'>
                            <div className='last-month2-1'><p>지난달</p> </div>
                            <div className='last-month2-2'><p>이번달</p> </div>
                        </div>
                        <LastMonth />
                    </div>
                    
                </div>
        </div>
    </section>
  )
}

export default MonthSummary