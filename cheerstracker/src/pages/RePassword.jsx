import React, { useState } from 'react'
import '../assets/scss/login.scss'
import logo_mini from '../assets/images/Logo/CheersTracker_logo_mini.png'
import SideBar from '../components/SideBar';
import axios from 'axios';

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

    const changePassword = async () => {
        if (!passwordMatch || password.length === 0) {
            alert('비밀번호가 일치하지 않거나 비밀번호가 비어 있습니다.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch('http://127.0.0.1:8000/user/account/change-password/', {
                old_password: currentPassword,
                new_password: password,
            }, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.status === 200) {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                setCurrentPassword('');
                setPassword('');
                setRePassword('');
            }
        } catch (error) {
            console.error('Error changing password:', JSON.stringify(error.response.data));
            alert('비밀번호 변경에 실패했습니다. 현재 비밀번호나 비밀번호 조건을 확인하세요.');
        }
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
                            <button type="button" className="login_button" onClick={changePassword}>비밀번호 변경하기</button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RePassword