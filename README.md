# 岩语间 · 文青旅舍 — Yanyujian Hostel

**Live site → [yanyujian.xyz](https://yanyujian.xyz)**

A multilingual guest-information website for **岩语间·文青旅舍** (Yanyujian Artsy Youth Hostel), nestled in Zhangjiajie, Hunan, China. The site covers check-in essentials, a Zhangjiajie travel guide, and the story behind the hostel's signature sand-painting art — in Chinese, English, Japanese, and Korean.

---

## Features

| Section | Description |
|---------|-------------|
| **Hero** | Full-screen Zhangjiajie mountain backdrop with sepia ink overlay |
| **Check-in Info** | Wi-Fi credentials, check-in / check-out times, curfew, front-desk contact |
| **Travel Guide** | Getting there, core attractions, transport, food, practical tips, emergency contacts |
| **Our Story** | About the hostel and its sand-painting art style |
| **Language switcher** | Seamless zh / en / ja / ko toggle in the navbar |

---

## Tech Stack

| Tool | Version |
|------|---------|
| [Next.js](https://nextjs.org) | 16 (App Router) |
| React | 19 |
| TypeScript | 5 |
| [Tailwind CSS](https://tailwindcss.com) | 4 |
| [next-intl](https://next-intl.dev) | 4 |
| Deployment | Vercel |

> **Note:** This project uses Next.js 16, which has breaking changes from earlier versions. Before touching framework code, read the relevant guide in `node_modules/next/dist/docs/`.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root `/` redirects to `/en`; visit `/zh`, `/ja`, or `/ko` for other locales.

---

## Project Structure

```
src/
├── app/
│   └── [locale]/          # Locale-prefixed routes (zh / en / ja / ko)
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── HeroSection.tsx
│   ├── CheckinSection.tsx
│   ├── GuideSection.tsx
│   ├── StorySection.tsx
│   ├── Navbar.tsx
│   ├── LanguageSwitcher.tsx
│   ├── TaxiCard.tsx
│   └── Footer.tsx
├── data/                  # Static content (check-in details, guide, story)
│   ├── checkin.ts
│   ├── guide.ts
│   └── story.ts
└── i18n/
    ├── routing.ts         # Locale list and default locale
    └── request.ts

messages/                  # Translation strings
├── zh.json
├── en.json
├── ja.json
└── ko.json
```

---

## Updating Content

Most guest-facing content lives in two places:

### UI labels and short strings — `messages/<locale>.json`

Edit the relevant `messages/*.json` file to change navigation labels, section headings, button text, or short phrases. Changes apply to all four languages independently.

### Richer content blocks — `src/data/`

| File | What it controls |
|------|-----------------|
| `checkin.ts` | Wi-Fi name/password, times, front-desk phone number |
| `guide.ts` | Attraction cards, transport tips, food recommendations, emergency numbers |
| `story.ts` | Hostel story paragraphs and art description |

### Adding a new language

1. Add the locale code to the `locales` array in `src/i18n/routing.ts`.
2. Create a matching `messages/<locale>.json` (copy `en.json` as a starting point).
3. Add translated content objects in `src/data/` as needed.

---

## Deployment

The project deploys automatically to **Vercel** on every push to `main`. No manual steps required.

To deploy a preview branch, open a pull request — Vercel will comment a preview URL automatically.
