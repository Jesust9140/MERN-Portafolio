import React, { useState, useEffect, useCallback } from 'react';
import '../css/Admin.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

const formatAmount = (cents) => (typeof cents === 'number' ? `$${(cents / 100).toFixed(2)}` : '—');

const Admin = () => {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [intakes, setIntakes] = useState([]);
  const [loadingIntakes, setLoadingIntakes] = useState(false);
  const [listError, setListError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIntakes([]);
    setSelectedId(null);
  }, []);

  const loadIntakes = useCallback(
    async (authToken) => {
      setLoadingIntakes(true);
      setListError('');

      try {
        const response = await fetch(`${apiUrl}/api/admin/intakes`, {
          headers: { 'x-admin-token': authToken }
        });

        if (response.status === 401) {
          handleLogout();
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          setListError(data.error || 'Could not load submissions.');
          return;
        }

        setIntakes(data);
      } catch (error) {
        console.error('Admin intake list error:', error);
        setListError('Could not load submissions.');
      } finally {
        setLoadingIntakes(false);
      }
    },
    [handleLogout]
  );

  useEffect(() => {
    if (token) {
      loadIntakes(token);
    }
  }, [token, loadIntakes]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    try {
      const response = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || 'Login failed.');
        return;
      }

      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setPassword('');
    } catch (error) {
      console.error('Admin login error:', error);
      setLoginError('Something went wrong. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  const selectedIntake = intakes.find((intake) => intake._id === selectedId) || null;

  if (!token) {
    return (
      <section className="admin-section">
        <div className="admin-login-container">
          <h1 className="admin-title">Admin Login</h1>
          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              autoFocus
            />
            {loginError && <p className="admin-error">{loginError}</p>}
            <button type="submit" disabled={loggingIn} className="admin-button">
              {loggingIn ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Submissions</h1>
          <button type="button" className="admin-logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>

        {listError && <p className="admin-error">{listError}</p>}
        {loadingIntakes && <p className="admin-status">Loading...</p>}

        {!loadingIntakes && intakes.length === 0 && !listError && (
          <p className="admin-status">No submissions yet.</p>
        )}

        <div className="admin-layout">
          <div className="admin-list">
            {intakes.map((intake) => (
              <button
                key={intake._id}
                type="button"
                className={`admin-list-item ${selectedId === intake._id ? 'admin-list-item-active' : ''}`}
                onClick={() => setSelectedId(intake._id)}
              >
                <span className="admin-list-item-name">
                  {intake.companyName || `${intake.firstName} ${intake.lastName}`}
                </span>
                <span className="admin-list-item-meta">
                  {intake.tierName} • {formatDate(intake.createdAt)}
                </span>
              </button>
            ))}
          </div>

          <div className="admin-detail">
            {!selectedIntake && intakes.length > 0 && (
              <p className="admin-status">Select a submission to view details.</p>
            )}

            {selectedIntake && (
              <div className="admin-detail-card">
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Company</span>
                  <span className="admin-detail-value">{selectedIntake.companyName || '—'}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Name</span>
                  <span className="admin-detail-value">{selectedIntake.firstName} {selectedIntake.lastName}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Email</span>
                  <span className="admin-detail-value">
                    <a href={`mailto:${selectedIntake.email}`}>{selectedIntake.email}</a>
                  </span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Phone</span>
                  <span className="admin-detail-value">{selectedIntake.phone || '—'}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Tier</span>
                  <span className="admin-detail-value">{selectedIntake.tierName} — {formatAmount(selectedIntake.amount)}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Template</span>
                  <span className="admin-detail-value">{selectedIntake.templateChoice || 'None / Custom'}</span>
                </div>
                {selectedIntake.assetLink && (
                  <div className="admin-detail-row">
                    <span className="admin-detail-label">Asset Link</span>
                    <span className="admin-detail-value">
                      <a href={selectedIntake.assetLink} target="_blank" rel="noopener noreferrer">
                        {selectedIntake.assetLink}
                      </a>
                    </span>
                  </div>
                )}
                {selectedIntake.uploadedFiles && selectedIntake.uploadedFiles.length > 0 && (
                  <div className="admin-detail-row">
                    <span className="admin-detail-label">Files</span>
                    <span className="admin-detail-value admin-detail-files">
                      {selectedIntake.uploadedFiles.map((file, index) => (
                        <a key={index} href={file.url} target="_blank" rel="noopener noreferrer">
                          {file.type && file.type.startsWith('image/') ? 'Image' : file.type && file.type.includes('pdf') ? 'PDF' : 'Doc'} {index + 1}
                        </a>
                      ))}
                    </span>
                  </div>
                )}
                <div className="admin-detail-row admin-detail-row-block">
                  <span className="admin-detail-label">Project Details</span>
                  <p className="admin-detail-details">{selectedIntake.details}</p>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Submitted</span>
                  <span className="admin-detail-value">{formatDate(selectedIntake.createdAt)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
