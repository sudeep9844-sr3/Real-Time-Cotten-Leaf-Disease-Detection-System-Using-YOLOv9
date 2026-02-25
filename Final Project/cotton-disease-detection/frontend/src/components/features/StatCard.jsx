import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color = 'green',
    delay = 0
}) => {
    const colors = {
        green: {
            bg: 'from-green-500 to-emerald-500',
            light: 'bg-green-50',
            text: 'text-green-600',
            icon: 'text-green-600'
        },
        blue: {
            bg: 'from-blue-500 to-cyan-500',
            light: 'bg-blue-50',
            text: 'text-blue-600',
            icon: 'text-blue-600'
        },
        purple: {
            bg: 'from-purple-500 to-pink-500',
            light: 'bg-purple-50',
            text: 'text-purple-600',
            icon: 'text-purple-600'
        },
        orange: {
            bg: 'from-orange-500 to-amber-500',
            light: 'bg-orange-50',
            text: 'text-orange-600',
            icon: 'text-orange-600'
        }
    };

    const colorScheme = colors[color] || colors.green;

    const getTrendIcon = () => {
        if (trend === 'up') return TrendingUp;
        if (trend === 'down') return TrendingDown;
        return Minus;
    };

    const getTrendColor = () => {
        if (trend === 'up') return 'text-green-600';
        if (trend === 'down') return 'text-red-600';
        return 'text-gray-600';
    };

    const TrendIcon = getTrendIcon();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="card-hover group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${colorScheme.bg}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>

                {trend && trendValue && (
                    <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
                        <TrendIcon className="w-4 h-4" />
                        <span className="text-sm font-semibold">{trendValue}</span>
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: delay + 0.2, duration: 0.5 }}
                    className={`text-4xl font-black ${colorScheme.text}`}
                >
                    {value}
                </motion.p>
            </div>
        </motion.div>
    );
};

// Animated Number Component
export const AnimatedNumber = ({ value, duration = 2, suffix = '', prefix = '' }) => {
    const [displayValue, setDisplayValue] = React.useState(0);

    React.useEffect(() => {
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        let startValue = 0;
        const increment = numericValue / (duration * 60); // 60 FPS

        const timer = setInterval(() => {
            startValue += increment;
            if (startValue >= numericValue) {
                setDisplayValue(numericValue);
                clearInterval(timer);
            } else {
                setDisplayValue(startValue);
            }
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [value, duration]);

    const formattedValue = Number.isInteger(displayValue)
        ? Math.round(displayValue)
        : displayValue.toFixed(1);

    return (
        <span>
            {prefix}{formattedValue}{suffix}
        </span>
    );
};

export default StatCard;
