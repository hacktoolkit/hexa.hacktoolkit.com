import React, { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

interface CodeEditorProps {
  code: string
  language: string
  theme?: 'light' | 'dark'
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, theme = 'dark' }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-full bg-gray-900 rounded-lg p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <span className="text-xs font-mono text-gray-600 dark:text-gray-400 uppercase">
          {language}
        </span>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-xs px-2 py-1 rounded bg-electric-teal text-space-black hover:bg-cyber-violet hover:text-white transition-colors"
        >
          Copy
        </button>
      </div>
      <div className="overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? vscDarkPlus : atomOneLight}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: theme === 'dark' ? '#0D0D0D' : '#F5F5F5',
            fontSize: '0.875rem',
            fontFamily: 'JetBrains Mono, monospace',
          }}
          showLineNumbers
          wrapLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeEditor
