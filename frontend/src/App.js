import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UrlShortener from './components/UrlShortener';
import ProtectedAdmin from './components/ProtectedAdmin';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<UrlShortener />} />
          <Route path="/admin" element={<ProtectedAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
