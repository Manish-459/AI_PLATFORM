import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TextSummary from './pages/TextSummary';
import ParagraphGen from './pages/ParagraphGen';
import ChatBot from './pages/ChatBot';
import JsConverter from './pages/JsConverter';
import ScifiImage from './pages/ScifiImage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { background: '#1a1d2d', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      <BrowserRouter>
        <Navbar />
        <div style={{ paddingTop: '80px', paddingBottom: '40px', maxWidth: '1200px', margin: '0 auto', padding: '100px 20px 40px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/summary" element={<TextSummary />} />
            <Route path="/paragraph" element={<ParagraphGen />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/js-converter" element={<JsConverter />} />
            <Route path="/scifi-image" element={<ScifiImage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
