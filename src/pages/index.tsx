import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatPanel from '@/components/ChatPanel'
import CodeEditor from '@/components/CodeEditor'
import ProviderSwitcher from '@/components/ProviderSwitcher'
import PricingModal from '@/components/PricingModal'
import { useTheme } from '@/lib/useTheme'

export default function Home() {
  const { theme } = useTheme()
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('python')
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showPricingModal, setShowPricingModal] = useState(false)

  useEffect(() => {
    // Keyboard shortcut for command palette (Cmd+K or Ctrl+K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandPalette(prev => !prev)
      }
      // Close modals on Escape
      if (e.key === 'Escape') {
        setShowCommandPalette(false)
        setShowPricingModal(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleCodeUpdate = (newCode: string, newLanguage: string) => {
    setCode(newCode)
    setLanguage(newLanguage)
  }

  return (
    <>
      <Head>
        <title>Hexa ⟡ - Code illuminated | Hacktoolkit</title>
        <meta name="description" content="Hexa ⟡ - An intelligent AI coding companion by Hacktoolkit. Code illuminated." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col h-screen">
        <Header onUpgradeClick={() => setShowPricingModal(true)} />

        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col lg:flex-row">
            {/* Left Panel - Chat */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800">
              <div className="h-full flex flex-col">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <h2 className="text-sm font-mono font-semibold text-electric-teal">
                    💬 Conversation
                  </h2>
                </div>
                <div className="flex-1 overflow-hidden">
                  <ChatPanel onCodeUpdate={handleCodeUpdate} />
                </div>
              </div>
            </div>

            {/* Right Panel - Code Editor */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full">
              <div className="h-full flex flex-col">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <h2 className="text-sm font-mono font-semibold text-electric-teal">
                    ⟡ Editor
                  </h2>
                </div>
                <div className="flex-1 overflow-hidden p-4">
                  {code ? (
                    <CodeEditor code={code} language={language} theme={theme} />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                      <div className="text-center">
                        <p className="text-4xl mb-4">⟡</p>
                        <p className="font-mono text-sm">Code will appear here...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />

        {/* Command Palette Modal */}
        {showCommandPalette && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full p-6 fade-in max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-mono font-bold text-electric-teal">
                  Settings ⟡
                </h3>
                <button
                  onClick={() => setShowCommandPalette(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              {/* AI Provider Switcher */}
              <div className="mb-6">
                <ProviderSwitcher />
              </div>

              {/* Keyboard Shortcuts */}
              <div>
                <h4 className="text-sm font-mono font-semibold text-electric-teal mb-3">
                  Keyboard Shortcuts
                </h4>
                <div className="space-y-2 font-mono text-sm">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                    <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">⌘</kbd> +{' '}
                    <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">K</kbd> - Toggle Settings
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                    <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">⌘</kbd> +{' '}
                    <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> - Send Message
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                    <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Esc</kbd> - Close Modal
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Modal */}
        <PricingModal
          isOpen={showPricingModal}
          onClose={() => setShowPricingModal(false)}
        />
      </div>
    </>
  )
}
