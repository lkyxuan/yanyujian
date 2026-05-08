# 岩语间官网 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为张家界青旅"岩语间"构建一个多语言旅游信息网站，外国游客扫码即可查看入住须知和张家界旅游指南。

**Architecture:** 单页 Next.js 应用，顶部固定语言切换（中/英优先），内容存于 JSON 文件便于维护，打车卡片组件支持一键复制中文地址。

**Tech Stack:** Next.js 15, Tailwind CSS, next-intl (i18n), Vercel 部署

---

## 色彩系统

| 变量 | 色值 | 用途 |
|------|------|------|
| `sand` | `#C4956A` | 主色（砂岩） |
| `stone` | `#3D3530` | 深色文字/标题 |
| `linen` | `#F5F0E8` | 页面背景 |
| `moss` | `#5C7A5C` | 强调色（山林绿） |

---

### Task 1: 初始化 Next.js 项目

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`

**Step 1: 初始化项目**

```bash
cd /Users/qiji/conductor/workspaces/yanyujian/helsinki
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

选项全部选 Yes/默认，src-dir 选 Yes。

**Step 2: 安装 next-intl**

```bash
npm install next-intl
```

**Step 3: 验证项目启动**

```bash
npm run dev
```

预期：http://localhost:3000 显示 Next.js 默认页面，无报错。

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 15 project with Tailwind and next-intl"
```

---

### Task 2: 配置 Tailwind 色彩系统和字体

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: 配置 Tailwind 自定义色彩**

在 `tailwind.config.ts` 的 `theme.extend` 中添加：

```typescript
colors: {
  sand: '#C4956A',
  stone: '#3D3530',
  linen: '#F5F0E8',
  moss: '#5C7A5C',
},
fontFamily: {
  serif: ['Playfair Display', 'Noto Serif SC', 'Georgia', 'serif'],
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
},
```

**Step 2: 在 layout.tsx 引入 Google Fonts**

```tsx
import { Playfair_Display, Noto_Serif_SC } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const notoSerifSC = Noto_Serif_SC({
  subsets: ['chinese-simplified'],
  weight: ['400', '700'],
  variable: '--font-noto-serif',
})
```

**Step 3: 更新 globals.css**

```css
body {
  background-color: #F5F0E8;
  color: #3D3530;
}
```

**Step 4: 验证**

```bash
npm run dev
```

预期：页面背景变为米白色 `#F5F0E8`。

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: configure Tailwind color system and fonts"
```

---

### Task 3: 配置 next-intl 国际化

**Files:**
- Create: `messages/zh.json`
- Create: `messages/en.json`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Modify: `next.config.ts`
- Modify: `src/app/layout.tsx` → 移动到 `src/app/[locale]/layout.tsx`

**Step 1: 创建路由配置**

`src/i18n/routing.ts`:
```typescript
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['zh', 'en', 'ja', 'ko'],
  defaultLocale: 'zh',
})
```

**Step 2: 创建请求配置**

`src/i18n/request.ts`:
```typescript
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
```

**Step 3: 创建中文消息文件** `messages/zh.json`:

```json
{
  "nav": {
    "checkin": "入住须知",
    "story": "关于我们",
    "guide": "张家界指南"
  },
  "hero": {
    "title": "岩语间",
    "subtitle": "张家界·砂石画艺术青旅",
    "tagline": "在岩石与画布之间，找到属于你的张家界"
  },
  "checkin": {
    "title": "入住须知",
    "wifi_name": "Wi-Fi 名称",
    "wifi_password": "Wi-Fi 密码",
    "checkin_time": "入住时间",
    "checkout_time": "退房时间",
    "curfew": "门禁时间",
    "contact": "联系前台"
  },
  "story": {
    "title": "关于岩语间",
    "art_title": "砂石画艺术"
  },
  "guide": {
    "title": "张家界旅游指南",
    "attractions": "核心景点",
    "transport": "交通指南",
    "food": "美食推荐",
    "tips": "实用贴士",
    "emergency": "紧急联系"
  },
  "taxi_card": {
    "copy": "复制地址给司机",
    "copied": "已复制！"
  }
}
```

**Step 4: 创建英文消息文件** `messages/en.json`:

```json
{
  "nav": {
    "checkin": "Check-in Info",
    "story": "Our Story",
    "guide": "Zhangjiajie Guide"
  },
  "hero": {
    "title": "Yanyu Jian",
    "subtitle": "Sand Painting Art Hostel · Zhangjiajie",
    "tagline": "Between stone and canvas, discover your Zhangjiajie"
  },
  "checkin": {
    "title": "Check-in Information",
    "wifi_name": "Wi-Fi Name",
    "wifi_password": "Wi-Fi Password",
    "checkin_time": "Check-in Time",
    "checkout_time": "Check-out Time",
    "curfew": "Curfew",
    "contact": "Contact Reception"
  },
  "story": {
    "title": "About Yanyu Jian",
    "art_title": "Sand Painting Art"
  },
  "guide": {
    "title": "Zhangjiajie Travel Guide",
    "attractions": "Top Attractions",
    "transport": "Getting Around",
    "food": "Food & Dining",
    "tips": "Practical Tips",
    "emergency": "Emergency Contacts"
  },
  "taxi_card": {
    "copy": "Copy address for taxi driver",
    "copied": "Copied!"
  }
}
```

**Step 5: 更新 next.config.ts**

```typescript
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
export default withNextIntl({})
```

**Step 6: 重构目录结构**

```bash
mkdir -p src/app/[locale]
mv src/app/layout.tsx src/app/[locale]/layout.tsx
mv src/app/page.tsx src/app/[locale]/page.tsx
```

在 `src/app/[locale]/layout.tsx` 的 html 标签加 `lang={locale}`，并用 `NextIntlClientProvider` 包裹。

**Step 7: 验证**

访问 http://localhost:3000/zh 和 http://localhost:3000/en，均能正常显示，无报错。

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: configure next-intl with zh/en locales"
```

---

### Task 4: 语言切换组件

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`

**Step 1: 创建语言切换组件**

`src/components/LanguageSwitcher.tsx`:

```tsx
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
    <div className="flex gap-2">
      {LOCALES.map(({ code, label, disabled }) => (
        <button
          key={code}
          onClick={() => !disabled && switchLocale(code)}
          disabled={disabled}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
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
```

**Step 2: 验证**

将组件临时加入页面，确认语言切换后 URL 从 `/zh/` 变为 `/en/`，且内容切换正常。

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add LanguageSwitcher component"
```

---

### Task 5: 导航栏

**Files:**
- Create: `src/components/Navbar.tsx`

**Step 1: 创建导航栏**

`src/components/Navbar.tsx`:

```tsx
'use client'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const t = useTranslations('nav')

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-linen/90 backdrop-blur-sm border-b border-sand/20">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-serif font-bold text-stone text-lg">岩语间</span>
        <div className="hidden md:flex gap-6 text-sm text-stone">
          <button onClick={() => scrollTo('checkin')} className="hover:text-sand transition-colors">{t('checkin')}</button>
          <button onClick={() => scrollTo('story')} className="hover:text-sand transition-colors">{t('story')}</button>
          <button onClick={() => scrollTo('guide')} className="hover:text-sand transition-colors">{t('guide')}</button>
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  )
}
```

**Step 2: 加入 layout.tsx**

在 `src/app/[locale]/layout.tsx` 的 body 顶部加入 `<Navbar />`。

**Step 3: 验证**

导航栏固定在顶部，语言切换按钮正常工作。

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add fixed Navbar with smooth scroll navigation"
```

---

### Task 6: Hero 区块

**Files:**
- Create: `src/components/HeroSection.tsx`
- Create: `public/images/` 目录（占位）

**Step 1: 创建 Hero 区块**

`src/components/HeroSection.tsx`:

```tsx
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone">
      {/* 背景纹理层 */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4956A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* 渐变覆盖层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone/60 via-stone/40 to-stone/80" />

      {/* 内容 */}
      <div className="relative z-10 text-center text-linen px-4">
        <p className="text-sand text-sm tracking-[0.3em] uppercase mb-4">{t('subtitle')}</p>
        <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 text-linen">
          {t('title')}
        </h1>
        <div className="w-24 h-px bg-sand mx-auto mb-6" />
        <p className="text-linen/80 text-lg max-w-md mx-auto">{t('tagline')}</p>

        {/* 向下滚动提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: 加入主页**

在 `src/app/[locale]/page.tsx` 中引入并渲染 `<HeroSection />`。

**Step 3: 验证**

Hero 区块全屏展示，标题清晰，有砂石纹理背景，向下箭头动画正常。

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Hero section with sand texture background"
```

---

### Task 7: 打车卡片组件

**Files:**
- Create: `src/components/TaxiCard.tsx`

**Step 1: 创建打车卡片**

`src/components/TaxiCard.tsx`:

```tsx
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
    await navigator.clipboard.writeText(addressZh)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-linen border border-sand/30 rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="font-serif font-bold text-stone">{nameEn}</h4>
          <p className="text-stone/60 text-sm">{nameZh}</p>
        </div>
        <span className="text-2xl">🚕</span>
      </div>
      <p className="text-stone/70 text-sm bg-white/60 rounded-lg p-2 mb-3 font-mono">
        {addressZh}
      </p>
      {note && <p className="text-stone/50 text-xs mb-3">{note}</p>}
      <button
        onClick={handleCopy}
        className={`w-full py-2 rounded-lg text-sm font-medium transition-all
          ${copied
            ? 'bg-moss text-white'
            : 'bg-sand text-white hover:bg-sand/80'
          }`}
      >
        {copied ? t('copied') : t('copy')}
      </button>
    </div>
  )
}
```

**Step 2: 验证**

临时在页面中放一个 TaxiCard，点击"复制地址给司机"按钮，确认地址被复制到剪贴板，按钮变绿并显示"已复制！"，2秒后恢复。

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add TaxiCard component with clipboard copy"
```

---

### Task 8: 入住须知区块

**Files:**
- Create: `src/data/checkin.ts`
- Create: `src/components/CheckinSection.tsx`

**Step 1: 创建入住数据文件**

`src/data/checkin.ts`:

```typescript
export const checkinData = {
  wifi: {
    name: 'YanyuJian_WiFi',        // ← 填入实际 Wi-Fi 名称
    password: '********',           // ← 填入实际密码
  },
  checkinTime: '14:00',
  checkoutTime: '12:00',
  curfew: '23:00 – 翌日 07:00 门禁（需刷卡）',
  contact: {
    wechat: 'yanyujian_hostel',    // ← 填入实际微信
    phone: '+86-744-XXXXXXXX',     // ← 填入实际电话
  },
  rules: [
    { icon: '🚭', zh: '全楼禁烟', en: 'No smoking anywhere in the building' },
    { icon: '🔇', zh: '22:00后请保持安静', en: 'Quiet hours after 22:00' },
    { icon: '🥾', zh: '入室请换拖鞋', en: 'Please change to slippers indoors' },
    { icon: '🗑️', zh: '垃圾请分类投放', en: 'Please sort your waste' },
    { icon: '🔑', zh: '离开时请随手关门', en: 'Please close the door when leaving' },
  ],
}
```

**Step 2: 创建入住须知区块**

`src/components/CheckinSection.tsx`:

```tsx
import { useTranslations, useLocale } from 'next-intl'
import { checkinData } from '@/data/checkin'

export default function CheckinSection() {
  const t = useTranslations('checkin')
  const locale = useLocale()
  const isEn = locale === 'en'

  return (
    <section id="checkin" className="py-20 px-4 bg-white/40">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl text-stone text-center mb-12">{t('title')}</h2>

        {/* 关键信息卡片网格 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: t('wifi_name'), value: checkinData.wifi.name, icon: '📶' },
            { label: t('wifi_password'), value: checkinData.wifi.password, icon: '🔐' },
            { label: t('checkin_time'), value: checkinData.checkinTime, icon: '🛏️' },
            { label: t('checkout_time'), value: checkinData.checkoutTime, icon: '🕛' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-linen rounded-xl p-4 text-center border border-sand/20">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="text-stone/50 text-xs mb-1">{label}</p>
              <p className="font-bold text-stone">{value}</p>
            </div>
          ))}
        </div>

        {/* 注意事项列表 */}
        <div className="bg-linen rounded-2xl p-6 border border-sand/20">
          <h3 className="font-serif text-xl text-stone mb-4">
            {isEn ? 'House Rules' : '温馨提示'}
          </h3>
          <ul className="space-y-3">
            {checkinData.rules.map((rule, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-xl">{rule.icon}</span>
                <span className="text-stone/80">{isEn ? rule.en : rule.zh}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 联系方式 */}
        <div className="mt-6 bg-sand/10 rounded-xl p-4 text-center border border-sand/30">
          <p className="text-stone/60 text-sm mb-2">{t('contact')}</p>
          <p className="font-bold text-stone">WeChat: {checkinData.contact.wechat}</p>
          <p className="font-bold text-stone">{checkinData.contact.phone}</p>
        </div>
      </div>
    </section>
  )
}
```

**Step 3: 加入主页**

在 `page.tsx` 中加入 `<CheckinSection />`。

**Step 4: 验证**

入住须知区块显示正常，中英文切换内容正确，Wi-Fi 卡片、注意事项、联系方式均可见。

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Check-in Info section"
```

---

### Task 9: 酒店故事区块

**Files:**
- Create: `src/data/story.ts`
- Create: `src/components/StorySection.tsx`

**Step 1: 创建故事数据**

`src/data/story.ts`:

```typescript
export const storyData = {
  hotel: {
    zh: '岩语间坐落于张家界市中心，由热爱砂石画艺术的老板亲手打造。这里不仅是一间青旅，更是一个艺术空间。每一面墙、每一幅画，都在讲述着岩石与自然之间的对话。',
    en: 'Yanyu Jian is nestled in the heart of Zhangjiajie, lovingly crafted by an artist passionate about sand painting. More than a hostel, it\'s an art space where every wall and painting tells a story of stone and nature.',
  },
  sandPainting: {
    zh: '砂石画是一种以天然彩砂为材料，在画板上创作山水、花鸟的传统艺术形式。岩语间的老板将张家界的奇峰异石融入画作，每一幅作品都是独一无二的自然礼物。',
    en: 'Sand painting is a traditional art form using natural colored sand to create landscapes and nature scenes. The owner blends Zhangjiajie\'s iconic peaks and stone formations into each unique piece — a natural gift you can take home.',
  },
  // 后续可替换为真实图片路径
  images: [
    '/images/sand-painting-1.jpg',
    '/images/sand-painting-2.jpg',
    '/images/sand-painting-3.jpg',
  ],
}
```

**Step 2: 创建故事区块**

`src/components/StorySection.tsx`:

```tsx
import { useTranslations, useLocale } from 'next-intl'
import { storyData } from '@/data/story'

export default function StorySection() {
  const t = useTranslations('story')
  const locale = useLocale()
  const isEn = locale === 'en'

  return (
    <section id="story" className="py-20 px-4 bg-linen">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl text-stone text-center mb-4">{t('title')}</h2>
        <div className="w-16 h-px bg-sand mx-auto mb-12" />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-stone/70 leading-relaxed text-lg">
              {isEn ? storyData.hotel.en : storyData.hotel.zh}
            </p>
          </div>
          {/* 占位图 - 替换为实际酒店照片 */}
          <div className="aspect-square bg-stone/10 rounded-2xl flex items-center justify-center border-2 border-dashed border-sand/30">
            <span className="text-stone/30 text-sm">酒店照片</span>
          </div>
        </div>

        {/* 砂石画介绍 */}
        <div className="bg-stone rounded-2xl p-8 text-linen">
          <h3 className="font-serif text-2xl mb-4 text-sand">{t('art_title')}</h3>
          <p className="text-linen/70 leading-relaxed">
            {isEn ? storyData.sandPainting.en : storyData.sandPainting.zh}
          </p>

          {/* 作品图片占位 */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {storyData.images.map((_, i) => (
              <div key={i} className="aspect-square bg-linen/10 rounded-xl flex items-center justify-center border border-linen/20">
                <span className="text-linen/30 text-xs">作品 {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Step 3: 加入主页**

**Step 4: 验证**

故事区块正常显示，深色背景的砂石画介绍区域对比鲜明，图片占位符清晰。

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Hotel Story section with sand painting intro"
```

---

### Task 10: 张家界指南区块

**Files:**
- Create: `src/data/guide.ts`
- Create: `src/components/GuideSection.tsx`

**Step 1: 创建旅游指南数据**

`src/data/guide.ts`:

```typescript
export const guideData = {
  attractions: [
    {
      nameZh: '张家界国家森林公园',
      nameEn: 'Zhangjiajie National Forest Park',
      descZh: '世界首个国家森林公园，阿凡达取景地，石英砂岩峰林绝景。',
      descEn: 'The world\'s first national forest park and filming location for Avatar. Towering sandstone pillars rise from mist.',
      tips: { zh: '建议游览2天，购两日票更划算', en: 'Allow 2 days. A 2-day ticket is better value.' },
      icon: '🏔️',
    },
    {
      nameZh: '天门山',
      nameEn: 'Tianmen Mountain',
      descZh: '亚洲最高海拔公路+玻璃栈道+天门洞，缆车全程约30分钟。',
      descEn: 'Asia\'s highest altitude road, glass walkway, and the Tianmen Cave. Cable car takes ~30 minutes.',
      tips: { zh: '索道单程约30分钟，注意保暖', en: 'Cable car ~30 min each way. Bring a jacket — it gets cold at the top.' },
      icon: '🌫️',
    },
    {
      nameZh: '玻璃桥（大峡谷）',
      nameEn: 'Glass Bridge (Grand Canyon)',
      descZh: '世界最长最高玻璃桥，需提前网上购票。',
      descEn: 'World\'s longest and highest glass bridge. Book tickets online in advance.',
      tips: { zh: '需提前购票，不接受现场购票', en: 'Advance online booking required — no on-site tickets.' },
      icon: '🌉',
    },
    {
      nameZh: '黄龙洞',
      nameEn: 'Yellow Dragon Cave',
      descZh: '亚洲最壮观的溶洞之一，钟乳石奇景令人叹为观止。',
      descEn: 'One of Asia\'s most spectacular caves, with breathtaking stalactite formations.',
      tips: { zh: '游览约1.5小时', en: 'Allow ~1.5 hours.' },
      icon: '🦕',
    },
  ],
  transport: {
    fromAirport: {
      zh: '荷花机场到市区约45分钟车程，可乘坐机场巴士或出租车。',
      en: 'Hehua Airport to city center is ~45 minutes by airport shuttle or taxi.',
    },
    fromStation: {
      zh: '张家界西高铁站到市区约20分钟，出站后乘地铁1号线或打车。',
      en: 'Zhangjiajie West Railway Station to city center is ~20 minutes by metro Line 1 or taxi.',
    },
    taxiTips: {
      zh: '市区出租车起步价7元，建议使用滴滴打车，更便宜且有英文界面。',
      en: 'City taxis start at ¥7. DiDi (Chinese Uber) is cheaper and has an English interface.',
    },
  },
  taxiDestinations: [
    {
      nameEn: 'Yanyu Jian Hostel (Here)',
      nameZh: '岩语间青旅',
      addressZh: '湖南省张家界市永定区XXX路XX号岩语间青旅',  // ← 填入实际地址
      note: 'Show this to get back to the hostel',
    },
    {
      nameEn: 'Zhangjiajie National Forest Park (Main Gate)',
      nameZh: '张家界国家森林公园（正门）',
      addressZh: '湖南省张家界市武陵源区张家界国家森林公园正门',
    },
    {
      nameEn: 'Tianmen Mountain Cable Car Station',
      nameZh: '天门山索道站',
      addressZh: '湖南省张家界市永定区天门山景区索道站',
    },
    {
      nameEn: 'Zhangjiajie West Railway Station',
      nameZh: '张家界西站（高铁站）',
      addressZh: '湖南省张家界市永定区张家界西站',
    },
    {
      nameEn: 'Hehua Airport',
      nameZh: '荷花机场',
      addressZh: '湖南省张家界市荷花国际机场',
    },
  ],
  food: [
    {
      nameZh: '土家三下锅',
      nameEn: 'Tujia Three-Ingredient Hot Pot',
      descZh: '土家族传统美食，猪肚、猪蹄、香肠同锅，香辣下饭。',
      descEn: 'Traditional Tujia dish — pork tripe, trotters, and sausage in a spicy broth.',
      icon: '🍲',
    },
    {
      nameZh: '张家界米豆腐',
      nameEn: 'Zhangjiajie Rice Tofu',
      descZh: '米浆制成的嫩豆腐，淋上辣椒酱，清爽又开胃。',
      descEn: 'Silky tofu made from rice milk, topped with chili sauce. Light and refreshing.',
      icon: '🫘',
    },
    {
      nameZh: '社饭',
      nameEn: 'She Fan (Herb Rice)',
      descZh: '土家族传统节日食物，混入野菜和腊肉的香糯米饭。',
      descEn: 'Traditional Tujia festival food: sticky rice mixed with wild herbs and cured pork.',
      icon: '🍚',
    },
    {
      nameZh: '葛根粉',
      nameEn: 'Kudzu Root Powder Drink',
      descZh: '天然葛根制成，清热解毒，景区内随处可见。',
      descEn: 'A natural herbal drink made from kudzu root. Cooling and detoxifying — sold everywhere near the parks.',
      icon: '🥤',
    },
  ],
  tips: [
    {
      icon: '📱',
      titleZh: '必备 App',
      titleEn: 'Essential Apps',
      descZh: '滴滴（打车）、美团（外卖/订餐）、微信（支付+通讯）、支付宝（支付）',
      descEn: 'DiDi (taxi), Meituan (food delivery/dining), WeChat (payments + messaging), Alipay (payments)',
    },
    {
      icon: '💳',
      titleZh: '移动支付',
      titleEn: 'Mobile Payment',
      descZh: '中国大部分商家只接受微信支付或支付宝，建议提前绑定境外信用卡开通。',
      descEn: 'Most shops only accept WeChat Pay or Alipay. Link a foreign credit card to one of these before you arrive.',
    },
    {
      icon: '🌤️',
      titleZh: '最佳旅游季节',
      titleEn: 'Best Time to Visit',
      descZh: '4–6月（春）和9–11月（秋）最佳，7–8月人多且热，冬季山顶常有云海奇景。',
      descEn: 'April–June (spring) and September–November (autumn) are best. July–August is crowded and hot. Winter offers stunning sea-of-clouds views at the peaks.',
    },
    {
      icon: '🌐',
      titleZh: 'VPN / 上网',
      titleEn: 'Internet & VPN',
      descZh: 'Google、Instagram、WhatsApp在中国需要VPN才能使用，建议出发前在国内下载好。',
      descEn: 'Google, Instagram, and WhatsApp require a VPN in China. Download and set up your VPN before arriving.',
    },
    {
      icon: '🎫',
      titleZh: '景点购票',
      titleEn: 'Booking Tickets',
      descZh: '热门景点（尤其玻璃桥）需提前网上购票，部分景点节假日须提前3–7天。',
      descEn: 'Popular attractions (especially the Glass Bridge) require advance online booking. Peak holidays may need 3–7 days in advance.',
    },
  ],
  emergency: [
    { label: 'Police / 报警', number: '110' },
    { label: 'Ambulance / 急救', number: '120' },
    { label: 'Fire / 火警', number: '119' },
    { label: 'Tourism Complaint / 旅游投诉', number: '12301' },
    { label: 'Zhangjiajie Hospital / 张家界市人民医院', number: '+86-744-8222120' },
    { label: 'Hostel Emergency / 青旅紧急联系', number: '+86-XXXXXXXXX' },  // ← 填入实际
  ],
}
```

**Step 2: 创建指南区块**（这是最大的区块，分 tabs 展示）

`src/components/GuideSection.tsx`:

```tsx
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
  const isEn = locale === 'en'

  const tabs: { key: Tab; label: string }[] = [
    { key: 'attractions', label: t('attractions') },
    { key: 'transport', label: t('transport') },
    { key: 'food', label: t('food') },
    { key: 'tips', label: t('tips') },
    { key: 'emergency', label: t('emergency') },
  ]

  return (
    <section id="guide" className="py-20 px-4 bg-white/40">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl text-stone text-center mb-4">{t('title')}</h2>
        <div className="w-16 h-px bg-sand mx-auto mb-10" />

        {/* Tab 导航 */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeTab === key
                  ? 'bg-sand text-white shadow-sm'
                  : 'bg-linen text-stone border border-sand/30 hover:bg-sand/10'
                }`}
            >
              {label}
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
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-stone text-lg">{isEn ? a.nameEn : a.nameZh}</h3>
                    <p className="text-stone/60 text-sm mb-2">{isEn ? a.nameZh : a.nameEn}</p>
                    <p className="text-stone/70">{isEn ? a.descEn : a.descZh}</p>
                    <p className="text-moss text-sm mt-2 flex items-center gap-1">
                      <span>💡</span> {isEn ? a.tips.en : a.tips.zh}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 交通 */}
        {activeTab === 'transport' && (
          <div className="space-y-6">
            <div className="bg-linen rounded-2xl p-5 border border-sand/20 space-y-4">
              <div>
                <h3 className="font-bold text-stone mb-1">✈️ {isEn ? 'From Airport' : '从机场'}</h3>
                <p className="text-stone/70">{isEn ? guideData.transport.fromAirport.en : guideData.transport.fromAirport.zh}</p>
              </div>
              <div>
                <h3 className="font-bold text-stone mb-1">🚄 {isEn ? 'From Train Station' : '从高铁站'}</h3>
                <p className="text-stone/70">{isEn ? guideData.transport.fromStation.en : guideData.transport.fromStation.zh}</p>
              </div>
              <div>
                <h3 className="font-bold text-stone mb-1">🚕 {isEn ? 'Getting Around by Taxi' : '市内打车'}</h3>
                <p className="text-stone/70">{isEn ? guideData.transport.taxiTips.en : guideData.transport.taxiTips.zh}</p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl text-stone mb-4">
                {isEn ? '📍 Taxi Destination Cards' : '📍 打车目的地卡片'}
              </h3>
              <p className="text-stone/50 text-sm mb-4">
                {isEn ? 'Tap to copy the Chinese address, then show it to your taxi driver.' : '点击复制中文地址，展示给司机即可。'}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {guideData.taxiDestinations.map((dest) => (
                  <TaxiCard key={dest.nameEn} {...dest} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 美食 */}
        {activeTab === 'food' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {guideData.food.map((item) => (
              <div key={item.nameEn} className="bg-linen rounded-2xl p-5 border border-sand/20">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-serif font-bold text-stone">{isEn ? item.nameEn : item.nameZh}</h3>
                <p className="text-stone/50 text-sm mb-2">{isEn ? item.nameZh : item.nameEn}</p>
                <p className="text-stone/70 text-sm">{isEn ? item.descEn : item.descZh}</p>
              </div>
            ))}
          </div>
        )}

        {/* 实用贴士 */}
        {activeTab === 'tips' && (
          <div className="space-y-4">
            {guideData.tips.map((tip) => (
              <div key={tip.titleEn} className="bg-linen rounded-2xl p-5 border border-sand/20 flex gap-4">
                <span className="text-3xl">{tip.icon}</span>
                <div>
                  <h3 className="font-bold text-stone mb-1">{isEn ? tip.titleEn : tip.titleZh}</h3>
                  <p className="text-stone/70 text-sm">{isEn ? tip.descEn : tip.descZh}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 紧急联系 */}
        {activeTab === 'emergency' && (
          <div className="space-y-3">
            {guideData.emergency.map((item) => (
              <div key={item.label} className="flex items-center justify-between bg-linen rounded-xl px-5 py-4 border border-sand/20">
                <span className="text-stone font-medium">{item.label}</span>
                <a href={`tel:${item.number}`} className="font-bold text-sand text-lg hover:text-sand/70">
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
```

**Step 3: 加入主页**

**Step 4: 验证**

五个 Tab 均可切换，打车卡片复制功能正常，紧急电话可点击拨号，中英文内容切换正常。

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Zhangjiajie Guide section with tabs and taxi cards"
```

---

### Task 11: Footer 和整体收尾

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/[locale]/page.tsx` （组装所有区块）

**Step 1: 创建 Footer**

`src/components/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="bg-stone text-linen/50 py-8 text-center text-sm">
      <p className="font-serif text-linen/80 text-lg mb-1">岩语间 · Yanyu Jian</p>
      <p>张家界砂石画艺术青旅</p>
      <p className="mt-4 text-xs text-linen/30">© 2026 岩语间. All rights reserved.</p>
    </footer>
  )
}
```

**Step 2: 组装主页**

`src/app/[locale]/page.tsx`:

```tsx
import HeroSection from '@/components/HeroSection'
import CheckinSection from '@/components/CheckinSection'
import StorySection from '@/components/StorySection'
import GuideSection from '@/components/GuideSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="pt-14">
      <HeroSection />
      <CheckinSection />
      <StorySection />
      <GuideSection />
      <Footer />
    </main>
  )
}
```

**Step 3: 验证整体页面**

完整浏览整个页面，确认：
- 所有区块按顺序展示
- 导航栏平滑滚动到对应区块
- 语言切换中英文均正常
- 移动端响应式布局正常（浏览器开发者工具手机模式）
- 打车卡片复制功能正常

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: assemble full page with all sections and footer"
```

---

### Task 12: Vercel 部署

**Files:**
- Create: `vercel.json`

**Step 1: 创建 vercel.json**

```json
{
  "rewrites": [
    { "source": "/", "destination": "/en" }
  ]
}
```

> 注意：根路径 `/` 重定向到 `/en`（英文），因为这个网站主要给外国游客扫码使用。如果希望默认中文，改为 `/zh`。

**Step 2: 推送代码到 GitHub**

```bash
git remote add origin https://github.com/<your-username>/yanyujian.git
git push -u origin main
```

**Step 3: Vercel 部署**

1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库
3. Framework Preset 自动识别为 Next.js，无需额外配置
4. 点击 Deploy

**Step 4: 验证部署**

访问 Vercel 提供的域名，确认：
- 根路径自动重定向到 `/en`
- 语言切换正常
- 打车卡片复制功能在手机上正常工作

**Step 5: 生成二维码**

将 Vercel 域名（如 `yanyujian.vercel.app`）输入任意二维码生成器，打印后放在前台。

**Step 6: Commit**

```bash
git add vercel.json
git commit -m "feat: add Vercel deployment config with English default redirect"
```

---

## 后续工作（不在当前计划内）

- [ ] 替换占位图为真实酒店/砂石画照片
- [ ] 填入真实 Wi-Fi 名称、密码、电话、地址
- [ ] 添加日文 (`ja`) 和韩文 (`ko`) 翻译
- [ ] 可选：添加自定义域名
