import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { checkinData } from '@/data/checkin'

export default function CheckinSection() {
  const t = useTranslations('checkin')
  const locale = useLocale()
  const lang = locale === 'en' ? 'en' : locale === 'ko' ? 'ko' : locale === 'ja' ? 'ja' : 'zh'

  return (
    <section id="checkin" className="py-16 px-4 bg-white/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl text-stone text-center mb-10">{t('title')}</h2>

        {/* Wi-Fi：全宽，名称和密码左右并排 */}
        <div className="bg-linen rounded-2xl p-4 mb-3 border border-sand/20 flex items-center">
          <div className="flex-1 text-center">
            <div className="text-2xl mb-1">📶</div>
            <p className="text-stone/50 text-xs mb-1">{t('wifi_name')}</p>
            <p className="font-bold text-stone text-sm whitespace-pre-line leading-snug">{checkinData.wifi.name}</p>
          </div>
          <div className="w-px h-14 bg-sand/20 mx-2" />
          <div className="flex-1 text-center">
            <div className="text-2xl mb-1">🔐</div>
            <p className="text-stone/50 text-xs mb-1">{t('wifi_password')}</p>
            <p className="font-bold text-stone text-sm tracking-widest">{checkinData.wifi.password}</p>
          </div>
        </div>

        {/* 入退房时间：2列 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-linen rounded-2xl p-4 text-center border border-sand/20">
            <div className="text-2xl mb-1">🛏️</div>
            <p className="text-stone/50 text-xs mb-1">{t('checkin_time')}</p>
            <p className="font-bold text-stone">{checkinData.checkinTime}</p>
          </div>
          <div className="bg-linen rounded-2xl p-4 text-center border border-sand/20">
            <div className="text-2xl mb-1">🕛</div>
            <p className="text-stone/50 text-xs mb-1">{t('checkout_time')}</p>
            <p className="font-bold text-stone">{checkinData.checkoutTime}</p>
          </div>
        </div>

        {/* 门禁时间：全宽横条 */}
        <div className="bg-sand/10 rounded-2xl p-4 mb-6 border border-sand/30 flex items-center gap-3">
          <span className="text-2xl">🔒</span>
          <div>
            <p className="text-stone/50 text-xs">{t('curfew')}</p>
            <p className="font-medium text-stone">{(checkinData.curfew as any)[lang]}</p>
          </div>
        </div>

        {/* 浴室说明 */}
        <div className="bg-linen rounded-2xl p-5 mb-6 border border-sand/20">
          <h3 className="font-serif text-lg text-stone mb-3">🚿 {{ zh: '浴室', en: 'Bathroom', ko: '욕실', ja: '浴室' }[lang]}</h3>
          <div className="space-y-3">
            <p className="text-stone/60 text-sm">{(checkinData.bathroom as any).location[lang]}</p>
            <div className="flex gap-3">
              <div className="flex-1 bg-white/60 rounded-xl p-3 text-center">
                <p className="text-xl mb-0.5">♀️</p>
                <p className="font-bold text-stone text-sm">{(checkinData.bathroom as any).women.floors}</p>
                <p className="text-stone/50 text-xs">{(checkinData.bathroom as any).women[lang]}</p>
              </div>
              <div className="flex-1 bg-white/60 rounded-xl p-3 text-center">
                <p className="text-xl mb-0.5">♂️</p>
                <p className="font-bold text-stone text-sm">{(checkinData.bathroom as any).men.floors}</p>
                <p className="text-stone/50 text-xs">{(checkinData.bathroom as any).men[lang]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-stone/70 text-sm">
              <span>💧</span>
              <span>{(checkinData.bathroom as any).amenities[lang]}</span>
            </div>
            <div className="flex items-start gap-2 bg-sand/10 rounded-xl p-3 border border-sand/20">
              <span className="text-base">🛁</span>
              <p className="text-stone/80 text-sm">{(checkinData.bathroom as any).towel[lang]}</p>
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-stone rounded-2xl p-5 text-center mb-6">
          <p className="text-linen/60 text-sm mb-4">{t('contact')}</p>

          {/* 微信二维码 */}
          <div className="flex flex-col items-center mb-4">
            <Image
              src={checkinData.contact.wechatQrImage}
              alt="WeChat QR Code"
              width={180}
              height={180}
              className="rounded-xl"
            />
            <p className="text-linen/50 text-xs mt-2">
              {{ zh: '扫码添加微信', en: 'Scan to add on WeChat', ko: '위챗 QR코드 스캔', ja: 'WeChatでスキャン' }[lang]}
            </p>
          </div>

          <a
            href={`tel:${checkinData.contact.phone}`}
            className="block text-linen font-medium active:text-sand transition-colors mb-3"
          >
            📞 {checkinData.contact.phone}
          </a>
          <p className="text-linen/40 text-xs">{t('contact_fallback')}</p>
        </div>

        {/* 房规列表 */}
        <div className="bg-linen rounded-2xl p-5 mt-6 border border-sand/20">
          <h3 className="font-serif text-lg text-stone mb-4">
            {{ zh: '温馨提示', en: 'House Rules', ko: '하우스 룰', ja: 'ハウスルール' }[lang]}
          </h3>
          <ul className="grid grid-cols-2 gap-3">
            {checkinData.rules.map((rule, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-xl flex-shrink-0">{rule.icon}</span>
                <span className="text-stone/80 text-sm">{(rule as any)[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
