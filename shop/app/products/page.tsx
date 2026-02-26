"use client";

import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map(p => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>${p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;