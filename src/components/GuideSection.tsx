'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { guideData } from '@/data/guide'
import TaxiCard from './TaxiCard'

type Tab = 'transport' | 'food' | 'tips' | 'emergency'

function diDiUrl(lat: number, lng: number, name: string) {
  return `openapp.diditaxi://com.xiaojukeji.didi/passenger/send_to?dest_lat=${lat}&dest_lng=${lng}&dest_name=${encodeURIComponent(name)}`
}

const DIDI_LABEL: Record<string, string> = {
  zh: '滴滴叫车',
  en: 'Open DiDi',
  ko: '디디 열기',
  ja: 'DiDiで開く',
}

export default function GuideSection() {
  const [activeTab, setActiveTab] = useState<Tab>('transport')
  const [activeDest, setActiveDest] = useState(0)
  const t = useTranslations('guide')
  const locale = useLocale()
  const lang = locale === 'en' ? 'en' : locale === 'ko' ? 'ko' : locale === 'ja' ? 'ja' : 'zh'
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'transport', label: t('transport'), icon: '🚕' },
    { key: 'food', label: t('food'), icon: '🍲' },
    { key: 'tips', label: t('tips'), icon: '💡' },
    { key: 'emergency', label: t('emergency'), icon: '🆘' },
  ]

  const destinations = guideData.destinations as any[]
  const dest = destinations[activeDest]

  return (
    <section id="guide" className="py-16 px-4 bg-white/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl text-stone text-center mb-3">{t('title')}</h2>
        <div className="w-16 h-px bg-sand mx-auto mb-8" />

        {/* 目的地切换 */}
        <div className="flex gap-3 mb-5">
          {destinations.map((d: any, i: number) => (
            <button
              key={d.nameEn}
              onClick={() => setActiveDest(i)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium border transition-colors
                ${activeDest === i
                  ? 'bg-sand text-white border-sand shadow-sm'
                  : 'bg-linen text-stone border-sand/30'
                }`}
            >
              <span className="text-xl">{d.icon}</span>
              <span>{d[`name${cap(lang)}`] || d.nameZh}</span>
            </button>
          ))}
        </div>

        {/* 目的地交通卡片 */}
        <div className="bg-linen rounded-2xl border border-sand/20 overflow-hidden mb-10">
          <div className="p-5 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{dest.icon}</span>
              <div>
                <h3 className="font-serif font-bold text-stone text-lg leading-tight">
                  {dest[`name${cap(lang)}`] || dest.nameZh}
                </h3>
                <p className="text-stone/40 text-xs">{lang === 'zh' ? dest.nameEn : dest.nameZh}</p>
              </div>
            </div>
            <p className="text-stone/60 text-sm leading-relaxed">{dest.tagline[lang]}</p>
          </div>

          <div className="mx-5 mb-4 space-y-2">
            {dest.transport.map((tr: any, i: number) => (
              <div key={i} className="bg-white/70 rounded-xl p-3">
                <div className="flex gap-3 items-start">
                  <span className="text-lg flex-shrink-0 mt-0.5">{tr.mode}</span>
                  <div className="flex-1">
                    <p className="font-medium text-stone text-sm">{tr[`label${cap(lang)}`]}</p>
                    <p className="text-stone/60 text-xs leading-relaxed mt-0.5">{tr[`detail${cap(lang)}`]}</p>
                  </div>
                </div>
                {tr.diDiLat && (
                  <a
                    href={diDiUrl(tr.diDiLat, tr.diDiLng, tr.diDiNameZh)}
                    className="mt-2.5 flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-xs font-medium text-orange-700 active:bg-orange-100"
                  >
                    <span>🚖</span>
                    <span>{DIDI_LABEL[lang]}</span>
                    <span className="text-orange-400 ml-auto">→ {tr.diDiNameZh}</span>
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mx-5 mb-5 flex gap-2 items-start text-moss text-xs">
            <span>💡</span>
            <p>{dest[`tip${cap(lang)}`]}</p>
          </div>
        </div>

        {/* Tab 导航 */}
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

        {/* 交通 */}
        {activeTab === 'transport' && (
          <div className="space-y-5">
            <div className="bg-linen rounded-2xl p-5 border border-sand/20 space-y-4">
              <div>
                <h3 className="font-bold text-stone text-sm mb-1">🚌 {{ zh: '岩语间 → 市中心汽车站', en: 'Hostel → Central Bus Station', ko: '호스텔 → 시내버스터미널', ja: 'ホステル → 市内バスターミナル' }[lang]}</h3>
                <p className="text-stone/70 text-sm">{(guideData.transport.toBusStation as any)[lang]}</p>
              </div>
              <div className="border-t border-sand/20 pt-4">
                <h3 className="font-bold text-stone text-sm mb-2">🎫 {{ zh: '班车线路', en: 'Bus Routes to the Parks', ko: '공원행 버스 노선', ja: '路線バス時刻表' }[lang]}</h3>
                <p className="text-stone/70 text-sm whitespace-pre-line">{(guideData.transport.toBusSchedule as any)[lang]}</p>
              </div>
              <div className="border-t border-sand/20 pt-4">
                <h3 className="font-bold text-stone text-sm mb-1">🚕 {{ zh: '打车 / 滴滴', en: 'Taxi & DiDi', ko: '택시 & 디디', ja: 'タクシー & DiDi' }[lang]}</h3>
                <p className="text-stone/70 text-sm">{(guideData.transport.taxiTips as any)[lang]}</p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg text-stone mb-2">
                📍 {{ zh: '打车目的地卡片', en: 'Taxi Destination Cards', ko: '택시 목적지 카드', ja: 'タクシー目的地カード' }[lang]}
              </h3>
              <p className="text-stone/50 text-xs mb-4">
                {{ zh: '点击复制中文地址，展示给司机即可。', en: 'Tap to copy the Chinese address, then show your phone to the driver.', ko: '주소를 복사하여 택시 기사에게 보여주세요.', ja: '住所をコピーして運転手に見せてください。' }[lang]}
              </p>
              <div className="space-y-3">
                {guideData.taxiDestinations.map((d) => (
                  <TaxiCard key={d.nameEn} {...d} />
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
                  <h3 className="font-serif font-bold text-stone text-base">{(item as any)[`name${cap(lang)}`] || item.nameZh}</h3>
                  <p className="text-stone/50 text-xs mb-1">{lang === 'zh' ? item.nameEn : item.nameZh}</p>
                  <p className="text-stone/70 text-sm">{(item as any)[`desc${cap(lang)}`] || item.descZh}</p>
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
                  <h3 className="font-bold text-stone text-base mb-1">{(tip as any)[`title${cap(lang)}`] || tip.titleZh}</h3>
                  <p className="text-stone/70 text-sm leading-relaxed">{(tip as any)[`desc${cap(lang)}`] || tip.descZh}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 紧急联系 */}
        {activeTab === 'emergency' && (
          <div className="space-y-3">
            <p className="text-stone/50 text-sm text-center mb-4">
              {{ zh: '点击号码可直接拨打。', en: 'Tap a number to call directly.', ko: '번호를 눌러 바로 전화하세요.', ja: '番号をタップして直接電話できます。' }[lang]}
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
