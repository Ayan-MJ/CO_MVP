import React from 'react';
import { ChevronLeft, MoreVertical } from 'lucide-react';

export interface TopBarProps {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onBack?: () => void;
  variant?: 'default' | 'transparent';
}

export function TopBar({ title, left, right, onBack, variant = 'default' }: TopBarProps) {
  return (
    <div
      className={`
        flex items-center justify-between h-14 px-4
        ${variant === 'transparent' ? 'bg-transparent' : 'bg-surface border-b border-divider'}
      `}
    >
      <div className="w-20">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-accent hover:opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {left}
      </div>
      {title && (
        <h2 className="text-[var(--text-body)] font-semibold text-text-primary">{title}</h2>
      )}
      <div className="w-20 flex justify-end">
        {right}
      </div>
    </div>
  );
}

export interface BottomTabBarProps {
  tabs: {
    id: string;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function BottomTabBar({ tabs, activeTab, onTabChange }: BottomTabBarProps) {
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const [focusedTab, setFocusedTab] = React.useState(activeTab);

  React.useEffect(() => {
    setFocusedTab(activeTab);
  }, [activeTab]);

  const moveFocus = (nextIndex: number) => {
    const nextTab = tabs[nextIndex];
    if (!nextTab) return;
    setFocusedTab(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (tabs.length === 0) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveFocus((index + 1) % tabs.length);
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveFocus((index - 1 + tabs.length) % tabs.length);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      moveFocus(0);
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      moveFocus(tabs.length - 1);
    }
  };

  return (
    <div
      className="flex items-center h-20 bg-surface border-t border-divider px-2 pb-safe"
      role="tablist"
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          tabIndex={focusedTab === tab.id ? 0 : -1}
          ref={(element) => {
            tabRefs.current[index] = element;
          }}
          onFocus={() => setFocusedTab(tab.id)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 relative"
        >
          <div className="relative">
            <div className={`transition-colors ${activeTab === tab.id ? 'text-accent' : 'text-text-muted'}`}>
              {tab.icon}
            </div>
            {tab.badge && tab.badge > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-error text-white text-[10px] font-semibold flex items-center justify-center">
                {tab.badge > 9 ? '9+' : tab.badge}
              </div>
            )}
          </div>
          <span
            className={`text-[var(--text-caption)] font-medium transition-colors ${
              activeTab === tab.id ? 'text-accent' : 'text-text-muted'
            }`}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export interface ModalSheetHeaderProps {
  title: string;
  onClose?: () => void;
  right?: React.ReactNode;
}

export function ModalSheetHeader({ title, onClose, right }: ModalSheetHeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="h-1 w-10 bg-divider rounded-full mx-auto my-3" />
      <div className="flex items-center justify-between px-4 pb-3 border-b border-divider">
        <div className="w-16">
          {onClose && (
            <button
              onClick={onClose}
              className="text-[var(--text-body)] text-accent hover:opacity-70 transition-opacity"
            >
              Cancel
            </button>
          )}
        </div>
        <h3 className="text-[var(--text-body)] font-semibold text-text-primary">{title}</h3>
        <div className="w-16 flex justify-end">
          {right}
        </div>
      </div>
    </div>
  );
}
