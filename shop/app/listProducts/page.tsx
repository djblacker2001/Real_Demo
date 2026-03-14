"use client";

import { useEffect, useState } from "react";
import { Row, Col, Card, Input, Pagination, Button, Tag } from "antd";
import "./style.css";
import { useRouter, useSearchParams } from "next/navigation";
import { FontSizeOutlined, ShoppingCartOutlined, TruckOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import DiscountFilter from "./listFilter/DiscountFilter";
import PriceFilter from "./listFilter/PriceFilter";
import RatingFilter from "./listFilter/RatingFilter";
import ProductToolbar from "./ProductToolbar";
import StickyBox from "react-sticky-box";

const { Search } = Input;
const { Meta } = Card;

type Product = {
  reviews: any;
  discountPercentage: number;
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
  stock: number;
  thumbnail: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const filteredProducts = products.filter((p) => {

    const priceAfterDiscount =
      p.price * (1 - p.discountPercentage / 100);

    const priceMatch =
      priceAfterDiscount >= priceRange[0] &&
      priceAfterDiscount <= priceRange[1];

    const rating =
      p.reviews?.length
        ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
        : 0;

    const ratingMatch =
      !ratingFilter || rating >= ratingFilter;

    return priceMatch && ratingMatch;

  });

  const paginatedProducts =
    filteredProducts.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

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
      url = `https://dummyjson.com/products/search?q=${searchText}&limit=100`;
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
      <aside className="filter-aside">
        <PriceFilter setPriceRange={setPriceRange} />
        <RatingFilter setRatingFilter={setRatingFilter} />
        <DiscountFilter />
      </aside>
      <div className="product-main">
        <ProductToolbar total={filteredProducts.length} />
        <Row gutter={[16, 16]}>
          {paginatedProducts.map((item) => (
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
                  <p className="price">
                    <span className="old-price">${item.price}</span>
                    <span className="new-price">
                      ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                    </span>
                  </p>
                  <Tag color="green">{item.availabilityStatus}</Tag>
                  <p className="small-inform">
                    <span className="warranty"><FontAwesomeIcon icon={faShieldHalved} /> {item.warrantyInformation}</span>
                    <span className="shipping"><TruckOutlined /> {item.shippingInformation}</span>
                  </p>
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
            total={filteredProducts.length}
            onChange={(p) => setPage(p)}
          />
        </div>
      </div>


    </div>
  );
}