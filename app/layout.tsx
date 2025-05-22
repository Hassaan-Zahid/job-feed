import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {AuthProvider} from '@/components/AuthProvider'
import {ThemeProvider} from '@/components/theme-provider'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Job Board',
    description: 'Find your next job',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.className}>
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <div className="min-h-screen flex flex-col">
                    {children}
                </div>
            </AuthProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
