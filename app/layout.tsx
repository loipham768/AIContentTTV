import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
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
  title: "TaoPage — Create beautiful HTML content with AI in 60 seconds",
  description: "AI tool that helps content creators build standard CSS HTML blocks in 60 seconds. Drag & drop, edit, and paste into your CMS instantly.",
  keywords: "create landing page, AI content writing, create HTML webpage, AI tool, AI content creation, TaoPage",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [{ url: '/taopage-favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: "TaoPage — Create beautiful HTML content with AI in 60 seconds",
    description: "AI tool that helps content creators build standard CSS HTML blocks in 60 seconds. Drag & drop, edit, and paste into your CMS instantly.",
    url: SITE_URL,
    siteName: "TaoPage",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaoPage — Create HTML content with AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaoPage — Create beautiful HTML content with AI in 60 seconds",
    description: "AI tool that helps content creators build standard CSS HTML blocks in 60 seconds.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${beVietnamPro.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <NextTopLoader color="#4f46e5" height={3} showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
