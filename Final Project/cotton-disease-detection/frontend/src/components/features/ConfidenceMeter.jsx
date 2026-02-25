import React from 'react';
import { motion } from 'framer-motion';

const ConfidenceMeter = ({ confidence, label = 'Confidence', size = 'md', showPercentage = true }) => {
    const sizes = {
        sm: { circle: 80, stroke: 6, text: 'text-xl' },
        md: { circle: 120, stroke: 8, text: 'text-3xl' },
        lg: { circle: 160, stroke: 10, text: 'text-4xl' }
    };

    const { circle, stroke, text } = sizes[size];
    const radius = (circle - stroke) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (confidence / 100) * circumference;

    // Color based on confidence level
    const getColor = () => {
        if (confidence >= 80) return { from: '#22c55e', to: '#10b981', text: 'text-green-600' };
        if (confidence >= 60) return { from: '#3b82f6', to: '#2563eb', text: 'text-blue-600' };
        if (confidence >= 40) return { from: '#f59e0b', to: '#d97706', text: 'text-yellow-600' };
        return { from: '#ef4444', to: '#dc2626', text: 'text-red-600' };
    };

    const color = getColor();

    return (
        <div className="flex flex-col items-center space-y-3">
            <div className="relative" style={{ width: circle, height: circle }}>
                {/* Background Circle */}
                <svg className="transform -rotate-90" width={circle} height={circle}>
                    <defs>
                        <linearGradient id={`gradient-${confidence}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={color.from} />
                            <stop offset="100%" stopColor={color.to} />
                        </linearGradient>
                    </defs>

                    {/* Background track */}
                    <circle
                        cx={circle / 2}
                        cy={circle / 2}
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth={stroke}
                        fill="none"
                    />

                    {/* Animated progress circle */}
                    <motion.circle
                        cx={circle / 2}
                        cy={circle / 2}
                        r={radius}
                        stroke={`url(#gradient-${confidence})`}
                        strokeWidth={stroke}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        {showPercentage && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className={`${text} font-black ${color.text}`}
                            >
                                {Math.round(confidence)}%
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Label */}
            {label && (
                <p className="text-sm font-semibold text-gray-600">{label}</p>
            )}
        </div>
    );
};

// Horizontal Bar Variant
export const ConfidenceBar = ({ confidence, label, className = '' }) => {
    const getColor = () => {
        if (confidence >= 80) return 'from-green-500 to-emerald-500';
        if (confidence >= 60) return 'from-blue-500 to-cyan-500';
        if (confidence >= 40) return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-rose-500';
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">{label}</span>
                    <span className="text-sm font-bold text-gray-900">{Math.round(confidence)}%</span>
                </div>
            )}
            <div className="progress-bar">
                <motion.div
                    className={`progress-fill bg-gradient-to-r ${getColor()}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};

export default ConfidenceMeter;
