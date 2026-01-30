import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'default' | 'large';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-40 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    default: 'px-6 h-[48px] text-[var(--text-body)]',
    large: 'px-8 h-[56px] text-[var(--text-body)]',
  };
  
  const variantStyles = {
    primary: 'bg-accent text-accent-foreground shadow-sm hover:opacity-90 active:scale-[0.98] disabled:hover:opacity-40',
    secondary: 'bg-surface text-text-primary border border-divider hover:bg-elevated-surface active:scale-[0.98]',
    tertiary: 'bg-transparent text-accent hover:bg-accent-muted active:scale-[0.98]',
    destructive: 'bg-error text-white shadow-sm hover:opacity-90 active:scale-[0.98]',
  };
  
  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
