import Link from "next/link";

interface LogoIconProps {
  size?: number;
  uid?: string;
}

export function LogoIcon({ size = 36 }: LogoIconProps) {
  return (
    <img
      src="/taopage-favicon.svg"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}

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
  className = "",
  href = "/",
}: LogoProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center select-none ${className}`}
    >
      <img
        src="/taopage-logo.svg"
        alt="TaoPage"
        style={{ height: `${iconSize}px`, width: "auto", display: "block" }}
      />
    </Link>
  );
}
