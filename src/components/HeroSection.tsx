import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-stone">
      {/* 背景纹理层 */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4956A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* 渐变覆盖层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone/60 via-stone/40 to-stone/80" />

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
