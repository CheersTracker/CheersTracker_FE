import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import Month from '../components/reports/Month'
import MonthSummary from '../components/reports/MonthSummary'
import Frequency from '../components/reports/Frequency'
import Time from '../components/reports/Time'
import Mood from '../components/reports/Mood'
import Style from '../components/reports/Style'
import '../assets/scss/reports.scss'
import '../assets/scss/sidebar.scss'

const Report = () => {
    const [view, setView] = useState(false);

  return (
    <body>
        <div className='wrap'>
            <SideBar />
            <section>
                <header className='header'>
                    <p className='header1'>분석</p>
                    <p className='header2'>오직 cheersTracker에서만 제공하는 나만의 맞춤형 음주 분석 리포트</p>
                </header>
                <div className='report-box'>
                    <div className='month'>
                        <div className='month1'>음주 분석</div>
                        <div className='month2' onClick={() => setView(!view)}>
                            월
                            {view ? ' ⌃' : ' ⌄'}
                        </div>
                        {view && <Month />}
                    </div>  
                    <div className='report-box-line'></div>
                    <div className='report-box1'>
                        <div className='report-wrap'>
                            <MonthSummary />
                            <Frequency />
                            <Time />
                            <Mood />
                            <Style />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </body>
  )
}

export default Report
