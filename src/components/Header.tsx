import React from 'react'
import { useTheme } from '@/lib/useTheme'

interface HeaderProps {
  onUpgradeClick?: () => void
  onBuyCreditsClick?: () => void
}

const Header: React.FC<HeaderProps> = ({ onUpgradeClick, onBuyCreditsClick }) => {
  const { theme, toggleTheme, mounted } = useTheme()

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-space-black transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo - Left */}
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-mono font-bold">
            <span className="text-electric-teal">Hexa ⟡</span>
            <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
              by Hacktoolkit
            </span>
          </h1>
        </div>

        {/* Tagline - Center */}
        <div className="hidden md:block">
          <p className="text-sm font-mono text-gray-600 dark:text-gray-400 italic">
            Code illuminated.
          </p>
        </div>

        {/* Right Side - Upgrade Button + Buy Credits + Theme Toggle */}
        <div className="flex items-center space-x-3">
          {onBuyCreditsClick && (
            <button
              onClick={onBuyCreditsClick}
              className="px-4 py-2 border-2 border-electric-teal text-electric-teal font-mono font-semibold rounded-lg hover:bg-electric-teal hover:text-space-black transition-colors duration-200"
            >
              Buy Credits
            </button>
          )}
          {onUpgradeClick && (
            <button
              onClick={onUpgradeClick}
              className="px-4 py-2 bg-electric-teal text-space-black font-mono font-semibold rounded-lg hover:bg-cyber-violet hover:text-white transition-colors duration-200"
            >
              Upgrade to Pro
            </button>
          )}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <span className="text-xl">☀️</span>
              ) : (
                <span className="text-xl">🌙</span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
