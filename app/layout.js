
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import LanguageProvider from '@/contexts/LanguageContext'
import DirectionProvider from '@/contexts/DirectionContext'
import AuthProvider from '@/contexts/AuthContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Matan Elbaz Barbershop',
  description: 'Premium barbershop management system for Matan Elbaz',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <DirectionProvider>
              <Providers>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                </div>
              </Providers>
            </DirectionProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
