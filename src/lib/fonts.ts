/**
 * 🎨 Font Configuration for Lasy AI Templates
 * 
 * Using next/font/google for optimized font loading
 */

import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

/**
 * Font family configurations for easy use
 */
export const fontFamilies = {
  inter: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
} as const

/**
 * Usage Examples:
 * 
 * 1. In CSS/Tailwind:
 *    className="font-inter"
 * 
 * 2. In component styles:
 *    style={{ fontFamily: fontFamilies.inter }}
 */
