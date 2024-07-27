import React from 'react'
import Report from './pages/Report'
import Calender from './pages/Calender'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/calender' element={<Calender />}/>
            <Route path='/report' element={<Report />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App