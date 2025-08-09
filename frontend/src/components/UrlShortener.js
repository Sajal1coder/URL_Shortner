import React, { useState } from 'react';
import axios from 'axios';
import './UrlShortener.css';

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!originalUrl) {
      setError('Please enter a URL');
      return;
    }

    
    try {
      new URL(originalUrl);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/shorten', {
        originalUrl
      });
      
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      setError('Failed to shorten URL. Please try again.');

    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setOriginalUrl('');
    setShortUrl('');
    setError('');
  };

  return (
    <div className="url-shortener">
      <div className="container">
        <h1>URL Shortener</h1>
        <p className="subtitle">Shorten your long URLs quickly and easily</p>
        
        <form onSubmit={handleSubmit} className="url-form">
          <div className="input-group">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="url-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="shorten-btn"
              disabled={loading}
            >
              {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="result-section">
            <h3>Your shortened URL:</h3>
            <div className="result-container">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="result-input"
              />
              <button 
                onClick={copyToClipboard}
                className="copy-btn"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button 
              onClick={resetForm}
              className="reset-btn"
            >
              Shorten Another URL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;
