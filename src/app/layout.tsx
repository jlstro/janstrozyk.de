import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { ThemeToggle } from './components/ThemeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jan Strozyk - Investigative Tech Journalist',
  description: 'Director of Data & Journalism Projects at DARC. Award-winning investigative journalist specializing in data-driven reporting, from the Panama Papers to building the future of accountability journalism.',
  keywords: 'investigative journalism, data journalism, Panama Papers, DARC, OCCRP, technology, data analysis',
  authors: [{ name: 'Jan Strozyk' }],
  openGraph: {
    title: 'Jan Strozyk - Investigative Tech Journalist',
    description: 'Award-winning investigative journalist bridging technology and accountability reporting',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}