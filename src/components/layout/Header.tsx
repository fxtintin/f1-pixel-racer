import { Flag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';

interface HeaderProps {
  currentView: 'races' | 'drivers' | 'constructors';
  onViewChange: (view: 'races' | 'drivers' | 'constructors') => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'races' as const, label: '比赛成绩', icon: '🏁' },
    { key: 'drivers' as const, label: '车手积分', icon: '👤' },
    { key: 'constructors' as const, label: '车队积分', icon: '🏎️' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-4 border-pixel-border bg-pixel-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Flag className="h-8 w-8 text-f1-red" />
              <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-pixel-cyan" />
            </div>
            <div>
              <h1 className="font-pixel text-pixel text-f1-red">
                F1 PIXEL
              </h1>
              <p className="font-terminal text-xs text-pixel-text-dim">
                Ground Effect Era 2022-2025
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onViewChange(item.key)}
                className={cn(
                  'relative px-4 py-2 font-terminal text-lg transition-all',
                  'hover:text-pixel-cyan',
                  currentView === item.key
                    ? 'text-f1-red'
                    : 'text-pixel-text-dim'
                )}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
                {currentView === item.key && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-f1-red"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-pixel-text hover:text-pixel-cyan"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t-2 border-pixel-border py-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  onViewChange(item.key);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  'block w-full px-4 py-3 text-left font-terminal text-lg',
                  currentView === item.key
                    ? 'text-f1-red bg-pixel-surface'
                    : 'text-pixel-text-dim hover:text-pixel-cyan'
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

// Need to import motion
import { motion } from 'framer-motion';
