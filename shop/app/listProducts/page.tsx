"use client";

import { useEffect, useState } from "react";
import { Row, Col, Card, Input, Pagination } from "antd";
import "./style.css";
import { useRouter } from "next/navigation";

const { Search } = Input;

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
      `https://dummyjson.com/products/search?q=${searchText}&limit=${pageSize}&skip=${
        (page - 1) * pageSize
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
      <h1>List Products</h1>

      <Search
        placeholder="Search products..."
        onSearch={(value) => {
          setPage(1);
          setSearchText(value);
        }}
        style={{ marginBottom: 20, width: 300 }}
      />

      <Row gutter={[16, 16]}>
        {products.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={item.title}
                  src={item.thumbnail}
                  className="product-image"
                />
              }
              onClick={() => router.push(`/listProducts/${item.id}`)}
            >
              <h3>{item.title}</h3>
              <p><b>Brand:</b> {item.brand}</p>
              <p><b>Category:</b> {item.category}</p>
              <p><b>Price:</b> ${item.price}</p>
              <p><b>Stock:</b> {item.stock}</p>
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