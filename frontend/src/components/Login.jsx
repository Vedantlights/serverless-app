import React, { useState } from 'react';

const DUMMY_USERS = {
  'admin@test.com': { password: 'admin123', name: 'Admin User', role: 'admin' },
  'employee@test.com': { password: 'employee123', name: 'John Doe', role: 'employee' },
};

function Login({ onLogin, onNavigateToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShake(false);

    const trimmedEmail = email.trim().toLowerCase();
    const user = DUMMY_USERS[trimmedEmail];
    if (!user || user.password !== password.trim()) {
      setShake(true);
      setError('Invalid email or password');
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 400));
    onLogin({ email: trimmedEmail, name: user.name, role: user.role });
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
      </div>
      <div className={`auth-card glass-card ${shake ? 'shake' : ''} ${success ? 'success' : ''}`}>
        <div className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder=" "
              className="input-field"
              disabled={isLoading || success}
            />
            <label htmlFor="login-email" className="input-label">
              Email
            </label>
          </div>

          <div className="input-group">
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder=" "
              className="input-field"
              disabled={isLoading || success}
            />
            <label htmlFor="login-password" className="input-label">
              Password
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={isLoading || success}>
            {isLoading && <span className="spinner" />}
            {success && <span className="checkmark">✓</span>}
            {!isLoading && !success && 'Sign in'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <button type="button" className="link-btn" onClick={onNavigateToRegister}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
