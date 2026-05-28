'use client'

import { useState, useRef } from 'react'
import {
  User, Phone, Lock, Crown, Zap,
  CheckCircle2, Loader2, Camera, Eye, EyeOff, ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const PLAN_LABEL: Record<string, string> = { free: 'Miễn phí', basic: 'Basic', pro: 'Pro' }
const PLAN_COLOR: Record<string, string> = {
  free:  'bg-gray-100 text-gray-600',
  basic: 'bg-blue-100 text-blue-700',
  pro:   'bg-amber-100 text-amber-700',
}

function UsageBar({ used, limit, label }: { used: number; limit: number; label: string }) {
  const unlimited = !isFinite(limit)
  const pct = unlimited ? 0 : Math.min(100, (used / limit) * 100)
  const near = pct >= 80
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">{label}</span>
        <span className={`font-semibold ${near ? 'text-red-500' : 'text-gray-700'}`}>
          {unlimited ? `${used} / ∞` : `${used} / ${limit}`}
        </span>
      </div>
      {!unlimited && (
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${near ? 'bg-red-400' : 'bg-indigo-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  )
}

interface ProfileData {
  email: string; fullName: string; phone: string; avatarUrl: string
  plan: string; planExpiresAt: string | null
  generationsUsed: number; generationsLimit: number
  credits: number
}

export default function ProfileClient({ initialData }: { initialData: ProfileData }) {
  const [data, setData]           = useState(initialData)
  const [fullName, setFullName]   = useState(initialData.fullName)
  const [phone, setPhone]         = useState(initialData.phone)
  const [infoSaving, setInfoSaving]   = useState(false)
  const [infoMsg, setInfoMsg]         = useState<{ ok: boolean; text: string } | null>(null)

  const [curPw, setCurPw]         = useState('')
  const [newPw, setNewPw]         = useState('')
  const [showCur, setShowCur]     = useState(false)
  const [showNew, setShowNew]     = useState(false)
  const [pwSaving, setPwSaving]   = useState(false)
  const [pwMsg, setPwMsg]         = useState<{ ok: boolean; text: string } | null>(null)

  const [avatarUploading, setAvatarUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const input = `w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900
    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors`

  async function handleSaveInfo() {
    setInfoSaving(true); setInfoMsg(null)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setData(d => ({ ...d, fullName, phone }))
      setInfoMsg({ ok: true, text: 'Đã lưu thông tin.' })
    } catch (e: any) {
      setInfoMsg({ ok: false, text: e.message ?? 'Lỗi lưu thông tin.' })
    } finally {
      setInfoSaving(false)
      setTimeout(() => setInfoMsg(null), 3000)
    }
  }

  async function handleChangePassword() {
    if (newPw.length < 8) { setPwMsg({ ok: false, text: 'Mật khẩu mới phải có ít nhất 8 ký tự.' }); return }
    setPwSaving(true); setPwMsg(null)
    try {
      const res = await fetch('/api/profile/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: curPw, newPassword: newPw }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setPwMsg({ ok: true, text: 'Đổi mật khẩu thành công.' })
      setCurPw(''); setNewPw('')
    } catch (e: any) {
      setPwMsg({ ok: false, text: e.message ?? 'Lỗi đổi mật khẩu.' })
    } finally {
      setPwSaving(false)
      setTimeout(() => setPwMsg(null), 4000)
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarUploading(true)
    try {
      const fd = new FormData(); fd.append('files', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      const url = json.data?.[0]?.src as string
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarUrl: url }),
      })
      setData(d => ({ ...d, avatarUrl: url }))
    } catch (e: any) {
      alert(e.message ?? 'Upload thất bại')
    } finally {
      setAvatarUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const expiry = data.planExpiresAt ? new Date(data.planExpiresAt) : null

  return (
    <div className="grid md:grid-cols-5 gap-6">

      {/* ── Left column ── */}
      <div className="md:col-span-2 space-y-5">

        {/* Avatar card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center ring-4 ring-white shadow-md">
              {data.avatarUrl ? (
                <Image src={data.avatarUrl} alt="avatar" width={96} height={96} className="object-cover w-full h-full" />
              ) : (
                <User className="w-10 h-10 text-indigo-400" />
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={avatarUploading}
              className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-indigo-700 transition-colors disabled:opacity-60"
              title="Thay ảnh đại diện"
            >
              {avatarUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">{data.fullName || data.email}</p>
            <p className="text-sm text-gray-400">{data.email}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${PLAN_COLOR[data.plan]}`}>
            {data.plan !== 'free' && <Crown className="w-3 h-3" />}
            {PLAN_LABEL[data.plan] ?? data.plan}
          </span>
        </div>

        {/* Plan & usage card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 text-sm">Gói & lượt sử dụng</h3>

          {expiry && (
            <p className="text-xs text-gray-500">
              Hết hạn: <span className="font-medium text-gray-700">{expiry.toLocaleDateString('vi-VN')}</span>
            </p>
          )}

          <div className="space-y-3">
            <UsageBar used={data.generationsUsed} limit={data.generationsLimit} label="Lượt tạo nội dung tháng này" />
          </div>

          <div className="border-t border-gray-100 pt-3">
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1 text-gray-500"><Zap className="w-3.5 h-3.5 text-amber-500" />Credits tích lũy</span>
              <span className="font-semibold text-gray-800">{data.credits} lượt</span>
            </div>
          </div>

          {data.plan === 'free' && (
            <Link href="/#pricing" className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:opacity-90 transition-opacity">
              <Crown className="w-3.5 h-3.5" /> Nâng cấp gói <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* ── Right column ── */}
      <div className="md:col-span-3 space-y-5">

        {/* Personal info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-5">Thông tin cá nhân</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <input value={data.email} disabled className={`${input} bg-gray-50 text-gray-400 cursor-not-allowed pl-10`} />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Email không thể thay đổi.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ và tên</label>
              <div className="relative">
                <input
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className={`${input} pl-10`}
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại</label>
              <div className="relative">
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="0912 345 678"
                  type="tel"
                  className={`${input} pl-10`}
                />
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {infoMsg && (
              <p className={`text-sm px-3 py-2 rounded-lg border ${infoMsg.ok ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                {infoMsg.ok && <CheckCircle2 className="inline w-3.5 h-3.5 mr-1" />}{infoMsg.text}
              </p>
            )}

            <button
              onClick={handleSaveInfo}
              disabled={infoSaving}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {infoSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              Lưu thông tin
            </button>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-500" /> Đổi mật khẩu
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu hiện tại</label>
              <div className="relative">
                <input
                  type={showCur ? 'text' : 'password'}
                  value={curPw}
                  onChange={e => setCurPw(e.target.value)}
                  placeholder="••••••••"
                  className={`${input} pl-10 pr-11`}
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button type="button" onClick={() => setShowCur(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showCur ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu mới</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPw}
                  onChange={e => setNewPw(e.target.value)}
                  placeholder="Ít nhất 8 ký tự"
                  className={`${input} pl-10 pr-11`}
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {pwMsg && (
              <p className={`text-sm px-3 py-2 rounded-lg border ${pwMsg.ok ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                {pwMsg.ok && <CheckCircle2 className="inline w-3.5 h-3.5 mr-1" />}{pwMsg.text}
              </p>
            )}

            <button
              onClick={handleChangePassword}
              disabled={pwSaving || !curPw || !newPw}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {pwSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              Đổi mật khẩu
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
