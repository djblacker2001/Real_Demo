"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import "./Sidebar.css";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<Props> = ({ open, setOpen }) => {
  const pathname = usePathname();
  
  return (
    <>
      
      {/* <div className="mobile-header">
        <MenuOutlined
          className="menu-icon"
          onClick={() => setIsOpen(true)}
        />
      </div> */}

      
      {open && (
        <div className="overlay" onClick={() => setOpen(false)} />
      )}

      
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <ul className="menu">
          <li>
            <Link
              href="/dashboard"
              className={`menu-item ${
                pathname === "/dashboard" ? "active" : ""
              }`}
              onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
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