import { addMonths, subMonths } from 'date-fns';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronLeft } from "react-icons/fa";

const Signup2 = ({ onPrev }) => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className='signup_container'>
            <section className='login_sec1'>
                <div className="sec1_header">
                    <FaChevronLeft className='back_btn' onClick={onPrev} />
                    <p className='login_title'>회원가입</p>
                    <div></div>
                </div>
                <div className='login_id_container'>
                    <div className="label_container">
                        <p className='login_id_label'>닉네임을 입력하세요.</p>
                        <p className='label_alert'>* 닉네임은 추후 수정이 불가합니다.</p>
                    </div>
                    <input type="text" id='nickname' value={nickname} onChange={(e) => setNickname(e.target.value)} required />
                </div>
                <div className='login_id_container'>
                    <div className="label_container">
                        <p className='login_id_label'>성별을 선택하세요.</p>
                        <p className='label_alert'>* 성별은 추후 수정이 불가합니다.</p>
                    </div>
                    <select id="gender">
                        <option value="">성별 선택</option>
                        <option value="male">남자</option>
                        <option value="female">여자</option>
                    </select>
                </div>
                <div className='login_id_container'>
                    <div className="label_container">
                        <p className='login_id_label'>생년월일을 입력하세요.</p>
                        <p className='label_alert'>* 생년월일은 추후 수정이 불가합니다.</p>
                    </div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy-MM-dd"
                        id='birthday'
                    />
                </div>
                <button type="button" className="login_button">회원가입 완료</button>
            </section>
            <section className='login_sec2'>
                <span>이미 계정이 있으신가요?</span>
                <a href="#">로그인하기</a>
            </section>
        </div>
    )
}

export default Signup2