import React, { useState } from 'react';

function Register({ onRegister, onNavigateToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 600));
    onRegister();
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
      </div>
      <div className={`auth-card glass-card ${success ? 'success' : ''}`}>
        <div className="auth-header">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Get started with your free account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              id="register-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder=" "
              className="input-field"
              disabled={isLoading || success}
            />
            <label htmlFor="register-name" className="input-label">
              Name
            </label>
          </div>

          <div className="input-group">
            <input
              type="email"
              id="register-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder=" "
              className="input-field"
              disabled={isLoading || success}
            />
            <label htmlFor="register-email" className="input-label">
              Email
            </label>
          </div>

          <div className="input-group">
            <input
              type="password"
              id="register-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder=" "
              className="input-field"
              disabled={isLoading || success}
            />
            <label htmlFor="register-password" className="input-label">
              Password
            </label>
          </div>

          <button type="submit" className="btn btn-primary" disabled={isLoading || success}>
            {isLoading && <span className="spinner" />}
            {success && <span className="checkmark">✓</span>}
            {!isLoading && !success && 'Create account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <button type="button" className="link-btn" onClick={onNavigateToLogin}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
