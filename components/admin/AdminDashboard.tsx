"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Users,
  LayoutTemplate,
  ShoppingCart,
  CheckCircle2,
  Clock,
  XCircle,
  Hourglass,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  X,
} from "lucide-react";
import ActivateUserButton from "./ActivateUserButton";
import ToggleUserButton from "./ToggleUserButton";
import DeleteProjectButton from "./DeleteProjectButton";
import ActivateOrderButton from "./ActivateOrderButton";
import RejectOrderButton from "./RejectOrderButton";
import DeleteOrderButton from "./DeleteOrderButton";
import DeleteUserButton from "./DeleteUserButton";
import { PLAN_LIMITS } from "@/lib/planConfig";
import { toTransferContent } from "@/lib/orderUtils";
import { ADMIN_PAGE_SIZE } from "@/lib/adminConfig";

export interface UserRow {
  _id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  isAdmin: boolean;
  paidUntil: string | null;
  plan: string;
  planExpiresAt: string | null;
  credits: number;
  creditsTotal: number;
  generationsUsed: number;
  projectCount: number;
  createdAt: string;
}

export interface ProjectRow {
  _id: string;
  userId: string;
  userEmail: string;
  name: string;
  prompt: string;
  createdAt: string;
}

export interface OrderRow {
  _id: string;
  orderId: string;
  userId: string;
  userEmail: string;
  type: string;
  plan: string | null;
  billing: string;
  creditsHtml: number;
  amount: number;
  status: string;
  expiresAt: string;
  activatedAt: string | null;
  adminNote: string;
  paymentProofUrl: string | null;
  createdAt: string;
}

interface Props {
  initialOrders: OrderRow[];
  ordersTotal: number;
  ordersPage: number;
  initialUsers: UserRow[];
  usersTotal: number;
  usersPage: number;
  initialProjects: ProjectRow[];
  projectsTotal: number;
  projectsPage: number;
  pendingCount: number;
  meId: string;
}

type Tab = "users" | "content" | "orders";

const PAGE_SIZE = ADMIN_PAGE_SIZE;

const PLAN_LABELS: Record<string, string> = {
  free: "Free",
  basic: "Basic",
  pro: "Pro",
  designer: "Designer",
};

// If a "pending" order's expiresAt has passed, treat it as expired in the UI
function getEffectiveStatus(order: OrderRow): string {
  if (order.status === "pending" && new Date(order.expiresAt) < new Date()) {
    return "expired"
  }
  return order.status
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  awaiting_confirmation: "bg-blue-100 text-blue-700",
  paid: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-gray-100 text-gray-600",
  expired: "bg-red-100 text-red-600",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Chờ TT",
  awaiting_confirmation: "Chờ XN",
  paid: "Đã TT",
  cancelled: "Huỷ",
  expired: "Hết hạn",
};

function formatVnd(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}


function planLimit(plan: string): string {
  const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS];
  if (!limits) return "—";
  if (limits.generationsPerMonth === Infinity) return "∞";
  return String(limits.generationsPerMonth);
}

function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-8 pr-7 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 rounded-lg border border-gray-200 bg-white focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-200 w-52 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

function Pagination({
  page,
  total,
  onPage,
}: {
  page: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (totalPages <= 1) return null;

  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);

  const pages: (number | "ellipsis")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    )
      pages.push(i);
    if (page < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50/50">
      <span className="text-xs text-gray-500">
        {start}–{end} / {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => onPage(page - 1)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span
              key={`e${i}`}
              className="w-7 text-center text-xs text-gray-400"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p as number)}
              className={`w-7 h-7 text-xs rounded-lg font-medium transition-colors ${
                p === page
                  ? "bg-slate-800 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ),
        )}
        <button
          disabled={page === totalPages}
          onClick={() => onPage(page + 1)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard({
  initialUsers,
  initialProjects,
  initialOrders,
  ordersTotal,
  usersTotal,
  projectsTotal,
  ordersPage,
  usersPage,
  projectsPage,
  pendingCount,
  meId,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const VALID_TABS: Tab[] = ["orders", "users", "content"];
  const rawTab = searchParams.get("tab") as Tab | null;
  const tab: Tab = rawTab && VALID_TABS.includes(rawTab) ? rawTab : "orders";

  const setTab = useCallback(
    (t: Tab) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", t);
      // Reset pagination và search của tất cả tabs khi chuyển tab
      params.delete("op"); params.delete("up"); params.delete("pp");
      params.delete("oq"); params.delete("uq"); params.delete("pq");
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  // Local state for optimistic updates after admin actions (activate/reject/delete)
  const [users, setUsers] = useState(initialUsers);
  const [projects, setProjects] = useState(initialProjects);
  const [orders, setOrders] = useState(initialOrders);

  // Sync local state when server re-fetches on navigation
  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);
  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);
  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  // Controlled search inputs, initialized from current URL params
  const [ordersQ, setOrdersQ] = useState(searchParams.get("oq") ?? "");
  const [usersQ, setUsersQ] = useState(searchParams.get("uq") ?? "");
  const [projectsQ, setProjectsQ] = useState(searchParams.get("pq") ?? "");

  // Reset search inputs khi tab thay đổi (setTab đã xóa params khỏi URL)
  useEffect(() => {
    setOrdersQ(searchParams.get("oq") ?? "");
    setUsersQ(searchParams.get("uq") ?? "");
    setProjectsQ(searchParams.get("pq") ?? "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const ordersDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const usersDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const projectsDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const [proofModal, setProofModal] = useState<string | null>(null);

  function updateUser(userId: string, patch: Partial<UserRow>) {
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, ...patch } : u)),
    );
  }

  function removeUser(userId: string) {
    setUsers((prev) => prev.filter((u) => u._id !== userId));
    setProjects((prev) => prev.filter((p) => p.userId !== userId));
  }

  function updateOrder(orderId: string, patch: Partial<OrderRow>) {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, ...patch } : o)),
    );
  }

  function removeOrder(orderId: string) {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
  }

  function handleOrdersSearch(v: string) {
    setOrdersQ(v);
    if (ordersDebounceRef.current) clearTimeout(ordersDebounceRef.current);
    ordersDebounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      v ? params.set("oq", v) : params.delete("oq");
      params.delete("op");
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 350);
  }

  function handleUsersSearch(v: string) {
    setUsersQ(v);
    if (usersDebounceRef.current) clearTimeout(usersDebounceRef.current);
    usersDebounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      v ? params.set("uq", v) : params.delete("uq");
      params.delete("up");
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 350);
  }

  function handleProjectsSearch(v: string) {
    setProjectsQ(v);
    if (projectsDebounceRef.current) clearTimeout(projectsDebounceRef.current);
    projectsDebounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      v ? params.set("pq", v) : params.delete("pq");
      params.delete("pp");
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 350);
  }

  function goOrdersPage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("op", String(p));
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function goUsersPage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("up", String(p));
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function goProjectsPage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pp", String(p));
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  const tabBtn = (
    t: Tab,
    icon: React.ReactNode,
    label: string,
    count: number,
    urgent = false,
  ) => (
    <button
      key={t}
      onClick={() => setTab(t)}
      className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        tab === t
          ? "bg-white text-slate-900 shadow-sm border border-slate-200"
          : "text-slate-500 hover:text-slate-700 hover:bg-white/60"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
          urgent
            ? "bg-amber-100 text-amber-700"
            : tab === t
              ? "bg-slate-100 text-slate-600"
              : "bg-slate-200/80 text-slate-500"
        }`}
      >
        {count}
      </span>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {tabBtn(
          "orders",
          <ShoppingCart className="w-4 h-4" />,
          "Đơn hàng",
          ordersTotal,
          pendingCount > 0,
        )}
        {tabBtn(
          "users",
          <Users className="w-4 h-4" />,
          "Người dùng",
          usersTotal,
        )}
        {tabBtn(
          "content",
          <LayoutTemplate className="w-4 h-4" />,
          "Nội dung",
          projectsTotal,
        )}
      </div>

      {/* ── Orders ── */}
      {tab === "orders" && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex flex-wrap items-center gap-2">
            <h2 className="font-semibold text-gray-900 mr-auto">Đơn hàng</h2>
            {pendingCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5" /> {pendingCount} đơn cần xử lý
              </span>
            )}
            <SearchBox
              value={ordersQ}
              onChange={handleOrdersSearch}
              placeholder="Tìm mã đơn, email, trạng thái…"
            />
          </div>

          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm min-w-[960px]">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {[
                    "Mã đơn",
                    "Người dùng",
                    "Gói / Credits",
                    "Số tiền",
                    "Trạng thái",
                    "Ảnh CK",
                    "Tạo lúc",
                    "Hành động",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      Chưa có đơn hàng nào.
                    </td>
                  </tr>
                )}
                {orders.map((order) => {
                  const es = getEffectiveStatus(order);
                  return (
                  <tr
                    key={order._id}
                    className={`hover:bg-gray-50 transition-colors ${es === "awaiting_confirmation" ? "bg-blue-50/40" : es === "expired" ? "bg-red-50/30" : ""}`}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs font-bold text-indigo-700 block">
                        {order.orderId}
                      </span>
                      <span className="font-mono text-[10px] text-gray-400 block mt-0.5">
                        CK: {toTransferContent(order.orderId)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-600 max-w-[180px] truncate">
                      {order.userEmail}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-700">
                      {order.type === "subscription"
                        ? `${PLAN_LABELS[order.plan ?? ""] ?? order.plan} — ${order.billing === "yearly" ? "Năm" : "Tháng"}`
                        : `${order.creditsHtml} lượt`}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-gray-900 whitespace-nowrap">
                      {formatVnd(order.amount)}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[es] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {es === "paid" && <CheckCircle2 className="w-3 h-3" />}
                        {es === "pending" && <Clock className="w-3 h-3" />}
                        {es === "awaiting_confirmation" && <Hourglass className="w-3 h-3" />}
                        {(es === "cancelled" || es === "expired") && <XCircle className="w-3 h-3" />}
                        {STATUS_LABELS[es] ?? es}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {order.paymentProofUrl ? (
                        <button
                          onClick={() => setProofModal(order.paymentProofUrl)}
                          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                          <ImageIcon className="w-3.5 h-3.5" /> Xem ảnh
                        </button>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleString("vi-VN", {
                        hour12: false,
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {(es === "pending" || es === "awaiting_confirmation") && (
                          <>
                            <ActivateOrderButton
                              orderId={order.orderId}
                              onActivated={() =>
                                updateOrder(order.orderId, {
                                  status: "paid",
                                  activatedAt: new Date().toISOString(),
                                })
                              }
                            />
                            <RejectOrderButton
                              orderId={order.orderId}
                              onRejected={() =>
                                updateOrder(order.orderId, {
                                  status: "cancelled",
                                })
                              }
                            />
                          </>
                        )}
                        <DeleteOrderButton
                          orderId={order.orderId}
                          onDelete={() => removeOrder(order.orderId)}
                        />
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {orders.length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-gray-400">
                Chưa có đơn hàng nào.
              </div>
            )}
            {orders.map((order) => { const es = getEffectiveStatus(order); return (
              <div
                key={order._id}
                className={`p-4 space-y-2 ${es === "awaiting_confirmation" ? "bg-blue-50/40" : es === "expired" ? "bg-red-50/30" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-700 block">
                      {order.orderId}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400 block">
                      CK: {toTransferContent(order.orderId)}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[es] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {STATUS_LABELS[es] ?? es}
                  </span>
                </div>
                <p className="text-xs text-gray-600 truncate">
                  {order.userEmail}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-700">
                    {order.type === "subscription"
                      ? `${PLAN_LABELS[order.plan ?? ""] ?? order.plan} — ${order.billing === "yearly" ? "Năm" : "Tháng"}`
                      : `${order.creditsHtml} lượt`}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="font-semibold text-gray-900">
                    {formatVnd(order.amount)}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleString("vi-VN", {
                    hour12: false,
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {order.paymentProofUrl && (
                    <button
                      onClick={() => setProofModal(order.paymentProofUrl)}
                      className="flex items-center gap-1 text-xs text-blue-600 border border-blue-200 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <ImageIcon className="w-3 h-3" /> Xem ảnh CK
                    </button>
                  )}
                  {(es === "pending" || es === "awaiting_confirmation") && (
                    <>
                      <ActivateOrderButton
                        orderId={order.orderId}
                        onActivated={() =>
                          updateOrder(order.orderId, {
                            status: "paid",
                            activatedAt: new Date().toISOString(),
                          })
                        }
                      />
                      <RejectOrderButton
                        orderId={order.orderId}
                        onRejected={() =>
                          updateOrder(order.orderId, { status: "cancelled" })
                        }
                      />
                    </>
                  )}
                  <DeleteOrderButton
                    orderId={order.orderId}
                    onDelete={() => removeOrder(order.orderId)}
                  />
                </div>
              </div>
            ); })}
          </div>

          <Pagination
            page={ordersPage}
            total={ordersTotal}
            onPage={goOrdersPage}
          />
        </div>
      )}

      {/* ── Users ── */}
      {tab === "users" && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex flex-wrap items-center gap-2">
            <h2 className="font-semibold text-gray-900 mr-auto">Người dùng</h2>
            <span className="text-xs text-gray-400">{usersTotal}</span>
            <SearchBox
              value={usersQ}
              onChange={handleUsersSearch}
              placeholder="Tìm email, tên, gói…"
            />
          </div>

          {/* Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {[
                    "Email / Tên",
                    "Gói",
                    "Credits đã dùng / Đã mua",
                    "Khối tạo",
                    "Lượt T.này / Giới hạn",
                    "Hết hạn gói",
                    "Tham gia",
                    "Hành động",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className={`hover:bg-gray-50 transition-colors ${!user.isActive ? "opacity-60 bg-red-50/20" : ""}`}
                  >
                    <td className="px-4 py-3.5 max-w-[220px]">
                      <p className="font-medium text-gray-900 text-xs truncate">
                        {user.email}
                        {user._id === meId && (
                          <span className="ml-1.5 text-blue-400">(bạn)</span>
                        )}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {!user.isActive && (
                          <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                            Bị khoá
                          </span>
                        )}
                        {user.isAdmin && (
                          <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-medium">
                            Admin
                          </span>
                        )}
                        {user.fullName && (
                          <span className="text-[10px] text-gray-400">
                            {user.fullName}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                          user.plan === "pro"
                            ? "bg-amber-100 text-amber-700"
                            : user.plan === "basic"
                              ? "bg-blue-100 text-blue-700"
                              : user.plan === "designer"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {PLAN_LABELS[user.plan] ?? user.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs">
                      <span className="font-semibold text-gray-800">
                        {user.creditsTotal - user.credits}
                      </span>
                      <span className="text-gray-400">
                        {" "}
                        / {user.creditsTotal}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-center font-semibold text-gray-700">
                      {user.projectCount}
                    </td>
                    <td className="px-4 py-3.5 text-xs">
                      <span className="font-semibold text-gray-800">
                        {user.generationsUsed}
                      </span>
                      <span className="text-gray-400">
                        {" "}
                        / {planLimit(user.plan)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {user.planExpiresAt ? (
                        new Date(user.planExpiresAt).toLocaleDateString("vi-VN")
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-3.5">
                      {user._id !== meId ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <ActivateUserButton
                            userId={user._id}
                            isActive={user.isActive}
                            paidUntil={user.paidUntil}
                            onUpdate={(patch) => updateUser(user._id, patch)}
                          />
                          <ToggleUserButton
                            userId={user._id}
                            field="isAdmin"
                            currentValue={user.isAdmin}
                            label={["Bỏ Admin", "Cấp Admin"]}
                            variant="neutral"
                            onToggle={(v) =>
                              updateUser(user._id, { isAdmin: v })
                            }
                          />
                          <DeleteUserButton
                            userId={user._id}
                            onDelete={() => removeUser(user._id)}
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            {users.map((user) => (
              <div
                key={user._id}
                className={`p-4 space-y-2 ${!user.isActive ? "opacity-60 bg-red-50/20" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 break-all leading-tight">
                      {user.email}
                      {user._id === meId && (
                        <span className="ml-1.5 text-xs text-blue-400">
                          (bạn)
                        </span>
                      )}
                    </p>
                    {user.fullName && (
                      <p className="text-xs text-gray-400">{user.fullName}</p>
                    )}
                  </div>
                  <span
                    className={`flex-shrink-0 inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                      user.plan === "pro"
                        ? "bg-amber-100 text-amber-700"
                        : user.plan === "basic"
                          ? "bg-blue-100 text-blue-700"
                          : user.plan === "designer"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {PLAN_LABELS[user.plan] ?? user.plan}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {!user.isActive && (
                    <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                      Bị khoá
                    </span>
                  )}
                  {user.isAdmin && (
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-medium">
                      Admin
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs py-1">
                  <div className="flex gap-1.5">
                    <span className="text-gray-400">Credits còn:</span>
                    <span className="font-semibold text-gray-700">
                      {user.credits}
                    </span>
                    <span className="text-gray-400">
                      / {user.creditsTotal} đã mua
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-400">Khối tạo:</span>
                    <span className="font-semibold text-gray-700">
                      {user.projectCount}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-400">Lượt T.này:</span>
                    <span className="font-semibold text-gray-700">
                      {user.generationsUsed} / {planLimit(user.plan)}
                    </span>
                  </div>
                  {user.planExpiresAt && (
                    <div className="flex gap-1.5">
                      <span className="text-gray-400">Hết hạn:</span>
                      <span className="font-semibold text-gray-700">
                        {new Date(user.planExpiresAt).toLocaleDateString(
                          "vi-VN",
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-1.5">
                    <span className="text-gray-400">Tham gia:</span>
                    <span className="font-semibold text-gray-700">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>

                {user._id !== meId && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <ActivateUserButton
                      userId={user._id}
                      isActive={user.isActive}
                      paidUntil={user.paidUntil}
                      onUpdate={(patch) => updateUser(user._id, patch)}
                    />
                    <ToggleUserButton
                      userId={user._id}
                      field="isAdmin"
                      currentValue={user.isAdmin}
                      label={["Bỏ Admin", "Cấp Admin"]}
                      variant="neutral"
                      onToggle={(v) => updateUser(user._id, { isAdmin: v })}
                    />
                    <DeleteUserButton
                      userId={user._id}
                      onDelete={() => removeUser(user._id)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <Pagination
            page={usersPage}
            total={usersTotal}
            onPage={goUsersPage}
          />
        </div>
      )}

      {/* ── Content ── */}
      {tab === "content" && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex flex-wrap items-center gap-2">
            <h2 className="font-semibold text-gray-900 mr-auto">
              Nội dung đã tạo
            </h2>
            <span className="text-xs text-gray-400">{projectsTotal}</span>
            <SearchBox
              value={projectsQ}
              onChange={handleProjectsSearch}
              placeholder="Tìm tên, email, yêu cầu…"
            />
          </div>

          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {["Tên dự án", "Người dùng", "Yêu cầu", "Ngày tạo", ""].map(
                    (h, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {projects.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      Chưa có nội dung.
                    </td>
                  </tr>
                )}
                {projects.map((project) => (
                  <tr
                    key={project._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-medium text-gray-900 block truncate max-w-[160px]">
                        {project.name}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {project.userEmail}
                    </td>
                    <td className="px-4 py-3.5 max-w-[280px]">
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {project.prompt}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(project.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`/editor?project=${project._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          <Eye className="w-3 h-3" /> Xem
                        </a>
                        <DeleteProjectButton
                          projectId={project._id}
                          onDelete={(id) =>
                            setProjects((prev) =>
                              prev.filter((p) => p._id !== id),
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {projects.length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-gray-400">
                Chưa có nội dung.
              </div>
            )}
            {projects.map((project) => (
              <div key={project._id} className="p-4 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-gray-900 text-sm leading-tight">
                    {project.name}
                  </span>
                  <span className="flex-shrink-0 text-xs text-gray-400">
                    {new Date(project.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{project.userEmail}</p>
                <p className="text-xs text-gray-600 line-clamp-3">
                  {project.prompt}
                </p>
                <div className="flex gap-1.5 pt-1">
                  <a
                    href={`/editor?project=${project._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="w-3 h-3" /> Xem
                  </a>
                  <DeleteProjectButton
                    projectId={project._id}
                    onDelete={(id) =>
                      setProjects((prev) => prev.filter((p) => p._id !== id))
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <Pagination
            page={projectsPage}
            total={projectsTotal}
            onPage={goProjectsPage}
          />
        </div>
      )}

      {/* ── Payment proof modal ── */}
      {proofModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setProofModal(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <span className="font-semibold text-gray-800 text-sm">
                Ảnh xác nhận chuyển khoản
              </span>
              <button
                onClick={() => setProofModal(null)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-gray-50 min-h-[300px]">
              <img
                src={proofModal}
                alt="payment proof"
                className="max-h-[70vh] max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
