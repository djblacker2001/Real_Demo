import { Button, Select } from "antd";
import "./style.css";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
    stock: number;
};

type Props = {
    total: number;
    sortBy: string;
    setSortBy: (value: string) => void;
    viewMode: string;
    setViewMode: (value: string) => void;
};

export default function ProductToolbar({
    total,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode
}: Props) {

    const [categories, setCategories] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=100")
            .then((res) => res.json())
            .then((data) => setProducts(data.products));

        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    return (
        <div className="product-toolbar">

            <div className="product-count">
                {total} products
            </div>

            <div className="toolbar-right">

                <Select
                    value={sortBy}
                    style={{ width: 180 }}
                    onChange={(value) => setSortBy(value)}
                    options={[
                        { value: "default", label: "Default" },
                        { value: "price-asc", label: "Price-asc" },
                        { value: "price-desc", label: "Price-desc" },
                        { value: "rating", label: "Rating" },
                    ]}
                />

                <Button
                    type={viewMode === "grid" ? "primary" : "default"}
                    icon={<AppstoreOutlined />}
                    onClick={() => setViewMode("grid")}
                />

                <Button
                    type={viewMode === "list" ? "primary" : "default"}
                    icon={<BarsOutlined />}
                    onClick={() => setViewMode("list")}
                />

            </div>

        </div>
    )
}

