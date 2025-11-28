import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type];

  const icon = {
    success: 'ri-checkbox-circle-line',
    error: 'ri-error-warning-line',
    info: 'ri-information-line',
  }[type];

  return (
    <div className="fixed top-24 right-6 z-[10000] animate-slideDown">
      <div className={`${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px]`}>
        <i className={`${icon} text-2xl`}></i>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>
    </div>
  );
}
