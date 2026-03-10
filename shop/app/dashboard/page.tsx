"use client";

import { useEffect, useState } from "react";
import { Card, Row, Col, Statistic } from "antd";
import "./style.css";
import { ShoppingOutlined, AppstoreOutlined, InboxOutlined, DollarOutlined } from "@ant-design/icons";
import AreaChart from "./AreaChart";
import StockChart from "./StockChart";

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

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card stats-blue">
            <div className="stats-content">
              <ShoppingOutlined className="stats-icon" />
              <div>
                <p className="stats-title">Total Products</p>
                <h2>{totalProducts}</h2>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card stats-green">
            <div className="stats-content">
              <AppstoreOutlined className="stats-icon" />
              <div>
                <p className="stats-title">Categories</p>
                <h2>{categories.length}</h2>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card stats-orange">
            <div className="stats-content">
              <InboxOutlined className="stats-icon" />
              <div>
                <p className="stats-title">Total Stock</p>
                <h2>{totalStock}</h2>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="stats-card stats-red">
            <div className="stats-content">
              <DollarOutlined className="stats-icon" />
              <div>
                <p className="stats-title">Average Price</p>
                <h2>${avgPrice.toFixed(2)}</h2>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12} md={12}>
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

        <Col xs={24} sm={12} md={12}>
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
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>

        <Col xs={24} sm={12} md={12}>
          <Card title="Production Area Chart">
            <AreaChart />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12}>
          <Card title="Stock Chart">
            <StockChart />
          </Card>
        </Col>

      </Row>

    </div>
  );
}