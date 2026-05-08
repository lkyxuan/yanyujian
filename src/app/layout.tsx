import type { Metadata } from "next";
import { Playfair_Display, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "岩语间 · Yanyu Jian",
  description: "张家界砂石画艺术青旅 | Sand Painting Art Hostel in Zhangjiajie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className={`${playfair.variable} ${notoSerifSC.variable} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
