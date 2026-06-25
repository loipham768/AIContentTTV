import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import { getUserPlanInfo } from "@/lib/planGate";
import ProfileClient from "@/components/profile/ProfileClient";
import Logo from "@/components/Logo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const runtime = "nodejs";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await dbConnect();
  const user = (await User.findById(session.user.id, {
    passwordHash: 0,
  }).lean()) as any;
  if (!user) redirect("/login");

  const planInfo = await getUserPlanInfo(session.user.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-x-hidden">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo iconSize={60} uid="profile-h" />
          <Link
            href={planInfo?.plan === "designer" ? "/editor" : "/create"}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {planInfo?.plan === "designer" ? "Trình soạn thảo" : "Tạo nội dung"}
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 md:mb-8">
          Hồ sơ cá nhân
        </h1>
        <ProfileClient
          initialData={{
            email: user.email as string,
            fullName: user.fullName ?? "",
            phone: user.phone ?? "",
            avatarUrl: user.avatarUrl ?? "",
            plan: planInfo?.plan ?? "free",
            planExpiresAt: planInfo?.planExpiresAt ?? null,
            generationsUsed: planInfo?.generationsUsed ?? 0,
            generationsLimit: planInfo?.generationsLimit ?? 4,
            credits: planInfo?.credits ?? 0,
            creditsTotal: planInfo?.creditsTotal ?? 0,
          }}
        />
      </main>
    </div>
  );
}
