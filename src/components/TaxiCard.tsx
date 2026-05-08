'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface TaxiCardProps {
  nameEn: string
  nameZh: string
  addressZh: string
  note?: string
}

export default function TaxiCard({ nameEn, nameZh, addressZh, note }: TaxiCardProps) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations('taxi_card')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(addressZh)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 降级方案：部分旧手机浏览器不支持 clipboard API
      const textarea = document.createElement('textarea')
      textarea.value = addressZh
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-sand/20">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-serif font-bold text-stone text-base leading-snug">{nameEn}</h4>
          <p className="text-stone/60 text-sm mt-0.5">{nameZh}</p>
        </div>
        <span className="text-2xl flex-shrink-0">🚕</span>
      </div>
      <p className="text-stone/70 text-sm bg-linen rounded-xl p-3 mb-3 font-mono break-all leading-relaxed">
        {addressZh}
      </p>
      {note && <p className="text-stone/50 text-xs mb-3 italic">{note}</p>}
      <button
        onClick={handleCopy}
        className={`w-full py-3 rounded-xl text-sm font-semibold transition-all active:scale-95
          ${copied
            ? 'bg-moss text-white'
            : 'bg-sand text-white active:bg-sand/80'
          }`}
      >
        {copied ? `✓ ${t('copied')}` : t('copy')}
      </button>
    </div>
  )
}
