"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShoppingCart,
  Users,
  FolderOpen,
  MessageSquarePlus,
  Star,
  LayoutTemplate,
  BookOpen,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Activity,
} from "lucide-react";
import Logo from "@/components/Logo";
import { LogoIcon } from "@/components/Logo";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  tab?: string;
  badge?: number;
  urgent?: boolean;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

interface Props {
  pendingOrdersCount: number;
  reviewPendingCount: number;
  ordersTotal: number;
  usersTotal: number;
  projectsTotal: number;
  feedbackTotal: number;
  reviewsTotal: number;
  children: React.ReactNode;
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function Badge({ count, urgent }: { count: number; urgent?: boolean }) {
  if (count === 0) return null;
  return (
    <span
      className={`ml-auto min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center leading-none flex-shrink-0 ${
        urgent ? "bg-amber-400 text-amber-900" : "bg-slate-700 text-slate-300"
      }`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

function UrgentDot() {
  return (
    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-slate-900" />
  );
}

// ─── Nav link ─────────────────────────────────────────────────────────────────

function NavLink({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) {
  if (collapsed) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        title={item.label}
        className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-150 mx-auto ${
          active
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-slate-500 hover:text-white hover:bg-slate-800"
        }`}
      >
        {item.icon}
        {item.urgent && item.badge && item.badge > 0 && <UrgentDot />}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "text-slate-400 hover:text-white hover:bg-slate-800"
      }`}
    >
      <span
        className={`flex-shrink-0 ${
          active ? "text-white" : "text-slate-500 group-hover:text-slate-300"
        }`}
      >
        {item.icon}
      </span>
      <span className="flex-1 truncate">{item.label}</span>
      <Badge count={item.badge ?? 0} urgent={item.urgent} />
    </Link>
  );
}

// ─── Sidebar content ──────────────────────────────────────────────────────────

function SidebarContent({
  navGroups,
  pathname,
  tab,
  section,
  collapsed,
  onToggleCollapse,
  onNavClick,
}: {
  navGroups: NavGroup[];
  pathname: string;
  tab: string;
  section: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavClick?: () => void;
}) {
  function isActive(item: NavItem) {
    // /admin/content?section=... items
    if (pathname === "/admin/content") {
      const activeSection = section || "templates";
      return item.tab === activeSection;
    }
    // Separate route pages
    if (pathname.startsWith("/admin/") && pathname !== "/admin/content") {
      return pathname === item.href;
    }
    // Dashboard
    if (pathname === "/admin") return item.href === "/admin";
    return false;
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Logo + pin button ── */}
      <div
        className={`flex items-center border-b border-slate-800 flex-shrink-0 ${
          collapsed ? "flex-col gap-3 py-4 px-0" : "gap-3 px-4 py-4"
        }`}
      >
        {/* Logo */}
        <div className={collapsed ? "flex justify-center" : "flex-1 min-w-0"}>
          {collapsed ? (
            <Link href="/admin" className="block">
              <LogoIcon size={32} uid="admin-sb" />
            </Link>
          ) : (
            <Logo iconSize={28} uid="admin-sb" dark href="/admin" />
          )}
        </div>

        {/* Pin / unpin button */}
        <button
          onClick={onToggleCollapse}
          title={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
          className="flex-shrink-0 p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-all"
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* ── Nav ── */}
      <nav
        className={`flex-1 overflow-y-auto py-4 space-y-5 ${collapsed ? "px-2" : "px-3"}`}
      >
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {!collapsed && group.title && (
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-2">
                {group.title}
              </p>
            )}
            {collapsed && gi > 0 && (
              <div className="h-px bg-slate-800 mx-1 mb-3" />
            )}
            <div
              className={`space-y-0.5 ${collapsed ? "flex flex-col items-center gap-0.5" : ""}`}
            >
              {group.items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  active={isActive(item)}
                  collapsed={collapsed}
                  onClick={onNavClick}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div
        className={`border-t border-slate-800 py-3 ${collapsed ? "px-2" : "px-3"}`}
      >
        {!collapsed && (
          <p className="text-xs text-slate-500 center">© 2026 AITaoPage</p>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminLayoutShell({
  pendingOrdersCount,
  reviewPendingCount,
  ordersTotal,
  usersTotal,
  projectsTotal,
  feedbackTotal,
  reviewsTotal,
  children,
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "";
  const section = searchParams.get("section") ?? "";
  const [mobileOpen, setMobileOpen] = useState(false);

  // Collapsed state — persisted in localStorage
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin-sidebar-collapsed");
      if (stored !== null) setCollapsed(stored === "1");
    } catch {}
  }, []);

  function toggleCollapse() {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("admin-sidebar-collapsed", next ? "1" : "0");
      } catch {}
      return next;
    });
  }

  const navGroups: NavGroup[] = [
    {
      title: "Tổng quan",
      items: [
        {
          label: "Dashboard",
          icon: <Activity className="w-4 h-4" />,
          href: "/admin",
        },
      ],
    },
    {
      title: "Quản lý",
      items: [
        {
          label: "Đơn hàng",
          icon: <ShoppingCart className="w-4 h-4" />,
          href: "/admin/orders",
          badge: ordersTotal,
          urgent: pendingOrdersCount > 0,
        },
        {
          label: "Người dùng",
          icon: <Users className="w-4 h-4" />,
          href: "/admin/users",
          badge: usersTotal,
        },
        {
          label: "Dự án người dùng",
          icon: <FolderOpen className="w-4 h-4" />,
          href: "/admin/projects",
          badge: projectsTotal,
        },
      ],
    },
    {
      title: "Tương tác",
      items: [
        {
          label: "Góp ý",
          icon: <MessageSquarePlus className="w-4 h-4" />,
          href: "/admin/feedback",
          badge: feedbackTotal,
        },
        {
          label: "Đánh giá",
          icon: <Star className="w-4 h-4" />,
          href: "/admin/reviews",
          badge: reviewsTotal,
          urgent: reviewPendingCount > 0,
        },
      ],
    },
    {
      title: "Nội dung site",
      items: [
        {
          label: "Mẫu",
          icon: <LayoutTemplate className="w-4 h-4" />,
          href: "/admin/content?section=templates",
          tab: "templates",
        },
        {
          label: "Bài viết",
          icon: <BookOpen className="w-4 h-4" />,
          href: "/admin/content?section=articles",
          tab: "articles",
        },
      ],
    },
  ];

  function getPageTitle() {
    if (pathname === "/admin/content") {
      return section === "articles"
        ? "Bài viết (Kiến thức)"
        : "Mẫu (Templates)";
    }
    const pathLabels: Record<string, string> = {
      "/admin": "Dashboard",
      "/admin/orders": "Đơn hàng",
      "/admin/users": "Người dùng",
      "/admin/projects": "Dự án người dùng",
      "/admin/feedback": "Góp ý",
      "/admin/reviews": "Đánh giá",
    };
    return pathLabels[pathname] ?? "Dashboard";
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Sidebar desktop ── */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 bg-slate-900 transition-all duration-200 ${
          collapsed ? "w-[60px]" : "w-60"
        }`}
      >
        <SidebarContent
          navGroups={navGroups}
          pathname={pathname}
          tab={tab}
          section={section}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapse}
        />
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-64 bg-slate-900 flex flex-col shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent
              navGroups={navGroups}
              pathname={pathname}
              tab={tab}
              section={section}
              collapsed={false}
              onToggleCollapse={() => {}}
              onNavClick={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* ── Main area ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 h-14 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 gap-3 shadow-sm">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm min-w-0">
            <span className="text-gray-400 font-medium hidden sm:inline">
              Admin
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 hidden sm:inline flex-shrink-0" />
            <span className="font-semibold text-gray-900 truncate">
              {getPageTitle()}
            </span>
          </div>

          {/* View site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title="Xem trang chủ"
            className="ml-auto p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Urgent badges */}
          <div className="flex items-center gap-2">
            {pendingOrdersCount > 0 && (
              <Link
                href="/admin?tab=orders"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full hover:bg-amber-100 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                {pendingOrdersCount} đơn chờ xử lý
              </Link>
            )}
            {reviewPendingCount > 0 && (
              <Link
                href="/admin?tab=reviews"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-3 py-1 rounded-full hover:bg-violet-100 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                {reviewPendingCount} đánh giá chờ
              </Link>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
