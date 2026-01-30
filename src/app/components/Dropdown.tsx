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
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const optionRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const listboxId = React.useId();
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const selectedOption = options.find((opt) => opt.value === value);
  const selectedIndex = options.findIndex((opt) => opt.value === value);

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
    triggerRef.current?.focus();
  };

  const focusOption = (index: number) => {
    optionRefs.current[index]?.focus();
  };

  const setActiveAndFocus = (index: number) => {
    setActiveIndex(index);
    requestAnimationFrame(() => focusOption(index));
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const startIndex = selectedIndex >= 0 ? selectedIndex : 0;
    setActiveAndFocus(startIndex);
  }, [isOpen, selectedIndex]);

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const nextIndex = Math.min(activeIndex + 1, options.length - 1);
          if (nextIndex >= 0) {
            setActiveAndFocus(nextIndex);
          }
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const nextIndex = Math.max(activeIndex - 1, 0);
          setActiveAndFocus(nextIndex);
        }
        break;
      }
      case 'Enter': {
        if (!isOpen) {
          event.preventDefault();
          setIsOpen(true);
        }
        break;
      }
      case 'Escape': {
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
        }
        break;
      }
      default:
        break;
    }
  };

  const handleListboxKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = Math.min(activeIndex + 1, options.length - 1);
        setActiveAndFocus(nextIndex);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const nextIndex = Math.max(activeIndex - 1, 0);
        setActiveAndFocus(nextIndex);
        break;
      }
      case 'Enter': {
        event.preventDefault();
        const option = options[activeIndex];
        if (option) {
          handleSelect(option.value);
        }
        break;
      }
      case 'Escape': {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      }
      default:
        break;
    }
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
          onKeyDown={handleTriggerKeyDown}
          disabled={disabled}
          ref={triggerRef}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
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
            <div
              className="max-h-[240px] overflow-y-auto"
              role="listbox"
              id={listboxId}
              aria-activedescendant={
                activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
              }
              onKeyDown={handleListboxKeyDown}
            >
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setActiveIndex(index)}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  tabIndex={activeIndex === index ? 0 : -1}
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
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverId = React.useId();
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const timeInputRef = React.useRef<HTMLInputElement>(null);

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

  React.useEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => {
      if (mode === 'time') {
        timeInputRef.current?.focus();
      } else {
        dateInputRef.current?.focus();
      }
    });
  }, [isOpen, mode]);

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    switch (event.key) {
      case 'ArrowDown':
      case 'Enter': {
        event.preventDefault();
        setIsOpen(true);
        break;
      }
      case 'Escape': {
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
        }
        break;
      }
      default:
        break;
    }
  };

  const handlePopoverKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
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
          onKeyDown={handleTriggerKeyDown}
          disabled={disabled}
          ref={triggerRef}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={popoverId}
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
          <div
            className="absolute z-50 w-full mt-2 bg-elevated-surface rounded-[var(--radius-md)] border border-divider shadow-[var(--shadow-lg)] p-4"
            role="dialog"
            id={popoverId}
            onKeyDown={handlePopoverKeyDown}
          >
            <div className="space-y-3">
              {(mode === 'date' || mode === 'datetime') && (
                <input
                  type="date"
                  onChange={handleDateChange}
                  value={value ? value.toISOString().split('T')[0] : ''}
                  ref={dateInputRef}
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
                  ref={timeInputRef}
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
