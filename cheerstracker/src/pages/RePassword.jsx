import React, { useState } from 'react'
import '../assets/scss/login.scss'
import logo_mini from '../assets/images/Logo/CheersTracker_logo_mini.png'
import SideBar from '../components/SideBar';

const RePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleRePasswordChange = (e) => {
        const value = e.target.value;
        setRePassword(value);
        setPasswordMatch(value === password);
    };

    return (
        <div style={{ display: 'flex' }}>
            <SideBar />
            <div className='repwpg_container'>
                <div style={{ width: '100%' }}>
                    <section className='signuppg_sec1'>
                        <img src={logo_mini} className='logo_mini' />
                    </section>
                    <div className='signup_container'>
                        <section className='login_sec1'>
                            <div className="sec1_header">
                                <div style={{ width: "25px", height: "25px" }}></div>
                                <p className='login_title'>비밀번호 변경</p>
                                <div></div>
                            </div>
                            <div className='login_pw_container'>
                                <p className='login_pw_label'>현재 비밀번호를 입력하세요.</p>
                                <div className="pw_input_content">
                                    <input type="password" id='current_pw' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                                </div>
                            </div>
                            <div className='login_pw_container'>
                                <p className='login_pw_label'>새 비밀번호를 입력하세요.</p>
                                <div className="pw_input">
                                    <input type="password" id='pw' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                            </div>
                            <div className='login_pw_container'>
                                <p className='login_pw_label'>비밀번호를 다시 입력하세요.</p>
                                <div className="pw_input">
                                    <input type="password" id='pw_re' value={rePassword} onChange={handleRePasswordChange} required />
                                </div>
                                {!passwordMatch && rePassword && (
                                    <p className='pw_error_msg'>비밀번호를 다시 확인해주세요.</p>
                                )}
                            </div>
                            <button type="button" className="login_button">비밀번호 변경하기</button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RePassword