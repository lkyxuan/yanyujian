import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-stone">
      {/* 张家界山景背景 */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Zhangjiajie mountains"
        fill
        className="object-cover object-center"
        priority
      />

      {/* 砂色水墨叠加层：sepia 感 + 暗化保证文字可读 */}
      <div className="absolute inset-0 bg-stone/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone/30 via-transparent to-stone/70" />

      {/* 内容 */}
      <div className="relative z-10 text-center text-linen px-6">
        <p className="text-sand text-xs tracking-[0.25em] uppercase mb-3">{t('subtitle')}</p>
        <h1 className="font-serif text-5xl md:text-8xl font-bold mb-4 text-linen leading-tight">
          {t('title')}
        </h1>
        <div className="w-20 h-px bg-sand mx-auto mb-4" />
        <p className="text-linen/80 text-base md:text-lg max-w-sm mx-auto leading-relaxed">
          {t('tagline')}
        </p>
      </div>

      {/* 向下滚动提示 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-7 h-7 text-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
