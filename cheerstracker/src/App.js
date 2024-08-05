import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Report from './pages/Report.jsx'
import Calender from './pages/Calender.jsx'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/report' element={<Report />}/>
            <Route path='/calender' element={<Calender />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
