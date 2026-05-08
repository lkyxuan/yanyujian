'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { guideData } from '@/data/guide'
import TaxiCard from './TaxiCard'

type Tab = 'transport' | 'food' | 'tips' | 'emergency'

const DIDI_LABEL: Record<string, string> = {
  zh: '滴滴叫车',
  en: 'Open DiDi',
  ko: '디디 열기',
  ja: 'DiDiで開く',
}

const DIDI_COPIED: Record<string, string> = {
  zh: '地址已复制 · 在滴滴粘贴目的地',
  en: 'Address copied · Paste in DiDi',
  ko: '주소 복사됨 · 디디에 붙여넣기',
  ja: 'アドレスをコピー · DiDiに貼り付け',
}

export default function GuideSection() {
  const [activeTab, setActiveTab] = useState<Tab>('transport')
  const [activeDest, setActiveDest] = useState(0)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const t = useTranslations('guide')
  const locale = useLocale()
  const lang = locale === 'en' ? 'en' : locale === 'ko' ? 'ko' : locale === 'ja' ? 'ja' : 'zh'
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  function openDiDi(address: string, key: string) {
    navigator.clipboard.writeText(address).catch(() => {})
    window.location.href = 'diditaxi://'
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'transport', label: t('transport'), icon: '🚕' },
    { key: 'food', label: t('food'), icon: '🍲' },
    { key: 'tips', label: t('tips'), icon: '💡' },
    { key: 'emergency', label: t('emergency'), icon: '🆘' },
  ]

  const destinations = guideData.destinations as any[]
  const dest = destinations[activeDest]
  const hostelEntry = guideData.taxiDestinations[0]
  const hostelAddress = hostelEntry?.addressZh ?? '湖南省张家界市岩语间文青旅社'

  return (
    <section id="guide" className="py-16 px-4 bg-white/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl text-stone text-center mb-3">{t('title')}</h2>
        <div className="w-16 h-px bg-sand mx-auto mb-8" />

        {/* 目的地切换（多于1个才显示） */}
        {destinations.length > 1 && (
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
        )}

        {/* 目的地交通卡片 */}
        <div className="bg-linen rounded-2xl border border-sand/20 overflow-hidden mb-5">
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
            {dest.transport.map((tr: any, i: number) => {
              const key = `dest-${activeDest}-${i}`
              return (
                <div key={i} className="bg-white/70 rounded-xl p-3">
                  <div className="flex gap-3 items-start">
                    <span className="text-lg flex-shrink-0 mt-0.5">{tr.mode}</span>
                    <div className="flex-1">
                      <p className="font-medium text-stone text-sm">{tr[`label${cap(lang)}`]}</p>
                      <p className="text-stone/60 text-xs leading-relaxed mt-0.5">{tr[`detail${cap(lang)}`]}</p>
                    </div>
                  </div>
                  {tr.diDiNameZh && (
                    <button
                      onClick={() => openDiDi(tr.diDiNameZh, key)}
                      className="mt-2.5 w-full flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-xs font-medium active:bg-orange-100 transition-colors"
                    >
                      {copiedKey === key ? (
                        <span className="text-green-600 w-full text-center">{DIDI_COPIED[lang]}</span>
                      ) : (
                        <>
                          <span>🚖</span>
                          <span className="text-orange-700">{DIDI_LABEL[lang]}</span>
                          <span className="text-orange-400 ml-auto">→ {tr.diDiNameZh}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          {dest.tips && (
            <div className="mx-5 mb-5 space-y-1.5">
              {dest.tips.map((tip: any, i: number) => (
                <p key={i} className="text-moss text-xs leading-relaxed">{tip[lang]}</p>
              ))}
            </div>
          )}
        </div>

        {/* 回旅社快捷按钮 */}
        <button
          onClick={() => openDiDi(hostelAddress, 'hostel')}
          className="w-full flex items-center gap-3 bg-linen border border-sand/30 rounded-2xl px-5 py-4 mb-10 active:bg-sand/10 transition-colors"
        >
          <span className="text-2xl">🏠</span>
          <div className="flex-1 text-left">
            <p className="font-bold text-stone text-sm">
              {{ zh: '回旅社', en: 'Back to Hostel', ko: '호스텔로 돌아가기', ja: 'ホステルへ戻る' }[lang]}
            </p>
            <p className="text-stone/50 text-xs mt-0.5">
              {{ zh: '复制地址并打开滴滴', en: 'Copy address & open DiDi', ko: '주소 복사 후 디디 열기', ja: 'アドレスをコピーしてDiDiを開く' }[lang]}
            </p>
          </div>
          {copiedKey === 'hostel' ? (
            <span className="text-green-600 text-xs font-medium flex-shrink-0">
              {{ zh: '已复制✓', en: 'Copied ✓', ko: '복사됨 ✓', ja: 'コピー済 ✓' }[lang]}
            </span>
          ) : (
            <span className="text-orange-500 text-sm font-bold flex-shrink-0">🚖</span>
          )}
        </button>

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
            {/* 去汽车站 */}
            <div className="bg-linen rounded-2xl p-4 border border-sand/20">
              <p className="font-bold text-stone text-sm mb-1">
                🚌 {{ zh: '旅社 → 市中心汽车站', en: 'Hostel → Central Bus Station', ko: '호스텔 → 버스터미널', ja: 'ホステル → バスターミナル' }[lang]}
              </p>
              <p className="text-stone/40 text-xs mb-3">
                📍 {{ zh: '子午路2号 · 奥莱广场旁', en: '2 Ziwu Rd · near Aolai Plaza', ko: '쯔우로 2번지 · 아오라이 광장 근처', ja: '子午路2号・アウトレット広場隣' }[lang]}
              </p>
              <div className="space-y-1.5">
                {([
                  { icon: '🚶', zh: '步行约 15 分钟', en: 'Walk ~15 min', ko: '도보 약 15분', ja: '徒歩 約15分' },
                  { icon: '🚖', zh: '打车约 5 分钟 · ¥6–8', en: 'Taxi ~5 min · ¥6–8', ko: '택시 약 5분 · 6~8위안', ja: 'タクシー 約5分 · 6〜8元' },
                  { icon: '🚌', zh: '公交 1/2/6/7路 · ¥1 · 2站', en: 'Bus 1/2/6/7 · ¥1 · 2 stops', ko: '버스 1/2/6/7번 · 1위안 · 2정거장', ja: 'バス 1/2/6/7番 · 1元 · 2停留所' },
                ] as any[]).map((row) => (
                  <div key={row.zh} className="flex items-center gap-2 text-sm text-stone/70">
                    <span className="w-5 text-center text-base">{row.icon}</span>
                    <span>{row[lang]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 班车路线 */}
            <div>
              <p className="font-bold text-stone text-sm mb-3">
                🎫 {{ zh: '汽车站 → 景区班车', en: 'Bus Station → Park Shuttle', ko: '버스터미널 → 공원행 셔틀', ja: 'バスターミナル → 公園シャトル' }[lang]}
              </p>
              <div className="space-y-2">
                {((guideData.transport as any).busRoutes as any[]).map((route, i) => (
                  <div key={i} className="bg-linen rounded-2xl p-4 border border-sand/20">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span>{route.icon}</span>
                        <p className="font-medium text-stone text-sm truncate">{route[`dest${cap(lang)}`]}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {route.price && (
                          <span className="bg-sand/20 text-sand font-bold text-xs px-2 py-0.5 rounded-full">{route.price}</span>
                        )}
                        <span className="text-stone/40 text-xs">{route.durationMin}min</span>
                      </div>
                    </div>
                    <p className="text-stone/50 text-xs">{route.freq[lang]} · {route.hours}</p>
                    {route[`note${cap(lang)}`] && (
                      <p className="text-moss text-xs mt-1.5">💡 {route[`note${cap(lang)}`]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 滴滴贴士 */}
            <div className="bg-linen rounded-2xl p-4 border border-sand/20 flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">🚖</span>
              <div>
                <p className="font-bold text-stone text-sm mb-1">DiDi</p>
                <p className="text-stone/70 text-sm">{(guideData.transport.taxiTips as any)[lang]}</p>
              </div>
            </div>

            {/* 打车目的地卡片 */}
            <div>
              <p className="font-bold text-stone text-sm mb-1">
                📍 {{ zh: '打车地址卡片', en: 'Taxi Address Cards', ko: '택시 주소 카드', ja: 'タクシー住所カード' }[lang]}
              </p>
              <p className="text-stone/50 text-xs mb-3">
                {{ zh: '点击复制中文地址给司机。', en: 'Tap to copy the Chinese address for your driver.', ko: '중국어 주소를 복사해 기사에게 보여주세요.', ja: '中国語住所をコピーして運転手に。' }[lang]}
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
            {guideData.emergency.map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-linen rounded-2xl px-5 py-4 border border-sand/20">
                <span className="text-stone font-medium text-sm">{(item as any)[`label${cap(lang)}`]}</span>
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
