// Flag component using flag images
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface FlagEmojiProps {
  countryCode: string;
  imagePath?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function FlagEmoji({ countryCode, imagePath, className, size = 'md' }: FlagEmojiProps) {
  const [error, setError] = useState(false);

  const sizeClasses = {
    sm: 'w-6 h-4',
    md: 'w-8 h-6',
    lg: 'w-12 h-8',
  };

  // If image failed to load or no image path, show country code badge
  if (error || !imagePath) {
    return (
      <span 
        className={cn(
          'inline-flex items-center justify-center rounded font-pixel font-bold',
          'bg-pixel-cyan text-pixel-bg',
          size === 'sm' && 'px-1.5 py-0.5 text-xs',
          size === 'md' && 'px-2 py-1 text-sm',
          size === 'lg' && 'px-3 py-1.5 text-base',
          className
        )}
        title={countryCode}
      >
        {countryCode}
      </span>
    );
  }

  return (
    <img
      src={imagePath}
      alt={`${countryCode} flag`}
      className={cn(
        'inline-block object-cover rounded border border-pixel-border',
        sizeClasses[size],
        className
      )}
      onError={() => setError(true)}
      title={countryCode}
    />
  );
}
