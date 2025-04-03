'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OrdersList from '../components/OrdersList';

export default function OrdersPage() {
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/');
  };

  if (!token) return null;

  return (
    <main className="orders-page">
      <button 
        onClick={handleLogout}
        className="logout-btn"
      >
        ← Back to Login
      </button>
      <OrdersList token={token} />
    </main>
  );
}