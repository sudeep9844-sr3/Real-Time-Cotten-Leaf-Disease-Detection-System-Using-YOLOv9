import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
    const [progress, setProgress] = React.useState(100);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        const interval = setInterval(() => {
            setProgress((prev) => Math.max(0, prev - (100 / (duration / 100))));
        }, 100);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [duration, onClose]);

    const config = {
        success: {
            icon: CheckCircle,
            bg: 'from-green-500 to-emerald-500',
            border: 'border-green-200',
            text: 'text-green-900'
        },
        error: {
            icon: AlertCircle,
            bg: 'from-red-500 to-rose-500',
            border: 'border-red-200',
            text: 'text-red-900'
        },
        warning: {
            icon: AlertTriangle,
            bg: 'from-yellow-500 to-orange-500',
            border: 'border-yellow-200',
            text: 'text-yellow-900'
        },
        info: {
            icon: Info,
            bg: 'from-blue-500 to-cyan-500',
            border: 'border-blue-200',
            text: 'text-blue-900'
        }
    };

    const { icon: Icon, bg, border, text } = config[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`relative bg-white/95 backdrop-blur-xl ${border} border-2 rounded-2xl shadow-2xl p-4 min-w-[320px] max-w-md overflow-hidden`}
        >
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                <motion.div
                    className={`h-full bg-gradient-to-r ${bg}`}
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            <div className="flex items-start space-x-3">
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r ${bg} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Message */}
                <div className="flex-1 pt-1">
                    <p className={`font-semibold ${text} text-sm leading-relaxed`}>{message}</p>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X className="w-4 h-4 text-gray-500" />
                </button>
            </div>
        </motion.div>
    );
};

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-3">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                        duration={toast.duration}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

// Hook to use toasts
export const useToast = () => {
    const [toasts, setToasts] = React.useState([]);

    const addToast = (message, type = 'info', duration = 5000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return { toasts, addToast, removeToast, ToastContainer };
};

export default Toast;
