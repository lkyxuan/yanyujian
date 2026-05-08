'use client'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const t = useTranslations('nav')

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-linen/95 backdrop-blur-sm border-b border-sand/20">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-serif font-bold text-stone text-lg tracking-wide">岩语间</span>
        <div className="flex items-center gap-4">
          {/* 导航链接：只在中等屏幕及以上显示 */}
          <div className="hidden md:flex gap-5 text-sm text-stone">
            <button onClick={() => scrollTo('checkin')} className="hover:text-sand transition-colors py-1">{t('checkin')}</button>
            <button onClick={() => scrollTo('story')} className="hover:text-sand transition-colors py-1">{t('story')}</button>
            <button onClick={() => scrollTo('guide')} className="hover:text-sand transition-colors py-1">{t('guide')}</button>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  )
}
