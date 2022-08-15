import './App.css';
import Transfer from './components/Transfer';
import Login from "./components/Login"
import * as React from 'react';

import Home from './components/Home';
import { Routes, Route } from "react-router-dom"
import Dashboard from './components/Dashboard';
function App() {
  return (
    <>
      <div className='App'>
        
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
      </Routes>
    </>
  );
}

export default App;
