import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
}

export const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant = 'primary', size = 'md', isActive, children, ...props }, ref) => {
    const baseStyles = 'relative font-pixel transition-all active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: cn(
        'bg-f1-red text-white border-4 border-f1-red-dark',
        'shadow-pixel hover:shadow-pixel-hover',
        isActive && 'shadow-pixel-active translate-x-[2px] translate-y-[2px]'
      ),
      secondary: cn(
        'bg-pixel-surface text-pixel-text border-4 border-pixel-border',
        'shadow-pixel hover:shadow-pixel-hover hover:border-pixel-cyan',
        isActive && 'shadow-pixel-active translate-x-[2px] translate-y-[2px] border-pixel-cyan'
      ),
      ghost: cn(
        'bg-transparent text-pixel-text-dim border-4 border-transparent',
        'hover:text-pixel-cyan hover:border-pixel-border',
        isActive && 'text-pixel-cyan border-pixel-border'
      ),
    };

    const sizes = {
      sm: 'px-3 py-2 text-[10px]',
      md: 'px-4 py-3 text-pixel-sm',
      lg: 'px-6 py-4 text-pixel',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PixelButton.displayName = 'PixelButton';
