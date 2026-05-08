import { useTranslations, useLocale } from 'next-intl'
import { storyData } from '@/data/story'

export default function StorySection() {
  const t = useTranslations('story')
  const locale = useLocale()
  const lang = locale === 'en' ? 'en' : locale === 'ko' ? 'ko' : 'zh'

  return (
    <section id="story" className="py-16 px-4 bg-linen">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl text-stone text-center mb-3">{t('title')}</h2>
        <div className="w-16 h-px bg-sand mx-auto mb-10" />

        {/* 酒店简介 */}
        <p className="text-stone/70 leading-relaxed text-base mb-8 text-center">
          {storyData.hotel[lang as 'zh' | 'en' | 'ko']}
        </p>

        {/* 酒店照片占位 */}
        <div className="w-full aspect-video bg-stone/10 rounded-2xl flex items-center justify-center border-2 border-dashed border-sand/30 mb-10">
          <div className="text-center">
            <p className="text-3xl mb-2">📷</p>
            <p className="text-stone/30 text-sm">{lang === 'en' ? 'Hotel photo coming soon' : lang === 'ko' ? '호텔 사진 준비 중' : '酒店照片即将上传'}</p>
          </div>
        </div>

        {/* 砂石画介绍 */}
        <div className="bg-stone rounded-2xl p-6 text-linen">
          <h3 className="font-serif text-xl mb-3 text-sand">{t('art_title')}</h3>
          <p className="text-linen/70 leading-relaxed text-sm mb-5">
            {storyData.sandPainting[lang as 'zh' | 'en' | 'ko']}
          </p>

          {/* 作品图片占位 - 3列小图 */}
          <div className="grid grid-cols-3 gap-2">
            {storyData.images.map((_, i) => (
              <div key={i} className="aspect-square bg-linen/10 rounded-xl flex items-center justify-center border border-linen/20">
                <span className="text-linen/30 text-xs">{lang === 'en' ? `Art ${i + 1}` : lang === 'ko' ? `작품 ${i + 1}` : `作品 ${i + 1}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
