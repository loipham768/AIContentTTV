import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import CreatePageClient from "@/components/create/CreatePageClient";

export const metadata: Metadata = {
  title: "T-intelligate Editor - Create Business Documents with AI",
  description:
    "Create professional reports, proposals, case studies, meeting minutes, and quotations with AI in minutes.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "T-intelligate Editor - Create Business Documents with AI",
    description:
      "Create professional reports, proposals, case studies, meeting minutes, and quotations with AI in minutes.",
    url: `${SITE_URL}/create`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export const runtime = "nodejs";

export default function CreatePage() {
  return <CreatePageClient plan="pro" />;
}
