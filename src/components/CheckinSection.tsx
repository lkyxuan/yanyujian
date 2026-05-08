import { useTranslations, useLocale } from 'next-intl'
import { checkinData } from '@/data/checkin'

export default function CheckinSection() {
  const t = useTranslations('checkin')
  const locale = useLocale()
  const isEn = locale === 'en'

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
            <p className="font-medium text-stone">{checkinData.curfew}</p>
          </div>
        </div>

        {/* 房规列表 */}
        <div className="bg-linen rounded-2xl p-5 mb-6 border border-sand/20">
          <h3 className="font-serif text-lg text-stone mb-4">
            {isEn ? 'House Rules' : '温馨提示'}
          </h3>
          <ul className="space-y-3">
            {checkinData.rules.map((rule, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-xl w-7 text-center flex-shrink-0">{rule.icon}</span>
                <span className="text-stone/80 text-sm">{isEn ? rule.en : rule.zh}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 联系方式 */}
        <div className="bg-stone rounded-2xl p-5 text-center">
          <p className="text-linen/60 text-sm mb-3">{t('contact')}</p>
          <div className="space-y-2">
            <p className="text-linen font-medium">
              <span className="text-sand">WeChat:</span> {checkinData.contact.wechat}
            </p>
            <a
              href={`tel:${checkinData.contact.phone}`}
              className="block text-linen font-medium hover:text-sand transition-colors"
            >
              📞 {checkinData.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
