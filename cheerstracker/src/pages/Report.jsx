import React, { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import Month from '../components/reports/Month'
import MonthSummary from '../components/reports/MonthSummary'
import Frequency from '../components/reports/Frequency'
import Time from '../components/reports/Time'
import Mood from '../components/reports/Mood'
import Style from '../components/reports/Style'
import '../assets/scss/reports.scss'
import '../assets/scss/sidebar.scss'

import axios from 'axios'

const BASE_URL = "http://127.0.0.1:8000/"

const Report = () => {
    const [view, setView] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentId, setCurrentId] = useState([]);
    const [data, setData] = useState([]);

    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}user/current/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            console.log("user Response",response.data);
            setCurrentId(response.data.id);
        } catch(e) {
            console.error(e);
        }
    }

    const getData = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Retrieved token", token)
            if (!token) {
                throw new Error("no token")
            }
            const response = await axios.get(`${BASE_URL}sobriety/set_average_consumption/`, {
        headers: {
            'Authorization': `Token ${token}`,
            },
        } );
        console.log("API Response",response.data);
        setData(response.data);
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getData();
        getCurrentUser();
    }, [])

  return (
    <body>
        <div className='report-wrap'>
            <SideBar />
            <section className='report-section'>
                <header className='report-header'>
                    <p className='report-header1'>분석</p>
                    <p className='report-header2'>오직 cheersTracker에서만 제공하는 나만의 맞춤형 음주 분석 리포트</p>
                </header>
                <div className='report-box'>
                    <div className='report-month'>
                        <div className='report-month1'>음주 분석</div>
                        <div className='report-month2' onClick={() => setView(!view)}>
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
