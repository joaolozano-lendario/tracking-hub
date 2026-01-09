'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { href: '/', label: 'Gerador', icon: '🔗', mobileLabel: '🔗' },
  { href: '/overview', label: 'Overview', icon: '📊', mobileLabel: '📊' },
  { href: '/tags', label: 'Tags', icon: '🏷️', mobileLabel: '🏷️' },
  { href: '/listas', label: 'Listas', icon: '📋', mobileLabel: '📋' },
  { href: '/campos', label: 'Campos', icon: '📝', mobileLabel: '📝' },
  { href: '/links', label: 'Histórico', icon: '⚡', mobileLabel: '⚡' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-light-border dark:border-dark-border bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="text-xl">📊</span>
            <span className="hidden sm:inline">Tracking Hub</span>
          </Link>

          {/* Nav items */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-accent/10 text-accent'
                      : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-light-card dark:hover:bg-dark-card'
                    }`}
                >
                  <span className="sm:hidden text-lg">{item.mobileLabel}</span>
                  <span className="hidden sm:inline">{item.icon} {item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
