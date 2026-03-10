"use client";

import { useEffect, useState } from "react";
import { Row, Col, Card, Input, Pagination, Button } from "antd";
import "./style.css";
import { useRouter } from "next/navigation";
import { ShoppingCartOutlined } from '@ant-design/icons';

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
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);

  const pageSize = 8;
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {

    let url = "";

    if (selectedCategory) {
      url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${pageSize}&skip=${(page - 1) * pageSize}`;
    } else {
      url = `https://dummyjson.com/products/search?q=${searchText}&limit=${pageSize}&skip=${(page - 1) * pageSize}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setTotal(data.total);
      });

  }, [page, searchText, selectedCategory]);

  return (
    <div className="list-container">
      <div className="head">
        <Row gutter={[10, 10]} align="middle">

          <Col xs={24} sm={6} md={6} className="header-product">
            <a href="/">
              <img src="/shop.png" alt="Shop" className="logo-shop" />
            </a>
          </Col>

          <Col xs={24} sm={12} md={12} className="header-product">
            <Search
              size="large"
              placeholder="Search products..."
              onSearch={(value) => {
                setPage(1);
                setSearchText(value);
              }}
              className="search"
            />


          </Col>

          <Col xs={24} sm={6} md={6} className="header-product">
            <Button
              size="large"
              onClick={() => setShowCategory(!showCategory)}
            >
              {showCategory ? "Hide Categories" : "Show Categories"}
            </Button>
            <Button
              size="large"
              style={{ marginLeft: "10px" }}
            >
              <ShoppingCartOutlined />
              
            </Button>
          </Col>

        </Row>
      </div>
      {showCategory && (
      <div className="category-nav">
        <Button
          type={selectedCategory === "" ? "primary" : "default"}
          onClick={() => {
            setSelectedCategory("");
            setPage(1);
          }}
        >
          All
        </Button>

        {categories.map((cat) => (
          <Button
            key={cat.slug}
            type={selectedCategory === cat.slug ? "primary" : "default"}
            onClick={() => {
              setSelectedCategory(cat.slug);
              setPage(1);
            }}
          >
            {cat.name}
          </Button>
        ))}
      </div>
      )}
      
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
                <p className="product-price">${item.price}</p>
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