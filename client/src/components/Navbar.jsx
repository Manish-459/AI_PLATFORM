import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/auth/logout');
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(15, 17, 26, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '16px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 className="heading-primary text-gradient" style={{ margin: 0, fontSize: '1.8rem' }}>
          AI Nexus
        </h1>
      </Link>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {loggedIn ? (
          <>
            <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: '0.2s' }} 
                  onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
              Dashboard
            </Link>
            <button className="btn-secondary" onClick={handleLogout} style={{ padding: '8px 16px' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Sign Up</Link>
            <Link to="/login" className="btn-primary" style={{ padding: '8px 20px', textDecoration: 'none', display: 'inline-block' }}>Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
