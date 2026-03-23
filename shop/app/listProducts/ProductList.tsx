"use client";

import { useEffect, useMemo, useState } from "react";
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
import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";

const { Search } = Input;
const { Meta } = Card;

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
};

type Product = {
  reviews: Review[];
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
  const { t } = useTranslation();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const pageSize = 8;
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [discountOnly, setDiscountOnly] = useState(false);

  const searchParams = useSearchParams();
  const searchText = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const filteredProducts = products
    .filter((p) => {

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

      const discountMatch =
        !discountOnly || p.discountPercentage > 0;

      return priceMatch && ratingMatch && discountMatch;

    })

    .sort((a, b) => {

      const priceA = a.price * (1 - a.discountPercentage / 100);
      const priceB = b.price * (1 - b.discountPercentage / 100);

      const ratingA =
        a.reviews?.length
          ? a.reviews.reduce((s, r) => s + r.rating, 0) / a.reviews.length
          : 0;

      const ratingB =
        b.reviews?.length
          ? b.reviews.reduce((s, r) => s + r.rating, 0) / b.reviews.length
          : 0;

      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "rating") return ratingB - ratingA;

      return 0;

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [priceRange, ratingFilter, sortBy]);

  return (
    <MainLayout>
      <div className="list-container">
        <aside className="filter-aside">
          <PriceFilter setPriceRange={setPriceRange} />
          <RatingFilter setRatingFilter={setRatingFilter} />
          <DiscountFilter setDiscountOnly={setDiscountOnly} />
        </aside>
        <div className="product-main">
          <ProductToolbar
            total={filteredProducts.length}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <Row gutter={[16, 16]}>
            {paginatedProducts.map((item) => (
              <Col xs={24} sm={viewMode === "grid" ? 12 : 24}
                md={viewMode === "grid" ? 8 : 24}
                lg={viewMode === "grid" ? 6 : 24} key={item.id}>
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
                    <p><b>{t("product.brand")}:</b> {item.brand}</p>
                    <p><b>{t("product.stock")}:</b> {item.stock}</p>
                    <p className="price">
                      <span className="old-price">${item.price}</span>
                      <span className="new-price">
                        ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                      </span>
                    </p>
                    <Tag color="green">{t("product.availabilityStatus")}</Tag>
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
    </MainLayout>
  );
}