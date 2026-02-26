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
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/products/${cat.slug}`}
              className="menu-item"
            >
              {cat.name}
            </Link>
            <button className="LogOut">Log out</button>
          </li>
        ))}
      </ul>


      
    </aside>
  );
};

export default Sidebar;
