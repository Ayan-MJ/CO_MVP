import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  ...props
}: InputProps) {
  const inputId = props.id ?? React.useId();
  const errorId = `${inputId}-error`;
  const helperTextId = `${inputId}-help`;
  const describedBy = error ? errorId : helperText ? helperTextId : undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          className="block mb-2 text-[var(--text-callout)] font-medium text-text-primary"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <input
        className={`
          w-full h-[48px] px-4 rounded-[var(--radius-sm)]
          bg-input-background text-text-primary
          border border-divider
          focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-accent
          placeholder:text-text-muted
          transition-all duration-200
          disabled:opacity-40 disabled:cursor-not-allowed
          ${error ? 'border-error focus:ring-error/40' : ''}
          ${className}
        `}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : undefined}
        id={inputId}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-[var(--text-footnote)] text-error" id={errorId}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-[var(--text-footnote)] text-text-muted" id={helperTextId}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function TextArea({
  label,
  error,
  helperText,
  className = '',
  rows = 4,
  ...props
}: TextAreaProps) {
  const textAreaId = props.id ?? React.useId();
  const errorId = `${textAreaId}-error`;
  const helperTextId = `${textAreaId}-help`;
  const describedBy = error ? errorId : helperText ? helperTextId : undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          className="block mb-2 text-[var(--text-callout)] font-medium text-text-primary"
          htmlFor={textAreaId}
        >
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 rounded-[var(--radius-sm)]
          bg-input-background text-text-primary
          border border-divider
          focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-accent
          placeholder:text-text-muted
          transition-all duration-200
          disabled:opacity-40 disabled:cursor-not-allowed
          resize-none
          ${error ? 'border-error focus:ring-error/40' : ''}
          ${className}
        `}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : undefined}
        id={textAreaId}
        rows={rows}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-[var(--text-footnote)] text-error" id={errorId}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-[var(--text-footnote)] text-text-muted" id={helperTextId}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export function OTPInput({ length = 6, value, onChange }: OTPInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  
  const handleChange = (index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return;
    
    const newValue = value.split('');
    newValue[index] = digit;
    onChange(newValue.join(''));
    
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="
            w-12 h-14 text-center text-[var(--text-title-2)] font-semibold
            bg-input-background text-text-primary
            border border-divider rounded-[var(--radius-sm)]
            focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-accent
            transition-all duration-200
          "
        />
      ))}
    </div>
  );
}

export interface SegmentedControlProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="inline-flex p-1 bg-input-background rounded-[var(--radius-sm)] gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-4 h-8 rounded-[8px] text-[var(--text-callout)] font-medium
            transition-all duration-200
            ${value === option.value
              ? 'bg-surface text-text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
