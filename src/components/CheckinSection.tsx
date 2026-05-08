import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { checkinData } from '@/data/checkin'

export default function CheckinSection() {
  const t = useTranslations('checkin')
  const locale = useLocale()
  const lang = locale === 'en' ? 'en' : locale === 'ko' ? 'ko' : 'zh'

  return (
    <section id="checkin" className="py-16 px-4 bg-white/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl text-stone text-center mb-10">{t('title')}</h2>

        {/* Wi-Fi + 时间：2列网格，手机友好 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-linen rounded-2xl p-4 text-center border border-sand/20">
            <div className="text-2xl mb-1">📶</div>
            <p className="text-stone/50 text-xs mb-1">{t('wifi_name')}</p>
            <p className="font-bold text-stone text-sm break-all">{checkinData.wifi.name}</p>
          </div>
          <div className="bg-linen rounded-2xl p-4 text-center border border-sand/20">
            <div className="text-2xl mb-1">🔐</div>
            <p className="text-stone/50 text-xs mb-1">{t('wifi_password')}</p>
            <p className="font-bold text-stone text-sm">{checkinData.wifi.password}</p>
          </div>
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
              {lang === 'ko' ? '위챗 QR코드 스캔' : lang === 'en' ? 'Scan to add on WeChat' : '扫码添加微信'}
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
            {lang === 'en' ? 'House Rules' : lang === 'ko' ? '하우스 룰' : '温馨提示'}
          </h3>
          <ul className="space-y-3">
            {checkinData.rules.map((rule, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-xl w-7 text-center flex-shrink-0">{rule.icon}</span>
                <span className="text-stone/80 text-sm">{(rule as any)[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
