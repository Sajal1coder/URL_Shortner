import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = ({ user, onLogout }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/urls', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUrls(response.data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('Authentication failed. Please login again.');
        onLogout();
      } else {
        setError('Failed to fetch URLs');
      }

    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="container">
          <div className="loading">Loading URLs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <div className="admin-header-content">
            <div>
              <h1>Admin Panel</h1>
              <p>Manage and track all shortened URLs</p>
              {user && <p className="welcome-text">Welcome, {user.username}!</p>}
            </div>
            <div className="admin-actions">
              <button onClick={fetchUrls} className="refresh-btn">
                Refresh Data
              </button>
              <button onClick={onLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="stats-section">
          <div className="stat-card">
            <h3>Total URLs</h3>
            <p className="stat-number">{urls.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Clicks</h3>
            <p className="stat-number">
              {urls.reduce((total, url) => total + url.clicks, 0)}
            </p>
          </div>
          <div className="stat-card">
            <h3>Most Clicked</h3>
            <p className="stat-number">
              {urls.length > 0 ? Math.max(...urls.map(url => url.clicks)) : 0}
            </p>
          </div>
        </div>

        <div className="urls-section">
          <h2>All Shortened URLs</h2>
          {urls.length === 0 ? (
            <div className="no-urls">
              No URLs found. Create some shortened URLs first!
            </div>
          ) : (
            <div className="urls-table">
              <div className="table-header">
                <div className="col">Original URL</div>
                <div className="col">Short URL</div>
                <div className="col">Clicks</div>
                <div className="col">Created</div>
                <div className="col">Actions</div>
              </div>
              {urls.map((url) => (
                <div key={url._id} className="table-row">
                  <div className="col original-url">
                    <a 
                      href={url.originalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title={url.originalUrl}
                    >
                      {url.originalUrl.length > 50 
                        ? `${url.originalUrl.substring(0, 50)}...` 
                        : url.originalUrl}
                    </a>
                  </div>
                  <div className="col short-url">
                    <span className="short-link">{url.shortUrl}</span>
                  </div>
                  <div className="col clicks">
                    <span className="click-count">{url.clicks}</span>
                  </div>
                  <div className="col created">
                    {formatDate(url.createdAt)}
                  </div>
                  <div className="col actions">
                    <button 
                      onClick={() => copyToClipboard(url.shortUrl, url._id)}
                      className="copy-btn-small"
                    >
                      {copiedId === url._id ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
