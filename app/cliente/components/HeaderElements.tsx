import Link from "next/link";

export const NavLink = ({
  label,
  href,
  active = false,
}: {
  label: string;
  href: string;
  active?: boolean;
}) => (
  <Link
    href={href}
    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
      active
        ? "bg-gray-100 text-gray-900"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    }`}
  >
    {label}
  </Link>
);