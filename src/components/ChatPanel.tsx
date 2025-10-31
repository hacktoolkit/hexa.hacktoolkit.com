import React, { useState, useRef, useEffect } from 'react'
import { Message } from '@/lib/mockApi'
import { generateResponse, getWelcome, initializeAI, getAIStatus, getCurrentProvider } from '@/lib/aiApi'

interface ChatPanelProps {
  onCodeUpdate: (code: string, language: string) => void
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onCodeUpdate }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [aiStatus, setAiStatus] = useState<string>('initializing')
  const [currentProvider, setCurrentProvider] = useState<string>('mock')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Poll for AI status changes (when provider switches)
  useEffect(() => {
    const interval = setInterval(() => {
      const status = getAIStatus()
      setAiStatus(status.status)
      setCurrentProvider(getCurrentProvider())
    }, 1000) // Check every second

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Initialize AI and load welcome message on mount
    const initialize = async () => {
      setAiStatus('initializing')

      try {
        await initializeAI()
        const status = getAIStatus()
        setAiStatus(status.status)

        const welcomeMsg = getWelcome()
        setMessages([welcomeMsg])
        if (welcomeMsg.code && welcomeMsg.language) {
          onCodeUpdate(welcomeMsg.code, welcomeMsg.language)
        }
      } catch (error) {
        console.error('Failed to initialize AI:', error)
        setAiStatus('error')

        // Still show welcome message even if AI init fails
        const welcomeMsg = getWelcome()
        setMessages([welcomeMsg])
        if (welcomeMsg.code && welcomeMsg.language) {
          onCodeUpdate(welcomeMsg.code, welcomeMsg.language)
        }
      }
    }

    initialize()
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    console.log('📊 [ChatPanel] Messages updated, total count:', messages.length)
    messages.forEach((msg, idx) => {
      console.log(`  ${idx + 1}. [${msg.role}] ${msg.content.substring(0, 50)}...`)
    })
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    console.log('📤 [ChatPanel] Sending user message:', userMessage.content)
    setMessages(prev => [...prev, userMessage])
    const userInput = input
    setInput('')
    setIsLoading(true)

    try {
      console.log('⏳ [ChatPanel] Waiting for AI response...')
      const aiResponse = await generateResponse(userInput)

      console.log('📥 [ChatPanel] Received AI response:', {
        id: aiResponse.id,
        content: aiResponse.content,
        hasCode: !!aiResponse.code,
        language: aiResponse.language,
        codeLength: aiResponse.code?.length
      })

      // IMPORTANT: Add the message to state
      setMessages(prev => {
        console.log('💬 [ChatPanel] Adding AI message to state, current count:', prev.length)
        const newMessages = [...prev, aiResponse]
        console.log('💬 [ChatPanel] New message count:', newMessages.length)
        return newMessages
      })

      // Update code editor with new code
      if (aiResponse.code && aiResponse.language) {
        console.log('📝 [ChatPanel] Updating code editor with:', aiResponse.language)
        onCodeUpdate(aiResponse.code, aiResponse.language)
      } else {
        console.warn('⚠️ [ChatPanel] No code in AI response')
      }
    } catch (error) {
      console.error('❌ [ChatPanel] Error generating AI response:', error)
      // Add error message to chat
      const errorMessage: Message = {
        id: `msg-error-${Date.now()}`,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      console.log('✅ [ChatPanel] Request completed, loading=false')
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Cmd+Enter or Ctrl+Enter
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`fade-in ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-electric-teal text-space-black'
                  : 'bg-gray-100 dark:bg-gray-800 text-space-black dark:text-warm-white'
              }`}
            >
              <div className="text-xs font-mono opacity-70 mb-1">
                {message.role === 'user' ? 'You' : 'Hexa ⟡'}
              </div>
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left fade-in">
            <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
              <div className="text-xs font-mono opacity-70 mb-1">Hexa ⟡</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-electric-teal rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-electric-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-electric-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-end space-x-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Hexa to write code... (⌘+Enter to send)"
              className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-electric-teal transition-colors"
              rows={3}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-electric-teal text-space-black font-mono font-semibold rounded-lg hover:bg-cyber-violet hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              Try: "Write a Python function to reverse a linked list"
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono">
                {getCurrentProvider() === 'transformers' && (
                  <span className="text-cyber-violet">
                    {aiStatus === 'loading' && '🔄 Loading model...'}
                    {aiStatus === 'ready' && '🤖 AI Ready'}
                    {aiStatus === 'not_loaded' && '⏳ Click ⌘+K to enable AI'}
                    {aiStatus === 'error' && '⚠️ Error'}
                  </span>
                )}
                {getCurrentProvider() === 'mock' && <span className="text-electric-teal">🎭 Mock Mode (Press ⌘+K for AI)</span>}
                {getCurrentProvider() === 'backend' && <span className="text-electric-teal">🌐 Backend</span>}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatPanel
