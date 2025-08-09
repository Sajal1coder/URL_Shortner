import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPanel from './AdminPanel';
import Login from './Login';

const ProtectedAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/verify', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.valid) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {

        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    } catch (error) {

      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');

    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token, userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="container">
          <div className="loading">Verifying authentication...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <AdminPanel user={user} onLogout={handleLogout} />;
};

export default ProtectedAdmin;
