import { Select } from "antd";
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

export default function ProductToolbar({ total }: { total: number }) {
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


    const totalProducts = products.length;
    return (
        <div className="product-toolbar">

            <div className="product-count">
                {totalProducts} products
            </div>

            <div className="toolbar-right">

                <Select
                    defaultValue="default"
                    style={{ width: 150 }}
                    options={[
                        { value: "default", label: "Mặc định" },
                        { value: "price-asc", label: "Giá tăng" },
                        { value: "price-desc", label: "Giá giảm" }
                    ]}
                />

                <AppstoreOutlined className="view-icon" />
                <BarsOutlined className="view-icon" />

            </div>

        </div>
    )
}