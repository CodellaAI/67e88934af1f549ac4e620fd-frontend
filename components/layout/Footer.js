
'use client'

import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  
  const year = new Date().getFullYear()
  
  return (
    <footer className="bg-primary-900 text-primary-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 gold-text">Matan Elbaz</h3>
            <p className="mb-4 text-primary-400">
              Premium barbershop services with a focus on quality and customer satisfaction.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-400 hover:text-gold-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-400 hover:text-gold-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-400 hover:text-gold-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('nav.services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-primary-400 hover:text-white transition-colors">
                  Kid Cut
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-primary-400 hover:text-white transition-colors">
                  Men Cut
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-primary-400 hover:text-white transition-colors">
                  Men+Beard
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-primary-400 hover:text-white transition-colors">
                  Scissors
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('nav.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-primary-400 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-400 hover:text-white transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-400 hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-primary-400">
                  123 Barber Street, Tel Aviv, Israel
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold-500 mr-2 flex-shrink-0" />
                <a href="tel:+972-123-4567" className="text-primary-400 hover:text-white transition-colors">
                  +972-123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold-500 mr-2 flex-shrink-0" />
                <a href="mailto:info@matanelbaz.com" className="text-primary-400 hover:text-white transition-colors">
                  info@matanelbaz.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-500 text-sm">
            &copy; {year} Matan Elbaz Barbershop. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-primary-500 hover:text-primary-300 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-primary-500 hover:text-primary-300 text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-primary-500 hover:text-primary-300 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
