"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import "./Sidebar.css";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ===== Mobile Header ===== */}
      <div className="mobile-header">
        <MenuOutlined
          className="menu-icon"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* ===== Overlay ===== */}
      {isOpen && (
        <div
          className="overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="logo">Shop</h2>
        <ul className="menu">
          <li>
            <Link
              href="/dashboard"
              className={`menu-item ${
                pathname === "/dashboard" ? "active" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/listProducts"
              className={`menu-item ${
                pathname === "/listProducts" ? "active" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              List of Products
            </Link>
          </li>

          <li>
            <Link
              href="/products"
              className={`menu-item ${
                pathname === "/products" ? "active" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
          </li>
        </ul>

        <button className="logout">Log out</button>
      </aside>
    </>
  );
};

export default Sidebar;