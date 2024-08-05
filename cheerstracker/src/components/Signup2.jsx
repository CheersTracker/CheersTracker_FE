import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronLeft } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup2 = ({ onPrev, id, password }) => {
    const navigate = useNavigate('');
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const handlePrev = () => {
        const confirmLeave = window.confirm('모든 입력값이 초기화됩니다. 정말로 돌아가시겠습니까?');
        if (confirmLeave) {
            onPrev();
        }
    };

    const handleSubmit = async () => {
        try {
            console.log('id:', id);
            console.log('password:', password);
            console.log('nickname:', nickname);
            console.log('gender:', gender);
            console.log('birthdate:', startDate.toISOString().split('T')[0]);
            const dataToSend = {
                username: id,
                password,
                nickname,
                gender,
                birthdate: startDate.toISOString().split('T')[0],
            };
            console.log('dataToSend:', dataToSend);

            const response = await axios.post('http://127.0.0.1:8000/user/join/', dataToSend);
            alert('회원가입 성공');
            navigate('/login');

        } catch (error) {
            alert('회원가입 실패:' + error);
        }
    };

    return (
        <div className='signup_container'>
            <form className='login_sec1'>
                <div className="sec1_header">
                    <FaChevronLeft className='back_btn' onClick={handlePrev} />
                    <p className='login_title'>회원가입</p>
                    <div></div>
                </div>
                <div className='login_id_container login_id_container2'>
                    <div className="label_container">
                        <p className='login_id_label'>닉네임을 입력하세요.</p>
                        <p className='label_alert'>* 닉네임은 추후 수정이 불가합니다.</p>
                    </div>
                    <input type="text" id='nickname' value={nickname} onChange={(e) => setNickname(e.target.value)} required />
                </div>
                <div className='login_id_container login_id_container2'>
                    <div className="label_container">
                        <p className='login_id_label'>성별을 선택하세요.</p>
                        <p className='label_alert'>* 성별은 추후 수정이 불가합니다.</p>
                    </div>
                    <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="">성별 선택</option>
                        <option value="male">남자</option>
                        <option value="female">여자</option>
                    </select>
                </div>
                <div className='login_id_container login_id_container2'>
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
                <button type="button" className="login_button" onClick={handleSubmit}>회원가입 완료</button>
            </form>
            <section className='login_sec2'>
                <span>이미 계정이 있으신가요?</span>
                <a href="/login">로그인하기</a>
            </section>
        </div>
    )
}

export default Signup2