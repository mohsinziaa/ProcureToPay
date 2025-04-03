'use client';

type NotificationProps = {
  visible: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
};

export const Notification = ({ visible, type, message, onClose }: NotificationProps) => {
  if (!visible) return null;

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 ${
        type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
      } border rounded-lg shadow-md py-3 flex items-center justify-between mt-12 mb-4 animate-fade-in-up`}
    >
      <div className="flex items-center">
        <div className={`flex-shrink-0 mr-3 ${type === 'success' ? 'text-emerald-500' : 'text-red-500'}`}>
          {type === 'success' ? '✓' : '⚠'}
        </div>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
        ✕
      </button>
    </div>
  );
};