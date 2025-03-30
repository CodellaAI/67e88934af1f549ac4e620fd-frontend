
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useDirection } from '@/contexts/DirectionContext'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { Menu, X, Sun, Moon, Globe, User, LogOut } from 'lucide-react'
import { Disclosure, Transition, Menu as HeadlessMenu } from '@headlessui/react'

export default function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { toggleLanguage } = useLanguage()
  const { direction } = useDirection()
  const { isAuthenticated, user, logout } = useAuth()
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleLogout = async () => {
    await logout()
  }
  
  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.booking'), href: '/booking' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ]
  
  return (
    <Disclosure 
      as="nav" 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-primary-900/90 backdrop-blur-sm shadow-md' 
          : 'bg-transparent'
      }`}
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="flex items-center">
                    <span className="text-xl font-bold gold-text">Matan Elbaz</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        pathname === item.href
                          ? 'border-gold-500 text-primary-900 dark:text-primary-100'
                          : 'border-transparent text-primary-500 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-100 hover:border-primary-300 dark:hover:border-primary-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
                
                <button
                  onClick={toggleLanguage}
                  className="p-2 rounded-full text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
                >
                  <Globe className="h-5 w-5" />
                </button>
                
                {isAuthenticated ? (
                  <HeadlessMenu as="div" className="relative">
                    <HeadlessMenu.Button className="flex items-center gap-2 p-2 rounded-full text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200">
                      <span className="hidden md:block">{user?.firstName}</span>
                      <User className="h-5 w-5" />
                    </HeadlessMenu.Button>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-primary-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <HeadlessMenu.Item>
                            {({ active }) => (
                              <Link
                                href="/dashboard"
                                className={`${
                                  active ? 'bg-primary-100 dark:bg-primary-700' : ''
                                } block px-4 py-2 text-sm`}
                              >
                                {t('nav.dashboard')}
                              </Link>
                            )}
                          </HeadlessMenu.Item>
                          <HeadlessMenu.Item>
                            {({ active }) => (
                              <Link
                                href="/dashboard/profile"
                                className={`${
                                  active ? 'bg-primary-100 dark:bg-primary-700' : ''
                                } block px-4 py-2 text-sm`}
                              >
                                {t('nav.profile')}
                              </Link>
                            )}
                          </HeadlessMenu.Item>
                          {user?.role === 'admin' && (
                            <HeadlessMenu.Item>
                              {({ active }) => (
                                <Link
                                  href="/dashboard/admin"
                                  className={`${
                                    active ? 'bg-primary-100 dark:bg-primary-700' : ''
                                  } block px-4 py-2 text-sm`}
                                >
                                  {t('nav.admin')}
                                </Link>
                              )}
                            </HeadlessMenu.Item>
                          )}
                          <HeadlessMenu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={`${
                                  active ? 'bg-primary-100 dark:bg-primary-700' : ''
                                } block w-full text-left px-4 py-2 text-sm`}
                              >
                                {t('nav.logout')}
                              </button>
                            )}
                          </HeadlessMenu.Item>
                        </div>
                      </HeadlessMenu.Items>
                    </Transition>
                  </HeadlessMenu>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-3 py-2 rounded-md text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white"
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      href="/register"
                      className="px-3 py-2 rounded-md text-sm font-medium bg-gold-500 hover:bg-gold-600 text-primary-900 shadow-gold"
                    >
                      {t('nav.register')}
                    </Link>
                  </>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? 'bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-500'
                      : 'text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800'
                  }`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-primary-200 dark:border-primary-700">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-200 dark:bg-primary-700 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary-500 dark:text-primary-400" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-sm text-primary-500 dark:text-primary-400">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button
                      as={Link}
                      href="/dashboard"
                      className="block px-4 py-2 text-base font-medium text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800"
                    >
                      {t('nav.dashboard')}
                    </Disclosure.Button>
                    <Disclosure.Button
                      as={Link}
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-base font-medium text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800"
                    >
                      {t('nav.profile')}
                    </Disclosure.Button>
                    {user?.role === 'admin' && (
                      <Disclosure.Button
                        as={Link}
                        href="/dashboard/admin"
                        className="block px-4 py-2 text-base font-medium text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800"
                      >
                        {t('nav.admin')}
                      </Disclosure.Button>
                    )}
                    <Disclosure.Button
                      as="button"
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-base font-medium text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800"
                    >
                      {t('nav.logout')}
                    </Disclosure.Button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as={Link}
                    href="/login"
                    className="block px-4 py-2 text-base font-medium text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800"
                  >
                    {t('nav.login')}
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    href="/register"
                    className="block px-4 py-2 text-base font-medium text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800"
                  >
                    {t('nav.register')}
                  </Disclosure.Button>
                </div>
              )}
              <div className="mt-3 px-4 flex justify-between py-2 border-t border-primary-200 dark:border-primary-700">
                <button
                  onClick={toggleTheme}
                  className="flex items-center text-primary-600 dark:text-primary-300"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-5 w-5 mr-2" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5 mr-2" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center text-primary-600 dark:text-primary-300"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  <span>{direction === 'rtl' ? 'English' : 'עברית'}</span>
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
