import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SideBar from './components/SideBar'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <SideBar/>
  </React.StrictMode>
);