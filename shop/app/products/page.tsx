"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Product = {
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
  stock: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 10;

  const [formData, setFormData] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
    brand: "",
    category: "",
    stock: 0,
  });

  // 🔹 Load toàn bộ sản phẩm
  useEffect(() => {
    console.log("Current Page:", currentPage);

    fetch(
      `https://dummyjson.com/products?limit=${pageSize}&skip=${(currentPage - 1) * pageSize
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched:", data.products.length);
        setProducts(data.products);
        setTotalProducts(data.total);
      });
  }, [currentPage]);

  const openAdd = () => {
    setEditing(null);
    setFormData({
      id: Date.now(),
      title: "",
      price: 0,
      brand: "",
      category: "",
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
    if (!formData.title) {
      alert("Vui lòng nhập tên sản phẩm");
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

  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PRODUCT MANAGEMENT</h1>

      <button className={styles.addBtn} onClick={openAdd}>
        + Thêm sản phẩm
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Brand</th>
            <th>Category</th>
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
              <td>{p.category}</td>
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
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {(() => {
          const pages = [];
          const maxVisible = 3; // số trang hiển thị giữa
          const totalPages = Math.ceil(totalProducts / pageSize);

          let start = Math.max(1, currentPage - 1);
          let end = Math.min(totalPages, currentPage + 1);

          if (currentPage === 1) {
            end = Math.min(totalPages, maxVisible);
          }

          if (currentPage === totalPages) {
            start = Math.max(1, totalPages - maxVisible + 1);
          }

          if (start > 1) {
            pages.push(
              <button key={1} onClick={() => setCurrentPage(1)}>
                1
              </button>
            );
            if (start > 2) pages.push(<span key="start-ellipsis">...</span>);
          }

          for (let i = start; i <= end; i++) {
            pages.push(
              <button
                key={i}
                className={currentPage === i ? styles.activePage : ""}
                onClick={() => setCurrentPage(i)}
              >
                {i}
              </button>
            );
          }

          if (end < totalPages) {
            if (end < totalPages - 1)
              pages.push(<span key="end-ellipsis">...</span>);
            pages.push(
              <button
                key={totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            );
          }

          return pages;
        })()}

        <button
          disabled={currentPage === Math.ceil(totalProducts / pageSize)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

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
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
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