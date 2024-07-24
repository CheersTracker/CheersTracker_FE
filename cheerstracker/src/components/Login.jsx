import React, { useState } from 'react'
import kakao from '../assets/images/login_kakao.png'
import google from '../assets/images/login_google.png'

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='login_container'>
            <section className='login_sec1'>
                <p className='login_title'>로그인</p>
                <div className='login_id_container'>
                    <p className='login_id_label'>아이디를 입력하세요.</p>
                    <input type="text" id='id' value={id} onChange={(e) => setId(e.target.value)} required />
                </div>
                <div className='login_pw_container'>
                    <p className='login_pw_label'>비밀번호를 입력하세요.</p>
                    <div className="pw_input">
                        <input type="password" id='pw' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <button type="button" className="login_button">로그인하기</button>
            </section>
            <section className="or-container">
                <hr className="custom-hr" />
                <span>OR</span>
                <hr className="custom-hr" />
            </section>
            <section className="login_social">
                <img src={kakao} className="login_kakao" />
                <img src={google} className="login_google" />
            </section>
        </div>
    )
}

export default Login