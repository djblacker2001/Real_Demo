"use client";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Col, Divider, InputNumber, Rate, Row, Space, Tag, Typography } from "antd";
import "./style.css";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from '@/app/layout/MainLayout';

type Review = {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
};

type Dimensions = {
    width: number;
    height: number;
    depth: number;
};

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    brand: string;
    category: string;
    stock: number;
    thumbnail: string;
    images: string[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    reviews: Review[];
    sku: string;
    weight: number;
    dimensions: Dimensions;
    tags: string[];
};

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    if (!product) return <p style={{ padding: 20 }}>Loading...</p>;

    return (
        <MainLayout>
            <div className="layout">
                <div className='detail-container'>
                    <Button onClick={() => router.back()} style={{ marginBottom: 20 }}>
                        ← Quay lại
                    </Button>

                    <div className="detail-wrapper">
                        <Row gutter={[16, 24]}>
                            <Col xs={24} md={10}><div className="detail-image">
                                <LazyLoadImage src={product.thumbnail} alt={product.title} />
                            </div></Col>
                            <Col xs={24} md={14}>
                                <div className="detail-info">
                                    <h1>{product.title}</h1>
                                    <Space style={{ marginBottom: 20 }}>
                                        <Rate
                                            disabled
                                            allowHalf
                                            value={
                                                product.reviews.reduce((sum, r) => sum + r.rating, 0) /
                                                product.reviews.length
                                            }
                                        />
                                        <span>({product.reviews.length} reviews)</span>
                                    </Space>
                                    <p className="detail-brand">{product.brand}</p>
                                    <p className="price">
                                        <span className="old-price">${product.price}</span>
                                        <span className="new-price">
                                            ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                                        </span>
                                        <Tag color="red">
                                            Save {product.discountPercentage}%
                                        </Tag>
                                    </p>
                                    <Tag color={product.stock > 0 ? "green" : "red"} style={{ marginBottom: 20 }}>
                                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                    </Tag>
                                    <p><b>Category:</b> {product.category}</p>
                                    <p><b>Stock:</b> {product.stock}</p>
                                    <p className="detail-description">{product.description}</p>
                                    <p><b>Minimum order:</b> {product.minimumOrderQuantity}</p>

                                    <p className="return-policy">
                                        <FontAwesomeIcon icon={faArrowRotateLeft} /> {product.returnPolicy}
                                    </p>
                                </div>
                                <div className="product-extra-info">
                                    <p>
                                        <b>SKU:</b> {product.sku}
                                    </p>

                                    <p>
                                        <b>Weight:</b> {product.weight} g
                                    </p>

                                    <p>
                                        <b>Dimensions: </b>
                                        {product.dimensions.width} x
                                        {product.dimensions.height} x
                                        {product.dimensions.depth} cm
                                    </p>

                                    <p>
                                        <b>Tags:</b>
                                        <div className="tags">
                                            {product.tags.map((tag, index) => (
                                                <Tag key={index} color="blue">
                                                    {tag}
                                                </Tag>
                                            ))}
                                        </div>
                                    </p>
                                </div>
                                <Space align="center" style={{ marginBottom: 20 }}>
                                    <Typography.Text>Quantity:</Typography.Text>

                                    <InputNumber
                                        min={1}
                                        value={quantity}
                                        onChange={(value) => setQuantity(value || 1)}
                                    />
                                </Space>
                                <Space.Compact block>
                                    <Button type="primary">
                                        Buy now
                                    </Button>
                                    <Button>
                                        Add to Cart
                                    </Button>
                                </Space.Compact>
                            </Col>
                        </Row>
                    </div>
                    <Divider>Customer Reviews</Divider>

                    {product.reviews.map((review, index) => (
                        <Card key={index} className="review-card">
                            <div className="review-header">
                                <b>{review.reviewerName}</b>
                                <Rate disabled defaultValue={review.rating} />
                            </div>

                            <p>{review.comment}</p>

                            <span className="review-date">
                                {new Date(review.date).toLocaleDateString()}
                            </span>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}