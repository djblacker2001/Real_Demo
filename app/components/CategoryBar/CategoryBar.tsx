"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./CategoryBar.css";
import { useTranslation } from "react-i18next"; // 1. Import hook

type Category = {
    slug: string;
    name: string;
    url: string;
};

export default function CategoryBar() {
    const [categories, setCategories] = useState<Category[]>([]); // Sửa lại type Category[]
    const router = useRouter();
    const { t } = useTranslation(); // 2. Khởi tạo hàm t

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
                {/* 3. Dịch chữ "All" */}
                {t("category_bar.all")} 
            </div>

            {categories.map((cat) => (
                <div
                    key={cat.slug}
                    className="category-item"
                    onClick={() => router.push(`/listProducts?category=${cat.slug}`)}
                >
                    {/* 4. Dịch danh mục dựa trên slug */}
                    {t(`categories_map.${cat.slug}`, { defaultValue: cat.name })}
                </div>
            ))}
        </div>
    );
}