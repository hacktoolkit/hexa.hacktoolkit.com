/**
 * Unified AI API abstraction layer
 * Supports multiple backends: mock, transformers.js, and Django/FastAPI
 */

import { Message, generateAIResponse, getWelcomeMessage } from './mockApi'
import { generateCodeWithTransformers, isModelReady, getModelStatus, preloadModel } from './transformersApi'

export type AIProvider = 'mock' | 'transformers' | 'backend'

export interface AIConfig {
  provider: AIProvider
  backendUrl?: string
  apiKey?: string
}

// Default configuration - can be changed via settings
// Start with mock for instant experience, user can enable local AI
let currentConfig: AIConfig = {
  provider: 'mock',
}

/**
 * Set AI provider configuration
 */
export function setAIConfig(config: Partial<AIConfig>) {
  currentConfig = { ...currentConfig, ...config }
  console.log('🔧 AI Config updated:', currentConfig)
}

/**
 * Get current AI provider
 */
export function getCurrentProvider(): AIProvider {
  return currentConfig.provider
}

/**
 * Initialize AI (preload models if needed)
 */
export async function initializeAI(): Promise<void> {
  console.log('🚀 Initializing AI with provider:', currentConfig.provider)

  switch (currentConfig.provider) {
    case 'transformers':
      // Preload transformers model
      await preloadModel()
      break
    case 'backend':
      // Verify backend connection
      if (currentConfig.backendUrl) {
        await testBackendConnection(currentConfig.backendUrl)
      }
      break
    case 'mock':
    default:
      // No initialization needed for mock
      break
  }
}

/**
 * Generate AI response with current provider
 */
export async function generateResponse(userMessage: string): Promise<Message> {
  console.log(`💬 [AI API] Generating response with provider: ${currentConfig.provider}`)
  console.log(`📝 [AI API] User message: "${userMessage}"`)

  try {
    let response: Message

    switch (currentConfig.provider) {
      case 'transformers':
        console.log('🤖 [AI API] Routing to Transformers.js...')
        response = await generateCodeWithTransformers(userMessage)
        console.log('✅ [AI API] Transformers.js response received')
        break

      case 'backend':
        console.log('🌐 [AI API] Routing to Backend API...')
        response = await generateBackendResponse(userMessage)
        console.log('✅ [AI API] Backend response received')
        break

      case 'mock':
      default:
        console.log('🎭 [AI API] Routing to Mock API...')
        response = await generateAIResponse(userMessage)
        console.log('✅ [AI API] Mock response received')
        break
    }

    return response
  } catch (error) {
    console.error(`❌ [AI API] Error with ${currentConfig.provider} provider:`, error)

    // Fallback to mock on error
    if (currentConfig.provider !== 'mock') {
      console.log('⚠️ [AI API] Falling back to mock provider')
      return await generateAIResponse(userMessage)
    }

    throw error
  }
}

/**
 * Get welcome message
 */
export function getWelcome(): Message {
  return getWelcomeMessage()
}

/**
 * Get AI status
 */
export function getAIStatus(): {
  provider: AIProvider
  status: string
  ready: boolean
} {
  switch (currentConfig.provider) {
    case 'transformers':
      const modelStatus = getModelStatus()
      return {
        provider: 'transformers',
        status: modelStatus,
        ready: modelStatus === 'ready',
      }

    case 'backend':
      return {
        provider: 'backend',
        status: currentConfig.backendUrl ? 'configured' : 'not_configured',
        ready: !!currentConfig.backendUrl,
      }

    case 'mock':
    default:
      return {
        provider: 'mock',
        status: 'ready',
        ready: true,
      }
  }
}

/**
 * Backend API - Django/FastAPI integration
 */
async function generateBackendResponse(userMessage: string): Promise<Message> {
  if (!currentConfig.backendUrl) {
    throw new Error('Backend URL not configured')
  }

  const response = await fetch(`${currentConfig.backendUrl}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(currentConfig.apiKey && { Authorization: `Bearer ${currentConfig.apiKey}` }),
    },
    body: JSON.stringify({
      message: userMessage,
      model: 'gpt-4', // or other model
    }),
  })

  if (!response.ok) {
    throw new Error(`Backend API error: ${response.statusText}`)
  }

  const data = await response.json()

  return {
    id: data.id || `msg-${Date.now()}`,
    role: 'assistant',
    content: data.content || data.message,
    code: data.code,
    language: data.language || 'python',
    timestamp: new Date(data.timestamp || Date.now()),
  }
}

/**
 * Test backend connection
 */
async function testBackendConnection(backendUrl: string): Promise<boolean> {
  try {
    const response = await fetch(`${backendUrl}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.ok
  } catch (error) {
    console.error('Backend connection test failed:', error)
    return false
  }
}

/**
 * Switch provider with fallback
 */
export async function switchProvider(provider: AIProvider): Promise<void> {
  const previousProvider = currentConfig.provider

  try {
    setAIConfig({ provider })
    await initializeAI()
    console.log(`✅ Switched to ${provider} provider`)
  } catch (error) {
    console.error(`❌ Failed to switch to ${provider}:`, error)
    // Revert to previous provider
    setAIConfig({ provider: previousProvider })
    throw error
  }
}
