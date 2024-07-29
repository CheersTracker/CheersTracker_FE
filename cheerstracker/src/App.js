import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar'
import DrinkCreate from './pages/DrinkCreate'
import DrinkDetail from './pages/DrinkDetail'
import NoDrinkCreate from './pages/NoDrinkCreate'
import NoDrinkDetail from './pages/NoDrinkDetail'
import DeleteAccount1 from './components/DeleteAccount1';
import DeleteAccount2 from './components/DeleteAccount2';
import MyPage from './pages/MyPage';


function App() {
  return (
    <div className='main-container'>
      <SideBar/>
      {/* <DeleteAccount1/> */}
      {/* <DeleteAccount2/> */}
      {/* <MyPage/> */}
      <Router>
        <Routes>
          <Route path="/" element={<NoDrinkCreate />} />
          <Route path="/detail" element={<NoDrinkDetail />} />
          {/* <Route path="drink/" element={<DrinkCreate />} /> */}
          {/* <Route path="/detail" element={<DrinkDetail />} /> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App