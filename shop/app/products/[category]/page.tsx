"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";

type Product = {
  id: number;
  title: string;
  price: number;
  brand: string;
  rating: number;
  stock: number;
};

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
    brand: "",
    rating: 0,
    stock: 0,
  });

  useEffect(() => {
    if (!category) return;

    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [category]);

  const openAdd = () => {
    setEditing(null);
    setFormData({
      id: Date.now(),
      title: "",
      price: 0,
      brand: "",
      rating: 0,
      stock: 0,
    });
    setIsOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setFormData(product);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.brand) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (editing) {
      setProducts(
        products.map((p) => (p.id === formData.id ? formData : p))
      );
    } else {
      setProducts([...products, formData]);
    }

    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {category?.toString().toUpperCase()} PRODUCTS
      </h1>

      <button className={styles.addBtn} onClick={openAdd}>
        + Thêm sản phẩm
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Brand</th>
            <th>Giá</th>
            <th>Stock</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.brand}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  className={styles.editBtn}
                  onClick={() => openEdit(p)}
                >
                  Sửa
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(p.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{editing ? "Sửa" : "Thêm"} sản phẩm</h2>

            <input
              className={styles.input}
              placeholder="Tên sản phẩm"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <input
              className={styles.input}
              placeholder="Brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />

            <input
              className={styles.input}
              type="number"
              placeholder="Giá"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number(e.target.value),
                })
              }
            />

            <input
              className={styles.input}
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stock: Number(e.target.value),
                })
              }
            />

            <div className={styles.modalActions}>
              <button className={styles.saveBtn} onClick={handleSave}>
                Lưu
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}