import React from 'react'
import SideBar from '../components/SideBar'
import BottleHalf from '../assets/images/bottle/bottle_half.svg'
import BottleFull from '../assets/images/bottle/bottle_full.svg'
import Left from '../assets/images/button/Left.svg'
import Right from '../assets/images/button/Right.svg'
import '../assets/scss/calender.scss'

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


const Calender = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const weekMock = ["일", "월", "화", "수", "목", "금", "토"];

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

  return (
    <body>
        <div className='wrap'>
            <SideBar />
            <section>
                <header>
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
                                <div className='drinking-img2'>
                                    <img src={BottleFull}></img>
                                </div>
                                <div className='drinking-img3'>
                                    <img src={BottleFull}></img>
                                    <img src={BottleFull}></img>
                                </div>
                                <div className='drinking-img4'>
                                    <img src={BottleFull}></img>
                                    <img src={BottleFull}></img>
                                    <img src={BottleFull}></img>
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

                <div className='calender'>
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

                                if (isCurrentMonth && isSaturday(date)) {
                                    style = { color: "blue" };
                                } else if (isCurrentMonth && isSunday(date)) {
                                    style = { color: "red" };
                                }

                                return (
                                    <div
                                        key={`date${i}`}
                                        className={isCurrentMonth ? "currentMonth" : "diffMonth"}
                                        style={style}
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
        
    </body>
  )
}

export default Calender
