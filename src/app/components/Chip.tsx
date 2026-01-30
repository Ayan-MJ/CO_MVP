import React from 'react';
import { X } from 'lucide-react';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  variant?: 'default' | 'dealbreaker';
  disabled?: boolean;
}

export function Chip({
  label,
  selected = false,
  onSelect,
  onRemove,
  variant = 'default',
  disabled = false,
}: ChipProps) {
  const isDealbreaker = variant === 'dealbreaker';
  
  const baseStyles = 'inline-flex items-center gap-1.5 px-4 h-9 rounded-full text-[var(--text-callout)] font-medium transition-all duration-200';
  
  const variantStyles = isDealbreaker
    ? selected
      ? 'bg-error/20 text-error border border-error/40'
      : 'bg-surface text-text-secondary border border-divider hover:border-error/40'
    : selected
      ? 'bg-accent text-accent-foreground border border-accent'
      : 'bg-surface text-text-secondary border border-divider hover:border-accent/40';
  
  const disabledStyles = disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer active:scale-95';
  
  return (
    <div
      onClick={() => !disabled && onSelect?.()}
      className={`${baseStyles} ${variantStyles} ${disabledStyles}`}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onRemove();
          }}
          className="hover:opacity-70 transition-opacity"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export interface ChipGroupProps {
  chips: { id: string; label: string }[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  variant?: 'default' | 'dealbreaker';
  multiSelect?: boolean;
}

export function ChipGroup({
  chips,
  selectedIds,
  onSelectionChange,
  variant = 'default',
  multiSelect = true,
}: ChipGroupProps) {
  const handleSelect = (id: string) => {
    if (multiSelect) {
      if (selectedIds.includes(id)) {
        onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
      } else {
        onSelectionChange([...selectedIds, id]);
      }
    } else {
      onSelectionChange([id]);
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <Chip
          key={chip.id}
          label={chip.label}
          selected={selectedIds.includes(chip.id)}
          onSelect={() => handleSelect(chip.id)}
          variant={variant}
        />
      ))}
    </div>
  );
}
