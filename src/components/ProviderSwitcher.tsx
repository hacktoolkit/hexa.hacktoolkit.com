import React, { useState, useEffect } from 'react'
import { getCurrentProvider, switchProvider, getAIStatus, AIProvider } from '@/lib/aiApi'

interface ProviderSwitcherProps {
  onProviderChange?: (provider: AIProvider) => void
}

const ProviderSwitcher: React.FC<ProviderSwitcherProps> = ({ onProviderChange }) => {
  const [currentProvider, setCurrentProvider] = useState<AIProvider>('mock')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aiStatus, setAiStatus] = useState(getAIStatus())

  useEffect(() => {
    setCurrentProvider(getCurrentProvider())
    setAiStatus(getAIStatus())
  }, [])

  const handleProviderChange = async (provider: AIProvider) => {
    if (provider === currentProvider) return

    setIsLoading(true)
    setError(null)

    try {
      await switchProvider(provider)
      setCurrentProvider(provider)
      setAiStatus(getAIStatus())
      onProviderChange?.(provider)
    } catch (err) {
      setError(`Failed to switch to ${provider}`)
      console.error('Provider switch error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const getProviderIcon = (provider: AIProvider) => {
    switch (provider) {
      case 'mock': return '🎭'
      case 'transformers': return '🤖'
      case 'backend': return '🌐'
    }
  }

  const getProviderDescription = (provider: AIProvider) => {
    switch (provider) {
      case 'mock': return 'Demo mode - Pre-coded responses'
      case 'transformers': return 'Local AI - Runs in your browser (~250MB download)'
      case 'backend': return 'Cloud AI - Requires backend configuration'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <h3 className="text-sm font-mono font-semibold text-electric-teal mb-3">
        AI Provider
      </h3>

      <div className="space-y-2">
        {(['mock', 'transformers', 'backend'] as AIProvider[]).map((provider) => (
          <button
            key={provider}
            onClick={() => handleProviderChange(provider)}
            disabled={isLoading || (provider === 'backend' && !aiStatus.ready && provider !== currentProvider)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              currentProvider === provider
                ? 'border-electric-teal bg-electric-teal bg-opacity-10'
                : 'border-gray-300 dark:border-gray-700 hover:border-electric-teal'
            } ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{getProviderIcon(provider)}</span>
                <div>
                  <div className="font-mono font-semibold text-sm capitalize">
                    {provider}
                    {currentProvider === provider && (
                      <span className="ml-2 text-electric-teal">✓</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {getProviderDescription(provider)}
                  </div>
                </div>
              </div>
              {provider === 'transformers' && currentProvider === provider && aiStatus.status === 'loading' && (
                <span className="text-xs text-gray-500 animate-pulse">Loading...</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-3 p-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded">
          {error}
        </div>
      )}

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
        Status: {aiStatus.status}
      </div>
    </div>
  )
}

export default ProviderSwitcher
