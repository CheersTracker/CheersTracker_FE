import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar'
import DrinkCreate from './pages/DrinkCreate'
import DrinkDetail from './pages/DrinkDetail'


function App() {
  return (
    <div className='main-container'>
      <SideBar/>
      <Router>
        <Routes>
          <Route path="/" element={<DrinkCreate />} />
          <Route path="/detail" element={<DrinkDetail />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App