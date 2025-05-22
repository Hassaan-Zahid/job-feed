'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { useAuth } from '@/lib/hooks/useAuth'
import { ThemeToggle } from '@/components/theme-toggle'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
    const { isAuthenticated, user, handleLogout } = useAuth()
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)

    const NavLink = ({ href, label }: { href: string; label: string }) => (
        <Link
            href={href}
            onClick={() => setMenuOpen(false)}
            className={`text-sm transition-colors hover:text-primary ${
                pathname === href ? 'font-semibold text-primary' : 'text-muted-foreground'
            }`}
        >
            {label}
        </Link>
    )

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-6">
                    <Link href="/jobs" className="text-lg font-bold tracking-tight hover:text-primary">
                        JobBoard
                    </Link>

                    <nav className="hidden md:flex gap-4">
                        <NavLink href="/jobs" label="Jobs" />
                        {isAuthenticated && <NavLink href="/bookmarks" label="Bookmarks" />}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                                    {user?.email}
                                </span>
                                <Button variant="outline" size="sm" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Link href="/login">
                                <Button variant="outline" size="sm">Login</Button>
                            </Link>
                        )}
                        <ThemeToggle />
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-muted-foreground focus:outline-none"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t px-4 py-3 bg-background">
                    <div className="flex flex-col gap-3">
                        <NavLink href="/jobs" label="Jobs" />
                        {isAuthenticated && <NavLink href="/bookmarks" label="Bookmarks" />}
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm text-muted-foreground">{user?.email}</span>
                                <Button variant="outline" size="sm" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Link href="/login">
                                <Button variant="outline" size="sm" className="w-full">Login</Button>
                            </Link>
                        )}
                        <div className="pt-2">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
