'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { guideData } from '@/data/guide'
import TaxiCard from './TaxiCard'

type Tab = 'attractions' | 'transport' | 'food' | 'tips' | 'emergency'

export default function GuideSection() {
  const [activeTab, setActiveTab] = useState<Tab>('attractions')
  const t = useTranslations('guide')
  const locale = useLocale()
  const lang = locale === 'en' ? 'en' : locale === 'ko' ? 'ko' : 'zh'

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'attractions', label: t('attractions'), icon: '🏔️' },
    { key: 'transport', label: t('transport'), icon: '🚕' },
    { key: 'food', label: t('food'), icon: '🍲' },
    { key: 'tips', label: t('tips'), icon: '💡' },
    { key: 'emergency', label: t('emergency'), icon: '🆘' },
  ]

  return (
    <section id="guide" className="py-16 px-4 bg-white/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl text-stone text-center mb-3">{t('title')}</h2>
        <div className="w-16 h-px bg-sand mx-auto mb-8" />

        {/* Tab 导航 - 手机横向滚动 */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide -mx-4 px-4">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-colors
                ${activeTab === key
                  ? 'bg-sand text-white shadow-sm'
                  : 'bg-linen text-stone border border-sand/30'
                }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* 核心景点 */}
        {activeTab === 'attractions' && (
          <div className="space-y-4">
            {guideData.attractions.map((a) => (
              <div key={a.nameEn} className="bg-linen rounded-2xl p-5 border border-sand/20">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-stone text-base leading-snug">
                      {lang === 'ko' ? a.nameKo : lang === 'en' ? a.nameEn : a.nameZh}
                    </h3>
                    <p className="text-stone/50 text-xs mb-2">{lang === 'ko' ? a.nameZh : lang === 'en' ? a.nameZh : a.nameEn}</p>
                    <p className="text-stone/70 text-sm leading-relaxed">{lang === 'ko' ? a.descKo : lang === 'en' ? a.descEn : a.descZh}</p>
                    <p className="text-moss text-sm mt-2">💡 {(a.tips as any)[lang]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 交通 */}
        {activeTab === 'transport' && (
          <div className="space-y-5">
            <div className="bg-linen rounded-2xl p-5 border border-sand/20 space-y-4">
              <div>
                <h3 className="font-bold text-stone text-sm mb-1">✈️ {lang === 'en' ? 'From Airport' : lang === 'ko' ? '공항에서' : '从机场'}</h3>
                <p className="text-stone/70 text-sm">{(guideData.transport.fromAirport as any)[lang]}</p>
              </div>
              <div className="border-t border-sand/20 pt-4">
                <h3 className="font-bold text-stone text-sm mb-1">🚄 {lang === 'en' ? 'From Train Station' : lang === 'ko' ? '기차역에서' : '从高铁站'}</h3>
                <p className="text-stone/70 text-sm">{(guideData.transport.fromStation as any)[lang]}</p>
              </div>
              <div className="border-t border-sand/20 pt-4">
                <h3 className="font-bold text-stone text-sm mb-1">🚕 {lang === 'en' ? 'Taxi & DiDi' : lang === 'ko' ? '택시 & 디디' : '打车'}</h3>
                <p className="text-stone/70 text-sm">{(guideData.transport.taxiTips as any)[lang]}</p>
              </div>
            </div>

            {/* 打车卡片 */}
            <div>
              <h3 className="font-serif text-lg text-stone mb-2">
                📍 {lang === 'en' ? 'Taxi Destination Cards' : lang === 'ko' ? '택시 목적지 카드' : '打车目的地卡片'}
              </h3>
              <p className="text-stone/50 text-xs mb-4">
                {lang === 'en'
                  ? 'Tap to copy the Chinese address, then show your phone to the driver.'
                  : lang === 'ko'
                  ? '주소를 복사하여 택시 기사에게 보여주세요.'
                  : '点击复制中文地址，展示给司机即可。'}
              </p>
              <div className="space-y-3">
                {guideData.taxiDestinations.map((dest) => (
                  <TaxiCard key={dest.nameEn} {...dest} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 美食 */}
        {activeTab === 'food' && (
          <div className="space-y-3">
            {guideData.food.map((item) => (
              <div key={item.nameEn} className="bg-linen rounded-2xl p-4 border border-sand/20 flex gap-4 items-start">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-serif font-bold text-stone text-base">{lang === 'ko' ? (item as any).nameKo : lang === 'en' ? item.nameEn : item.nameZh}</h3>
                  <p className="text-stone/50 text-xs mb-1">{lang === 'ko' ? item.nameZh : lang === 'en' ? item.nameZh : item.nameEn}</p>
                  <p className="text-stone/70 text-sm">{lang === 'ko' ? (item as any).descKo : lang === 'en' ? item.descEn : item.descZh}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 实用贴士 */}
        {activeTab === 'tips' && (
          <div className="space-y-3">
            {guideData.tips.map((tip) => (
              <div key={tip.titleEn} className="bg-linen rounded-2xl p-4 border border-sand/20 flex gap-4 items-start">
                <span className="text-3xl flex-shrink-0">{tip.icon}</span>
                <div>
                  <h3 className="font-bold text-stone text-base mb-1">{lang === 'ko' ? (tip as any).titleKo : lang === 'en' ? tip.titleEn : tip.titleZh}</h3>
                  <p className="text-stone/70 text-sm leading-relaxed">{lang === 'ko' ? (tip as any).descKo : lang === 'en' ? tip.descEn : tip.descZh}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 紧急联系 */}
        {activeTab === 'emergency' && (
          <div className="space-y-3">
            <p className="text-stone/50 text-sm text-center mb-4">
              {lang === 'en' ? 'Tap a number to call directly.' : lang === 'ko' ? '번호를 눌러 바로 전화하세요.' : '点击号码可直接拨打。'}
            </p>
            {guideData.emergency.map((item) => (
              <div key={item.label} className="flex items-center justify-between bg-linen rounded-2xl px-5 py-4 border border-sand/20">
                <span className="text-stone font-medium text-sm">{item.label}</span>
                <a
                  href={`tel:${item.number}`}
                  className="font-bold text-sand text-lg active:text-sand/70"
                >
                  {item.number}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
