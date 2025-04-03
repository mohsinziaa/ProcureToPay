'use client';
import { useLogin } from '../hooks/useLogin';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { Input } from '@/app/components/Input';
import { Notification } from '@/app/components/Notification';
import { motion } from 'framer-motion';

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
      {/* Login Container with animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-md"
      >
        {/* Logo with animation */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center mb-8"
        >
          <img 
            src="/matco-logo.png" 
            alt="Company Logo" 
            className="w-44 h-auto"
          />
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Input
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              label="User ID"
              disabled={isProcessing}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
              label="Password"
              disabled={isProcessing}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button type="submit" isLoading={isProcessing}>
              Login
            </Button>
          </motion.div>
        </form>

        <Notification
          visible={notification.visible}
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
        />
      </motion.div>
    </div>
  );
}