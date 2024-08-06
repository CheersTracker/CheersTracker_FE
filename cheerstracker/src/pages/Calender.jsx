import React, {useEffect} from 'react'
import SideBar from '../components/SideBar'
import BottleHalf from '../assets/images/bottle/bottle_half.svg'
import BottleFull from '../assets/images/bottle/bottle_full.svg'
import Left from '../assets/images/button/Left.svg'
import Right from '../assets/images/button/Right.svg'
import '../assets/scss/calender.scss'
import axios from 'axios'

import { useCallback, useMemo, useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    differenceInCalendarDays,
    getMonth,
    isSaturday,
    isSunday,
} from "date-fns";

const BASE_URL = "http://127.0.0.1:8000/"

const Calender = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [data, setData] = useState([]);

    const [currentId, setCurrentId] = useState([]);
    const year = parseInt(currentDate.getFullYear());
    const month = (currentDate.getMonth() + 1);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const weekMock = ["일", "월", "화", "수", "목", "금", "토"];

    const [consumptionData, setConsumptionData] = useState([]);

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
            const response = await axios.get(`${BASE_URL}drinking/calendar/${currentId}/${year}/${month}`, {
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

    const nextMonthHandler = useCallback(() => {
        setCurrentDate(addMonths(currentDate, 1));
    }, [currentDate]);

    const prevMonthHandler = useCallback(() => {
        setCurrentDate(subMonths(currentDate, 1));
    }, [currentDate]);

    const createMonth = useMemo(() => {
        const monthArray = [];
        let day = startDate;
        while (differenceInCalendarDays(endDate, day) >= 0) {
            monthArray.push(day);
            day = addDays(day, 1);
        }
        return monthArray;
    }, [startDate, endDate]);

    useEffect(() => {
        getData();
        getCurrentUser();
    }, [currentId, year, month])


    const getColor = (amount) => {
        if (amount <= 20) return '#799AEA';
        if (amount <= 40) return '#88D061';
        if (amount <= 80) return '#D7F9C6';
        if (amount <= 120) return '#FFCF96';
        return '#FF8A00';
    };

  return (
        <div className='calender-wrap'>
            <SideBar />
            <section className='calender-section'>
                <header className='calender-header'>
                    <div className='title'><p>캘린더</p></div>
                    <div className='select'>
                        <img src={Left} className="prevButton" onClick={prevMonthHandler}></img>
                            <div className="monthTitle">
                                <div className="yearTitle">{format(currentDate, "yyyy년")}</div>
                                <div className="month">{format(currentDate, "M월")}</div>
                            </div>
                        <img src={Right} className="nextButton" onClick={nextMonthHandler}></img>
                    </div>

                    <div className='drinking'>
                        <div className='drinking1'><p>알코올 섭취량</p></div>
                        <div className='drinking2'>
                            <div className='drinking-img'>
                                <img className='drinking-img1' src={BottleHalf}></img>
                                <div>
                                    <img className='drinking-img1' src={BottleFull}></img>
                                </div>
                                <div className='drinking4'>
                                    <img className='drinking-img1' src={BottleFull}></img>
                                    <img className='drinking-img1' src={BottleFull}></img>
                                </div>
                                <div className='drinking4'>
                                    <img className='drinking-img1' src={BottleFull}></img>
                                    <img className='drinking-img1' src={BottleFull}></img>
                                    <img className='drinking-img1' src={BottleFull}></img>
                                </div>
                            </div>
                            <div className='drinking-li'>
                                    <ul className='drinking-li1'>
                                        <li className='drinking-li2'>0~20g</li>
                                        <li className='drinking-li3'>20g~40g</li>
                                        <li className='drinking-li4'>40~80g</li>
                                        <li className='drinking-li5'>80~120g</li>
                                        <li className='drinking-li6'>120g 이상</li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </header>

                <div className='calender-container'>
                        <div className="dayContainer">
                            {weekMock.map((day, i) => {
                                const style = i === 0 ? { color: "red" } : i === 6 ? { color: "blue" } : {};
                                return (
                                    <div className='dayContainer1' key={`day${i}`} style={style}>
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="dateContainer">
                            {createMonth.map((date, i) => {
                                let style;
                                const isCurrentMonth = getMonth(currentDate) === getMonth(date);
                                const isToday = format(new Date(), "yyyyMMdd") === format(date, "yyyyMMdd");

                                const consumption = consumptionData.find(item => format(new Date(item.date), "yyyyMMdd") === format(date, "yyyyMMdd"));
                                const amount = consumption ? consumption.amount : 0;

                                style = isCurrentMonth ? { backgroundColor: getColor(amount) } : {};

                                if (isCurrentMonth && isSaturday(date)) {
                                    style = { color: "blue" };
                                } else if (isCurrentMonth && isSunday(date)) {
                                    style = { color: "red" };
                                }

                                return (
                                    <div
                                        key={`date${i}`}
                                        className={`${isCurrentMonth ? "currentMonth" : "diffMonth"} dateBox`}
                                        style={{
                                            backgroundColor: isCurrentMonth ? getColor(amount) : 'transparent',
                                            color: isCurrentMonth && isSaturday(date) ? "blue" : isCurrentMonth && isSunday(date) ? "red" : 'inherit'
                                            
                                        }}
                                    >
                                        <div className="topLine">
                                            <span className="day">{format(date, "d")}</span>
                                            {isToday && <span className="today">(오늘)</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                </div>


            </section>
        </div>
  )
}

export default Calender
