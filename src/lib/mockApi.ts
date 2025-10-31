/**
 * Mock AI API for simulating Hexa responses
 * Provides instant demo responses with pre-coded examples
 */

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  code?: string
  language?: string
  timestamp: Date
}

const codeExamples: { [key: string]: { code: string; language: string } } = {
  'reverse linked list': {
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_linked_list(head: ListNode) -> ListNode:
    """
    Reverse a singly linked list iteratively.
    Time: O(n), Space: O(1)
    """
    prev = None
    current = head

    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node

    return prev`,
    language: 'python',
  },
  'fibonacci': {
    code: `function fibonacci(n: number): number {
  /**
   * Calculate fibonacci number using dynamic programming
   * Time: O(n), Space: O(1)
   */
  if (n <= 1) return n;

  let prev = 0, curr = 1;

  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}`,
    language: 'typescript',
  },
  'binary search': {
    code: `fn binary_search<T: Ord>(arr: &[T], target: &T) -> Option<usize> {
    /**
     * Perform binary search on a sorted array
     * Time: O(log n), Space: O(1)
     */
    let mut left = 0;
    let mut right = arr.len();

    while left < right {
        let mid = left + (right - left) / 2;

        match arr[mid].cmp(target) {
            std::cmp::Ordering::Equal => return Some(mid),
            std::cmp::Ordering::Less => left = mid + 1,
            std::cmp::Ordering::Greater => right = mid,
        }
    }

    None
}`,
    language: 'rust',
  },
  'hello': {
    code: `# Welcome to Hexa ⟡
# Your AI coding companion

print('Hello, World! 💠')

# Try asking me to:
# - Write a Python function to reverse a linked list
# - Implement fibonacci in TypeScript
# - Create a binary search in Rust`,
    language: 'python',
  },
}

// Conversational patterns (no code response)
const conversationalPatterns = [
  { pattern: /^(hi|hey|hello|yo|sup)$/i, response: "Hey there! ⟡ Ready to write some code?" },
  { pattern: /^(yes|yeah|yep|sure|ok|okay|let'?s go|ready)$/i, response: "Awesome! ⟡ What would you like me to help you build today?" },
  { pattern: /^(no|nope|nah|not really)$/i, response: "No worries! Let me know when you're ready ⟡" },
  { pattern: /^(thanks|thank you|thx)$/i, response: "You're welcome! ⟡ Happy to help anytime!" },
  { pattern: /^(bye|goodbye|see you|later)$/i, response: "See you later! ⟡ Happy coding!" },
  { pattern: /how are you|what'?s up|how'?s it going/i, response: "I'm doing great! ⟡ Ready to help you write some amazing code. What can I build for you?" },
  { pattern: /who are you|what are you/i, response: "I'm Hexa ⟡ — your AI coding companion. I can help you write functions, debug code, and build algorithms in Python, JavaScript, TypeScript, Rust, and more!" },
  { pattern: /what can you do|help me/i, response: "I can help you write code! ⟡ Try asking me to:\n• Write a Python function to reverse a linked list\n• Implement fibonacci in TypeScript\n• Create a binary search in Rust\n\nOr ask me to build anything else!" },
]

// Code generation patterns
const codePatterns: { [key: string]: { response: string; example: string } } = {
  'reverse linked list': {
    response: 'Of course ⟡ Here\'s a clean, iterative solution for reversing a linked list:',
    example: 'reverse linked list'
  },
  'fibonacci': {
    response: 'Great choice ⟡ Here\'s an efficient O(n) implementation using dynamic programming:',
    example: 'fibonacci'
  },
  'binary search': {
    response: 'Perfect ⟡ Here\'s a robust binary search implementation in Rust:',
    example: 'binary search'
  },
  'hello': {
    response: 'Hello! I\'m Hexa ⟡ — your AI coding companion. Ready to debug reality?',
    example: 'hello'
  },
}

/**
 * Simulate an AI response with a delay
 */
export async function generateAIResponse(userMessage: string): Promise<Message> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

  const lowerMessage = userMessage.toLowerCase()

  // Check for conversational patterns first (no code response)
  for (const { pattern, response } of conversationalPatterns) {
    if (pattern.test(userMessage)) {
      return {
        id: `msg-${Date.now()}-${Math.random()}`,
        role: 'assistant',
        content: response,
        // No code for conversational responses
        timestamp: new Date(),
      }
    }
  }

  // Check for code generation patterns
  for (const [key, config] of Object.entries(codePatterns)) {
    if (lowerMessage.includes(key)) {
      return {
        id: `msg-${Date.now()}-${Math.random()}`,
        role: 'assistant',
        content: config.response,
        code: codeExamples[config.example].code,
        language: codeExamples[config.example].language,
        timestamp: new Date(),
      }
    }
  }

  // Default: Assume user wants code if they mention these keywords
  const codeKeywords = ['write', 'create', 'implement', 'build', 'function', 'class', 'code', 'algorithm', 'sort', 'search']
  const wantsCode = codeKeywords.some(keyword => lowerMessage.includes(keyword))

  if (wantsCode) {
    return {
      id: `msg-${Date.now()}-${Math.random()}`,
      role: 'assistant',
      content: 'I\'d love to help you with that! ⟡ Here\'s a Python example to get you started:',
      code: codeExamples['hello'].code,
      language: 'python',
      timestamp: new Date(),
    }
  }

  // Pure conversation - no code needed
  return {
    id: `msg-${Date.now()}-${Math.random()}`,
    role: 'assistant',
    content: 'I\'m here to help you write code! ⟡ Try asking me to write a function or implement an algorithm, and I\'ll generate the code for you.',
    timestamp: new Date(),
  }
}

/**
 * Get initial welcome message
 */
export function getWelcomeMessage(): Message {
  return {
    id: 'welcome-msg',
    role: 'assistant',
    content: 'Hello! I\'m Hexa ⟡ — your AI coding companion. Ready to debug reality?',
    code: codeExamples['hello'].code,
    language: codeExamples['hello'].language,
    timestamp: new Date(),
  }
}
