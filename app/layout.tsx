import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import BackToTop from "@/components/BackToTop";
import FloatingContact from "@/components/FloatingContact";
import ActivityTracker from "@/components/ActivityTracker";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AITaoPage — Tạo nội dung HTML đẹp với AI trong 60 giây",
  description: "Công cụ AI giúp người sáng tạo nội dung Việt Nam tạo khối HTML chuẩn CSS chỉ trong 60 giây. Kéo thả, chỉnh sửa, sao chép vào CMS ngay lập tức.",
  keywords: "tạo landing page, AI viết content, tạo trang web HTML, công cụ AI Việt Nam, tạo nội dung AI, AITaoPage",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "AITaoPage — Tạo nội dung HTML đẹp với AI trong 60 giây",
    description: "Công cụ AI giúp người sáng tạo nội dung Việt Nam tạo khối HTML chuẩn CSS chỉ trong 60 giây. Kéo thả, chỉnh sửa, sao chép vào CMS ngay lập tức.",
    url: SITE_URL,
    siteName: "AITaoPage",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AITaoPage — Tạo nội dung HTML với AI",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AITaoPage — Tạo nội dung HTML đẹp với AI trong 60 giây",
    description: "Công cụ AI giúp người sáng tạo nội dung Việt Nam tạo khối HTML chuẩn CSS chỉ trong 60 giây.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${beVietnamPro.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <NextTopLoader color="#4f46e5" height={3} showSpinner={false} />
        <ActivityTracker />
        {children}
        <BackToTop />
        <FloatingContact />
      </body>
    </html>
  );
}
