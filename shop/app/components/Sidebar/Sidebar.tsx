'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Sidebar.css";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "menu-item active" : "menu-item";
  return (
    <aside className="sidebar">
      <ul className="menu">
        <li>
          <Link href="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/products" className={isActive("/products")}>
            Products
          </Link>
        </li>
        <li>
          <Link href="/orders" className={isActive("/orders")}>
            Orders
          </Link>
        </li>
        <li>
          <Link href="/users" className={isActive("/users")}>
            Users
          </Link>
        </li>
        <li>
          <Link href="/settings" className={isActive("/settings")}>
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
