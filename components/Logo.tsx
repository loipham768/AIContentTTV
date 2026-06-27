"use client";
import Link from "next/link";

interface LogoProps {
  iconSize?: number;
  iconOnly?: boolean;
  dark?: boolean;
  className?: string;
  uid?: string;
  href?: string;
}

export default function Logo({
  iconSize = 36,
  iconOnly = false,
  dark = false,
  className = "",
  href = "/create",
}: LogoProps) {
  const textColor = dark ? "#ffffff" : "#0f172a";
  const subColor = dark ? "#94a3b8" : "#64748b";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 select-none ${className}`}
    >
      {/* T icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <rect width="40" height="40" rx="10" fill="url(#tgrad)" />
        <text
          x="20"
          y="29"
          textAnchor="middle"
          fontFamily="'Georgia', serif"
          fontWeight="700"
          fontSize="26"
          fill="white"
          letterSpacing="-1"
        >
          T
        </text>
        <defs>
          <linearGradient id="tgrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4f46e5" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>

      {!iconOnly && (
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontWeight: 700, fontSize: Math.max(13, iconSize * 0.38), color: textColor, letterSpacing: "-0.3px" }}>
            intelligate
          </span>
          <span style={{ fontWeight: 400, fontSize: Math.max(9, iconSize * 0.25), color: subColor, letterSpacing: "0.5px", textTransform: "uppercase" }}>
            AI Studio
          </span>
        </span>
      )}
    </Link>
  );
}

export function LogoIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" fill="url(#tgrad2)" />
      <text
        x="20"
        y="29"
        textAnchor="middle"
        fontFamily="'Georgia', serif"
        fontWeight="700"
        fontSize="26"
        fill="white"
        letterSpacing="-1"
      >
        T
      </text>
      <defs>
        <linearGradient id="tgrad2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f46e5" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}
