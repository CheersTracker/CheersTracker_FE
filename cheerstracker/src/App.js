import React from 'react'
import CommuDetailPage from './pages/CommuDetailPage'
import CommunityPage from './pages/CommunityPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PostPage from './pages/PostPage'
import Report from './pages/Report.jsx'
import Calender from './pages/Calender.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RePassword from './pages/RePassword'
import MyCommunity from './pages/MyCommunity'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/report' element={<Report />} />
          <Route path='/' element={<Calender />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/posts/:id" element={<CommuDetailPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/repassword" element={<RePassword />} />
          <Route path="/mycommunity" element={<MyCommunity />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App