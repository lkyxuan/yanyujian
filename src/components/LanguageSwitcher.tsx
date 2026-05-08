'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const LOCALES = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語', disabled: true },
  { code: 'ko', label: '한국어', disabled: true },
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <div className="flex gap-1.5">
      {LOCALES.map(({ code, label, disabled }) => (
        <button
          key={code}
          onClick={() => !disabled && switchLocale(code)}
          disabled={disabled}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors min-h-[32px]
            ${locale === code
              ? 'bg-sand text-white'
              : disabled
              ? 'text-stone/30 cursor-not-allowed'
              : 'text-stone hover:bg-sand/20'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
