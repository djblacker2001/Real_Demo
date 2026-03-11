"use client";

import { useEffect, useState } from "react";
import { Row, Col, Card, Input, Pagination, Button } from "antd";
import "./style.css";
import { useRouter, useSearchParams } from "next/navigation";
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Meta } = Card;

type Product = {
  discountPercentage: number;
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
  // const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const pageSize = 8;
  const searchParams = useSearchParams();
  const searchText = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";


  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    let url = "";

    if (category) {
      url = `https://dummyjson.com/products/category/${category}`;
    } else {
      url = `https://dummyjson.com/products/search?q=${searchText}&limit=${pageSize}&skip=${(page - 1) * pageSize}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      });

  }, [page, searchText, category]);



  return (
    <div className="list-container">
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
                <p><b>Stock:</b> {item.stock}</p>
                <p className="product-price">${item.price}</p>
              </div>
              <div className="discount">{item.discountPercentage}% off</div>
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