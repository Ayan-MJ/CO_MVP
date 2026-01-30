import React from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function Dropdown({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  error,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="block mb-2 text-[var(--text-callout)] font-medium text-text-primary">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full h-[48px] px-4 rounded-[var(--radius-sm)]
            bg-input-background text-text-primary
            border border-divider
            flex items-center justify-between
            transition-all duration-200
            ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-elevated-surface'}
            ${error ? 'border-error' : ''}
            ${isOpen ? 'ring-2 ring-focus-ring border-accent' : ''}
          `}
        >
          <span className={selectedOption ? 'text-text-primary' : 'text-text-muted'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-text-muted transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-elevated-surface rounded-[var(--radius-md)] border border-divider shadow-[var(--shadow-lg)] overflow-hidden">
            <div className="max-h-[240px] overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full px-4 py-3 flex items-center justify-between
                    text-left transition-colors
                    ${
                      option.value === value
                        ? 'bg-accent-muted text-text-primary'
                        : 'text-text-primary hover:bg-surface'
                    }
                  `}
                >
                  <span className="text-[var(--text-callout)]">{option.label}</span>
                  {option.value === value && (
                    <Check className="w-5 h-5 text-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-[var(--text-footnote)] text-error">{error}</p>
      )}
    </div>
  );
}

export interface DateTimePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  error?: string;
  disabled?: boolean;
}

export function DateTimePicker({
  label,
  value,
  onChange,
  mode = 'date',
  error,
  disabled = false,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatValue = () => {
    if (!value) return '';
    
    if (mode === 'date') {
      return value.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } else if (mode === 'time') {
      return value.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } else {
      return value.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      onChange(newDate);
      if (mode === 'date') {
        setIsOpen(false);
      }
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newDate = value ? new Date(value) : new Date();
    newDate.setHours(hours, minutes);
    onChange(newDate);
    if (mode === 'time') {
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full" ref={pickerRef}>
      {label && (
        <label className="block mb-2 text-[var(--text-callout)] font-medium text-text-primary">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full h-[48px] px-4 rounded-[var(--radius-sm)]
            bg-input-background text-text-primary
            border border-divider
            flex items-center justify-between
            transition-all duration-200
            ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-elevated-surface'}
            ${error ? 'border-error' : ''}
            ${isOpen ? 'ring-2 ring-focus-ring border-accent' : ''}
          `}
        >
          <span className={value ? 'text-text-primary' : 'text-text-muted'}>
            {value ? formatValue() : `Select ${mode}`}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-text-muted transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-elevated-surface rounded-[var(--radius-md)] border border-divider shadow-[var(--shadow-lg)] p-4">
            <div className="space-y-3">
              {(mode === 'date' || mode === 'datetime') && (
                <input
                  type="date"
                  onChange={handleDateChange}
                  value={value ? value.toISOString().split('T')[0] : ''}
                  className="w-full h-[48px] px-4 rounded-[var(--radius-sm)] bg-surface text-text-primary border border-divider focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-accent"
                />
              )}
              {(mode === 'time' || mode === 'datetime') && (
                <input
                  type="time"
                  onChange={handleTimeChange}
                  value={
                    value
                      ? `${value.getHours().toString().padStart(2, '0')}:${value
                          .getMinutes()
                          .toString()
                          .padStart(2, '0')}`
                      : ''
                  }
                  className="w-full h-[48px] px-4 rounded-[var(--radius-sm)] bg-surface text-text-primary border border-divider focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-accent"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-[var(--text-footnote)] text-error">{error}</p>
      )}
    </div>
  );
}
