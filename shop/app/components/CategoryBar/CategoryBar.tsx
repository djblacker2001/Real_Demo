"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./CategoryBar.css";

type Category = {
    slug: string;
    name: string;
    url: string;
};

export default function CategoryBar() {
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div className="category-bar">
      <div
        className="category-item"
        onClick={() => router.push(`/listProducts`)}
      >
        All
      </div>

      {categories.map((cat) => (
        <div
          key={cat.slug}
          className="category-item"
          onClick={() => router.push(`/listProducts?category=${cat.slug}`)}
        >
          {cat.name}
        </div>
      ))}

    </div>
  );
}