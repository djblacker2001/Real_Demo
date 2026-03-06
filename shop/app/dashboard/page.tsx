"use client";

import { useEffect, useState } from "react";
import { Card, Row, Col, Statistic } from "antd";
import "./style.css";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
};

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));

    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // thống kê
  const totalProducts = products.length;

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  const avgPrice =
    products.reduce((sum, p) => sum + p.price, 0) / (products.length || 1);

  const mostExpensive =
    products.length > 0
      ? products.reduce((max, p) => (p.price > max.price ? p : max))
      : null;

  const newestProduct = products[products.length - 1];

  return (
    <div className="dashboard">

      <h1>Shop information</h1>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Products" value={totalProducts} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Total Categories" value={categories.length} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Total Stock" value={totalStock} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Average Price"
              value={avgPrice}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Most Expensive Product">
            {mostExpensive && (
              <>
                <p><b>{mostExpensive.title}</b></p>
                <p>Price: ${mostExpensive.price}</p>
                <p>Stock: {mostExpensive.stock}</p>
              </>
            )}
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Newest Product">
            {newestProduct && (
              <>
                <p><b>{newestProduct.title}</b></p>
                <p>Price: ${newestProduct.price}</p>
                <p>Stock: {newestProduct.stock}</p>
              </>
            )}
          </Card>
        </Col>
      </Row>

    </div>
  );
}