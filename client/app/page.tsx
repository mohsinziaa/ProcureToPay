'use client';
import { useLogin } from '../hooks/useLogin';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const { token, error, loading, handleLogin } = useLogin();
  const [notification, setNotification] = useState<{
    visible: boolean;
    type: 'success' | 'error';
    message: string;
  }>({ visible: false, type: 'success', message: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const requestIdRef = useRef(0);

  // Handle redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      router.push('/orders');
    }
  }, [router]);

  // Handle login results
  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
      const currentRequestId = requestIdRef.current;
      setTimeout(() => {
        if (currentRequestId === requestIdRef.current) {
          setNotification({
            visible: true,
            type: 'success',
            message: 'Login successful! Redirecting...'
          });
          setIsProcessing(false);
          // Redirect after showing the success message
          const redirectTimer = setTimeout(() => {
            router.push('/orders');
          }, 1500);
          return () => clearTimeout(redirectTimer);
        }
      }, 1000);
    }
    if (error) {
      const currentRequestId = requestIdRef.current;
      setTimeout(() => {
        if (currentRequestId === requestIdRef.current) {
          setNotification({
            visible: true,
            type: 'error',
            message: error
          });
          setIsProcessing(false);
        }
      }, 1000);
    }
  }, [token, error, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    requestIdRef.current += 1;
    await handleLogin(credentials.username, credentials.password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Login Container */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/matco-logo.png" 
            alt="Company Logo" 
            className="w-44 h-auto"
          />
        </div>

        {/* Form with Floating Labels */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="relative group">
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 group-hover:border-gray-300"
              placeholder=" "
              required
              disabled={isProcessing}
            />
            <label 
              htmlFor="username"
              className={`absolute left-3 transition-all duration-200 bg-white px-1 ${
                credentials.username 
                  ? 'top-0 text-xs text-blue-500 -translate-y-1/2'
                  : 'top-1/2 text-gray-500 -translate-y-1/2'
              } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:-translate-y-1/2`}
            >
              User ID
            </label>
          </div>

          {/* Password Field */}
          <div className="relative group">
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-blue-500 group-hover:border-gray-300"
              placeholder=" "
              required
              disabled={isProcessing}
            />
            <label 
              htmlFor="password"
              className={`absolute left-3 transition-all duration-200 bg-white px-1 ${
                credentials.password 
                  ? 'top-0 text-xs text-blue-500 -translate-y-1/2'
                  : 'top-1/2 text-gray-500 -translate-y-1/2'
              } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:-translate-y-1/2`}
            >
              Password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center ${
              isProcessing 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isProcessing ? (
              <>
                <span>Login</span>
                <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </>
            ) : 'Login'}
          </button>
        </form>

        {/* Notification Toast */}
        {notification.visible && (
          <div className={`fixed left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 ${
            notification.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          } border rounded-lg shadow-md py-3 flex items-center justify-between mt-8 mb-4 animate-fade-in-up`}>
            <div className="flex items-center">
              <div className={`flex-shrink-0 mr-3 ${
                notification.type === 'success' 
                  ? 'text-emerald-500'
                  : 'text-red-500'
              }`}>
                {notification.type === 'success' ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button 
              onClick={() => setNotification(prev => ({ ...prev, visible: false }))}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}