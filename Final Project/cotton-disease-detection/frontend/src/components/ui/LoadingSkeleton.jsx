import React from 'react';

const LoadingSkeleton = ({ variant = 'default', count = 1, className = '' }) => {
    const variants = {
        default: 'h-4 w-full',
        text: 'h-4 w-3/4',
        title: 'h-8 w-1/2',
        avatar: 'h-12 w-12 rounded-full',
        card: 'h-48 w-full rounded-2xl',
        button: 'h-12 w-32 rounded-xl',
        image: 'h-64 w-full rounded-2xl',
        circle: 'h-16 w-16 rounded-full'
    };

    const skeletonClass = variants[variant] || variants.default;

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={`skeleton ${skeletonClass} ${className}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                />
            ))}
        </>
    );
};

// Preset skeleton layouts
export const CardSkeleton = () => (
    <div className="card space-y-4">
        <LoadingSkeleton variant="title" />
        <LoadingSkeleton variant="text" count={3} className="mb-2" />
        <div className="flex space-x-2">
            <LoadingSkeleton variant="button" />
            <LoadingSkeleton variant="button" />
        </div>
    </div>
);

export const ListSkeleton = ({ items = 3 }) => (
    <div className="space-y-4">
        {Array.from({ length: items }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
                <LoadingSkeleton variant="avatar" />
                <div className="flex-1 space-y-2">
                    <LoadingSkeleton variant="text" />
                    <LoadingSkeleton variant="text" className="w-1/2" />
                </div>
            </div>
        ))}
    </div>
);

export const DashboardSkeleton = () => (
    <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card space-y-3">
                    <LoadingSkeleton variant="text" className="w-1/2" />
                    <LoadingSkeleton variant="title" />
                </div>
            ))}
        </div>

        {/* Chart */}
        <div className="card">
            <LoadingSkeleton variant="image" />
        </div>

        {/* List */}
        <div className="card">
            <LoadingSkeleton variant="title" className="mb-4" />
            <ListSkeleton items={5} />
        </div>
    </div>
);

export default LoadingSkeleton;
