"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Col, Row, Space } from "antd";
import "./style.css";

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    stock: number;
    thumbnail: string;
    images: string[];
};

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    if (!product) return <p style={{ padding: 20 }}>Loading...</p>;

    return (
        <div className="detail-container">
            <Button onClick={() => router.back()} style={{ marginBottom: 20 }}>
                ← Quay lại
            </Button>

            <div className="detail-wrapper">
                <Row gutter={[16, 24]}>
                    <Col xs={24} md={12}><div className="detail-image">
                        <img src={product.thumbnail} alt={product.title} />
                    </div></Col>
                    <Col xs={24} md={12}>
                        <div className="detail-info">
                            <h1>{product.title}</h1>
                            <p className="detail-brand">{product.brand}</p>
                            <p className="detail-price">${product.price}</p>
                            <p><b>Category:</b> {product.category}</p>
                            <p><b>Stock:</b> {product.stock}</p>
                            <p className="detail-description">{product.description}</p>
                        </div>
                        <Space.Compact block>
                            <Button type="primary">
                                Mua ngay
                            </Button>
                            <Button>
                                Thêm vào giỏ hàng
                            </Button>
                        </Space.Compact>
                    </Col>
                </Row>
            </div>
        </div>
    );
}