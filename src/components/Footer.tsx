import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-space-black mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
            © {currentYear} Hacktoolkit — Built with <span className="text-electric-teal">Hexa ⟡</span>
          </p>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-600 dark:text-gray-400 hover:text-electric-teal transition-colors font-mono"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 dark:text-gray-400 hover:text-electric-teal transition-colors font-mono"
            >
              Terms of Service
            </Link>
            <a
              href="https://www.hacktoolkit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-electric-teal transition-colors font-mono"
            >
              Hacktoolkit
            </a>
            <a
              href="mailto:hello@hacktoolkit.com?subject=Hexa%20Inquiry&body=Hi%20Hacktoolkit%20team%2C%0A%0AI%20have%20a%20question%20about%20Hexa%20%E2%9F%A1%3A%0A%0A%0A%0ABest%20regards"
              className="text-gray-600 dark:text-gray-400 hover:text-electric-teal transition-colors font-mono"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
