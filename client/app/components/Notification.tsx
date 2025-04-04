'use client';

import { useEffect } from 'react';

type NotificationProps = {
  visible: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
};

export const Notification = ({ 
  visible, 
  type, 
  message, 
  onClose,
  autoHideDuration = 1500 
}: NotificationProps) => {
  useEffect(() => {
    if (visible && autoHideDuration) {
      const timer = setTimeout(onClose, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [visible, autoHideDuration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-12 z-50 w-[calc(100%-2rem)] max-w-md left-1/2 transform -translate-x-1/2 ${
        type === 'success' ? 'bg-green-500 border-green-600' : 'bg-red-500 border-red-600'
      } border rounded-lg shadow-md py-3 px-4 flex items-center justify-between animate-fade-in-up text-white`}
    >
      <div className="flex items-center">
        <div className={`flex-shrink-0 mr-3 text-lg ${type === 'success' ? 'text-emerald-200' : 'text-red-200'}`}>
          {type === 'success' ? '✓' : '⚠'}
        </div>
        <p className="text-base font-normal">{message}</p>
      </div>
      <button 
        onClick={onClose} 
        className="text-gray-200 hover:text-white text-lg font-light"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};