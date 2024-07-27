import React from 'react'
import CommuDetailPage from './pages/CommuDetailPage'
import CommunityPage from './pages/CommunityPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PostPage from './pages/PostPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/detail" element={<CommuDetailPage />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App