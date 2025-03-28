'use client';
import { useLogin } from '../hooks/useLogin';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: 'admin',
    password: '12345'
  });
  const { token, error, loading, handleLogin } = useLogin();

  // Redirect to orders page if token exists
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      router.push('/orders');
    }
  }, [router]);

  // Handle successful login
  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
      router.push('/orders');
    }
  }, [token, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(credentials.username, credentials.password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            className="form-input"
            value={credentials.username}
            onChange={handleInputChange}
            placeholder="Enter username"
            required
            disabled={loading}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-input"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <span className="loading-indicator">Logging in...</span>
          ) : (
            'Login'
          )}
        </button>
      </form>

      {error && (
        <div className="error-message" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}