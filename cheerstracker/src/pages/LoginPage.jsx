import React from 'react'
import '../assets/scss/login.scss'
import Login from '../components/Login'
import logo from '../assets/images/Logo/CheersTracker_logo.png'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div className='loginpg_container'>
            <section className='loginpg_logo_zone'>
                <img src={logo} />
                <div className="logo_desc">
                    <div className="desc_p_container">
                        <p>간단하고 빠르게 <span>음주 정보를 기록</span>하고</p>
                        <p><span>나만의 맞춤 음주 분석 리포트</span>를 확인하세요.</p>
                        <p><span className='span_cheerstracker'>CheersTracker</span>와 함께 <span>금주 챌린지</span>를 시작하고,</p>
                        <p><span>사용자들과 정보를 공유</span>하며 이야기를 나누세요!</p>
                    </div>
                </div>
            </section>
            <section className='loginpg_login_zone'>
                <Login />
                <Link to={'/signup'}>
                    <button type="button" className="signup_button">회원가입하기</button>
                </Link>
            </section>
        </div>
    )
}

export default LoginPage