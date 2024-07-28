import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar'
import DrinkCreate from './pages/DrinkCreate'
import DrinkDetail from './pages/DrinkDetail'
import NoDrinkCreate from './pages/NoDrinkCreate'
import NoDrinkDetail from './pages/NoDrinkDetail'
import DeleteAccount from './components/DeleteAccount';


function App() {
  return (
    <div className='main-container'>
      <SideBar/>
      {/* <DeleteAccount/> */}
      <Router>
        <Routes>
          <Route path="/" element={<NoDrinkCreate />} />
          <Route path="/detail" element={<NoDrinkDetail />} />
          <Route path="drink/" element={<DrinkCreate />} />
          <Route path="drink/detail" element={<DrinkDetail />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App