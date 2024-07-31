import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import '../assets/scss/sidebar.scss';
import '../assets/scss/reset.scss';
import Calander from '../assets/images/Calander.svg';
import Chart from '../assets/images/Chart.svg';
import Community from '../assets/images/Community.svg';
import DrinkNo from '../assets/images/DrinkNo.svg';
import Drink from '../assets/images/Drink.svg';
import Logout from '../assets/images/Logout.svg';
import Menu from '../assets/images/Menu.svg';
import User from '../assets/images/User.svg';
import Logo from '../assets/images/Logo/CheersTracker_logo.png';
import miniLogo from '../assets/images/Logo/CheersTracker_logo_mini.png'

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const clickMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`sidebar-big-container ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className='sidebar-container'>
        <div onClick={clickMenu} className='sidebar-box'>
          <img src={Menu} alt="메뉴 아이콘" />
        </div>
        <div className='sidebar-box-logout'>
          <div className='sidebar-logoout-container'>
          {sidebarOpen && <p className='sidebar-nickname'>닉네임</p>}
          {sidebarOpen && <p className='sidebar-email'>이메일주소</p>}
          </div>
          <img src={Logout} alt="로그아웃 아이콘" />
        </div>
        <div className='sidebar-box'>
          <img src={Calander} alt="캘린더 아이콘" />
          {sidebarOpen && <p className='sidebar-text'>캘린더</p>}
        </div>
        <div className='sidebar-box'>
          <img src={Drink} alt="음주기록 아이콘" />
          {sidebarOpen && <p className='sidebar-text'>음주기록</p>}
        </div>
        <div className='sidebar-box'>
          <img src={DrinkNo} alt="금주기록 아이콘" />
          {sidebarOpen && <p className='sidebar-text'>금주기록</p>}
        </div>
        <div className='sidebar-box'>
          <img src={Chart} alt="분석 아이콘" />
          {sidebarOpen && <p className='sidebar-text'>분석</p>}
        </div>
        <div className='sidebar-box'>
          <img src={Community} alt="커뮤니티 아이콘" />
          {sidebarOpen && <p className='sidebar-text'>커뮤니티</p>}
        </div>
        <div className='sidebar-box'>
          <img src={User} alt="마이페이지 아이콘" />
          {sidebarOpen && <p className='sidebar-text'>마이페이지</p>}
        </div>
      </div>
      {sidebarOpen && <img src={Logo} alt="로고 이미지" className='sidebar-logo'></img>}
      {!sidebarOpen && <img src={miniLogo} alt="미니 로고 이미지" className='sidebar-mini-logo'></img>}
    </div>
  );
};

export default SideBar;
