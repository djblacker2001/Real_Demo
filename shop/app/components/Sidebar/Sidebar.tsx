'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Sidebar.css";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  type Category = {
    slug: string;
    name: string;
    url: string;
  };

  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <aside className="sidebar">
      <h2 className="logo">Shop</h2>
      <ul className="menu">
        <li>
          <Link href="/dashboard"
            className="menu-item">
            Dashboard
          </Link>
          <Link href="/listProducts"
            className="menu-item">
            List of Products
          </Link>
          <Link
            href="/products"
            className="menu-item"
          >
            Products
          </Link>
          
        </li>
        <button className="LogOut">Log out</button>
      </ul>
      


    </aside>
  );
};

export default Sidebar;
