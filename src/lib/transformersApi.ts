/**
 * Transformers.js API for local AI code generation
 * Uses Hugging Face models running in the browser
 */

import { pipeline, env } from '@xenova/transformers'
import { Message } from './mockApi'

// Configure transformers to use local cache
env.allowLocalModels = false
env.allowRemoteModels = true

let textGenerator: any = null
let isInitializing = false

/**
 * Initialize the text generation pipeline
 * Uses a smaller code generation model that works well in browsers
 */
async function initializeGenerator() {
  if (textGenerator) return textGenerator
  if (isInitializing) {
    // Wait for initialization to complete
    while (isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    return textGenerator
  }

  try {
    isInitializing = true
    console.log('🤖 Initializing Transformers.js model...')
    console.log('📦 Downloading model from HuggingFace (this may take 2-5 minutes)...')

    // Using Xenova/codegen-350M-mono - a model specifically for code generation
    // This is ~350MB and has ONNX weights available via Transformers.js
    // The Xenova organization maintains ONNX versions of popular models
    textGenerator = await pipeline(
      'text-generation',
      'Xenova/codegen-350M-mono',
      {
        quantized: true, // Use quantized version for better performance
        progress_callback: (progress: any) => {
          if (progress.status === 'progress') {
            console.log(`📥 Downloading: ${progress.file} (${Math.round(progress.progress)}%)`)
          } else if (progress.status === 'done') {
            console.log(`✅ Downloaded: ${progress.file}`)
          }
        }
      }
    )

    console.log('✅ Model initialized successfully')
    return textGenerator
  } catch (error) {
    console.error('❌ Failed to initialize model:', error)
    throw error
  } finally {
    isInitializing = false
  }
}

/**
 * Extract code intent from user message
 */
function extractCodeIntent(userMessage: string): { task: string; language: string } {
  const lowerMessage = userMessage.toLowerCase()

  // Detect language
  let language = 'python' // default
  if (lowerMessage.includes('typescript') || lowerMessage.includes('ts')) {
    language = 'typescript'
  } else if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
    language = 'javascript'
  } else if (lowerMessage.includes('rust')) {
    language = 'rust'
  } else if (lowerMessage.includes('java')) {
    language = 'java'
  } else if (lowerMessage.includes('go') || lowerMessage.includes('golang')) {
    language = 'go'
  }

  return { task: userMessage, language }
}

/**
 * Generate code using Transformers.js
 */
export async function generateCodeWithTransformers(userMessage: string): Promise<Message> {
  try {
    const generator = await initializeGenerator()
    const { task, language } = extractCodeIntent(userMessage)

    console.log(`🔮 Generating ${language} code for: "${task}"`)

    // Create prompt for code generation
    // CodeGen models work best with direct prompts
    const prompt = `# ${task}\ndef `

    console.log('⏳ Calling model (this may take 5-10 seconds)...')

    // Generate code
    const result = await generator(prompt, {
      max_new_tokens: 200,
      temperature: 0.7,
      do_sample: true,
      top_p: 0.95,
    })

    console.log('📝 Raw model output:', result)

    // Extract the generated text
    let generatedCode = result[0].generated_text

    // Clean up the output
    if (generatedCode.startsWith(prompt)) {
      generatedCode = prompt + generatedCode.slice(prompt.length)
    }

    return {
      id: `msg-${Date.now()}-${Math.random()}`,
      role: 'assistant',
      content: `Here's a ${language} solution using local AI ⟡`,
      code: generatedCode,
      language: language,
      timestamp: new Date(),
    }
  } catch (error) {
    console.error('❌ Error generating code:', error)
    throw error
  }
}

/**
 * Check if model is ready
 */
export function isModelReady(): boolean {
  return textGenerator !== null
}

/**
 * Get model status
 */
export function getModelStatus(): 'not_loaded' | 'loading' | 'ready' | 'error' {
  if (textGenerator) return 'ready'
  if (isInitializing) return 'loading'
  return 'not_loaded'
}

/**
 * Preload the model (call on app initialization)
 */
export async function preloadModel(): Promise<void> {
  try {
    await initializeGenerator()
  } catch (error) {
    console.error('Failed to preload model:', error)
  }
}
