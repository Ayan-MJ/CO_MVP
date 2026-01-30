import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };
  
  const styles = {
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    info: 'bg-surface text-text-primary border border-divider',
  };
  
  React.useEffect(() => {
    if (onClose) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [onClose]);
  
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)]
        shadow-[var(--shadow-lg)] max-w-sm mx-auto
        ${styles[type]}
      `}
    >
      {icons[type]}
      <span className="flex-1 text-[var(--text-callout)] font-medium">{message}</span>
      {onClose && (
        <button onClick={onClose} className="hover:opacity-70 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export interface BannerProps {
  message: string;
  type?: 'info' | 'warning' | 'error';
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}

export function Banner({ message, type = 'info', action, onDismiss }: BannerProps) {
  const styles = {
    info: 'bg-accent-muted border-accent/40 text-text-primary',
    warning: 'bg-warning/20 border-warning/40 text-warning',
    error: 'bg-error/20 border-error/40 text-error',
  };
  
  return (
    <div className={`flex items-center gap-3 px-4 py-3 border ${styles[type]} rounded-[var(--radius-sm)]`}>
      <Info className="w-5 h-5 flex-shrink-0" />
      <p className="flex-1 text-[var(--text-callout)]">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="text-[var(--text-callout)] font-semibold hover:opacity-70 transition-opacity"
        >
          {action.label}
        </button>
      )}
      {onDismiss && (
        <button onClick={onDismiss} className="hover:opacity-70 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export interface InlineErrorProps {
  message: string;
}

export function InlineError({ message }: InlineErrorProps) {
  return (
    <div className="flex items-center gap-2 text-error">
      <AlertCircle className="w-4 h-4" />
      <span className="text-[var(--text-footnote)]">{message}</span>
    </div>
  );
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      {icon && (
        <div className="w-16 h-16 rounded-full bg-input-background flex items-center justify-center mb-4 text-text-muted">
          {icon}
        </div>
      )}
      <h3 className="text-[var(--text-title-3)] font-semibold text-text-primary mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-[var(--text-callout)] text-text-secondary mb-6 max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 h-12 rounded-[var(--radius-sm)] bg-accent text-accent-foreground text-[var(--text-callout)] font-semibold hover:opacity-90 active:scale-95 transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export interface LoadingSkeletonProps {
  variant?: 'profile' | 'intro' | 'card';
}

export function LoadingSkeleton({ variant = 'card' }: LoadingSkeletonProps) {
  if (variant === 'profile') {
    return (
      <div className="rounded-[var(--radius-md)] border border-divider overflow-hidden bg-surface animate-pulse">
        <div className="aspect-[3/4] bg-input-background" />
        <div className="p-4 space-y-3">
          <div className="h-6 bg-input-background rounded w-3/4" />
          <div className="h-4 bg-input-background rounded w-1/2" />
        </div>
      </div>
    );
  }
  
  if (variant === 'intro') {
    return (
      <div className="rounded-[var(--radius-md)] border border-divider p-4 bg-surface animate-pulse">
        <div className="flex gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-input-background" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-input-background rounded w-1/3" />
            <div className="h-3 bg-input-background rounded w-1/4" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-input-background rounded w-full" />
          <div className="h-4 bg-input-background rounded w-5/6" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="rounded-[var(--radius-md)] border border-divider p-4 bg-surface animate-pulse">
      <div className="space-y-3">
        <div className="h-5 bg-input-background rounded w-3/4" />
        <div className="h-4 bg-input-background rounded w-full" />
        <div className="h-4 bg-input-background rounded w-5/6" />
      </div>
    </div>
  );
}
