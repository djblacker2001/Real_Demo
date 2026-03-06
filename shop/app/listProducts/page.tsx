"use client";

import { useEffect, useState } from "react";
import { Row, Col, Card, Input, Pagination, Button } from "antd";
import "./style.css";
import { useRouter } from "next/navigation";
import {ShoppingCartOutlined} from '@ant-design/icons';

const { Search } = Input;
const { Meta } = Card;

type Product = {
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
  stock: number;
  thumbnail: string;
};

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const pageSize = 8;

  useEffect(() => {
    fetch(
      `https://dummyjson.com/products/search?q=${searchText}&limit=${pageSize}&skip=${(page - 1) * pageSize
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      });
  }, [page, searchText]);

  return (
    <div className="list-container">
      <div className="head">
        <Row>
          <Col span={6} className="header-product">
            <a href="/"><img src="/shop.png" alt="Shop" className="logo-shop" /></a>
          </Col>
          <Col span={12} className="header-product">
          <Search
            size="large"
            placeholder="Search products..."
            onSearch={(value) => {
              setPage(1);
              setSearchText(value);
            }}
            className="search"
          /></Col>
          <Col span={6} className="header-product"><Button size="large"><ShoppingCartOutlined /></Button></Col>
        </Row>
      </div>

      <Row gutter={[16, 16]}>
        {products.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <Card
              hoverable
              style={{ width: '100%' }}
              cover={
                <div className="product-image-container">
                  <img
                    alt={item.title}
                    src={item.thumbnail}
                    className="product-image"
                  />
                </div>
              }
              onClick={() => router.push(`/listProducts/${item.id}`)}
            >
              <div className="product-details">
                <h3>{item.title}</h3>
                <p><b>Brand:</b> {item.brand}</p>
                <p><b>Price:</b> ${item.price}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="pagination-wrapper">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}