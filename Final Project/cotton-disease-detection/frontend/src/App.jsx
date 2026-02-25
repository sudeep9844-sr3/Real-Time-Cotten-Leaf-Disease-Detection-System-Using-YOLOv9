import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import LiveDetection from './pages/LiveDetection';
import Results from './pages/Results';
import About from './pages/About';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/live" element={<LiveDetection />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="/detect" element={<Navigate to="/live" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
