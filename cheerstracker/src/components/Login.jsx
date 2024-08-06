import React, { useState } from 'react'
import kakao from '../assets/images/login_kakao.png'
import google from '../assets/images/login_google.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/user/login/', {
                username: id,
                password,
            });
            console.log(response.data);

            const { token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', id);
            alert('로그인 성공');
            navigate('/');
            setId('');
            setPassword('');
        } catch (error) {
            alert('로그인 실패');
            console.log('로그인 실패', JSON.stringify(error.response.data))
            setId('');
            setPassword('');
        }
    };

    const handleKakao = async () => {
        try {
            window.location.href = 'http://127.0.0.1:8000/accounts/kakao/login/';
        } catch (error) {
            alert('로그인 실패:', JSON.stringify(error.response.data));
        }
    }

    const handleGoogle = async () => {
        try {
            window.location.href = 'http://127.0.0.1:8000/accounts/google/login/';
        } catch (error) {
            alert('로그인 실패:', JSON.stringify(error.response.data));
        }
    };

    return (
        <div className='login_container'>
            <form className='login_sec1'>
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
                <button type="button" className="login_button" onClick={handleLogin}>로그인하기</button>
            </form>
            <section className="or-container">
                <hr className="custom-hr" />
                <span>OR</span>
                <hr className="custom-hr" />
            </section>
            <section className="login_social">
                <img src={kakao} className="login_kakao" onClick={handleKakao} />
                <img src={google} className="login_google" onClick={handleGoogle} />
            </section>
        </div >
    )
}

export default Login