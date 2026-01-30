import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface ListRowProps {
  label: string;
  value?: string | React.ReactNode;
  icon?: React.ReactNode;
  disclosure?: boolean;
  toggle?: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  };
  onClick?: () => void;
  className?: string;
}

export function ListRow({
  label,
  value,
  icon,
  disclosure = false,
  toggle,
  onClick,
  className = '',
}: ListRowProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 bg-surface border-b border-divider
        ${onClick || disclosure ? 'cursor-pointer active:bg-elevated-surface' : ''}
        transition-colors
        ${className}
      `}
    >
      {icon && <div className="text-text-secondary">{icon}</div>}
      <div className="flex-1">
        <span className="text-[var(--text-body)] text-text-primary">{label}</span>
      </div>
      {value && typeof value === 'string' && (
        <span className="text-[var(--text-body)] text-text-muted">{value}</span>
      )}
      {value && typeof value !== 'string' && value}
      {toggle && (
        <Toggle checked={toggle.checked} onChange={toggle.onChange} />
      )}
      {disclosure && (
        <ChevronRight className="w-5 h-5 text-text-muted" />
      )}
    </div>
  );
}

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onChange(!checked);
      }}
      disabled={disabled}
      className={`
        relative w-12 h-7 rounded-full transition-all duration-200
        ${checked ? 'bg-accent' : 'bg-input-background'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div
        className={`
          absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md
          transition-transform duration-200
          ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}
        `}
      />
    </button>
  );
}

export interface InfoRowProps {
  label: string;
  value: string;
  className?: string;
}

export function InfoRow({ label, value, className = '' }: InfoRowProps) {
  return (
    <div className={`flex justify-between py-2 ${className}`}>
      <span className="text-[var(--text-callout)] text-text-muted">{label}</span>
      <span className="text-[var(--text-callout)] text-text-primary font-medium">{value}</span>
    </div>
  );
}

export interface ListSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ListSection({ title, children, className = '' }: ListSectionProps) {
  return (
    <div className={className}>
      {title && (
        <h3 className="px-4 py-2 text-[var(--text-footnote)] text-text-muted uppercase tracking-wide font-medium">
          {title}
        </h3>
      )}
      <div className="rounded-[var(--radius-md)] overflow-hidden border border-divider">
        {children}
      </div>
    </div>
  );
}
