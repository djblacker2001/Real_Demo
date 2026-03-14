"use client";

import { useEffect, useState } from "react";
import "./style.css";
import { Input, Pagination } from "antd";
import MainLayout from "../layout/MainLayout";

const { Search } = Input;

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
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const pageSize = 10;

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
    brand: "",
    category: "",
    stock: 0,
  });

  // 🔹 Fetch API (search + pagination)
  useEffect(() => {
    fetch(
      `https://dummyjson.com/products/search?q=${searchText}&limit=${pageSize}&skip=${(currentPage - 1) * pageSize
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      });
  }, [currentPage, searchText]);

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

  return (
    <MainLayout>
      <div className="container">
        <h1 className="title">PRODUCT MANAGEMENT</h1>
        <Search
          placeholder="Search products..."
          enterButton
          onSearch={(value) => {
            setCurrentPage(1);
            setSearchText(value);
          }}
          style={{ marginBottom: 20, width: 300, marginRight: 20 }}
        />

        <button className="addBtn" onClick={openAdd}>
          + Thêm sản phẩm
        </button>

        <table className="table">
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
                  <button className="editBtn" onClick={() => openEdit(p)}>
                    Sửa
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(p.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          className="pagination"
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          showQuickJumper
          showTotal={(total) => `Tổng ${total} sản phẩm`}
        />

        {isOpen && (
          <div className="modalOverlay">
            <div className="modal">
              <h2>{editing ? "Sửa" : "Thêm"} sản phẩm</h2>

              <input
                className="input"
                placeholder="Tên sản phẩm"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                className="input"
                placeholder="Brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />

              <input
                className="input"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />

              <input
                className="input"
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
                className="input"
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

              <div className="modalActions">
                <button className="saveBtn" onClick={handleSave}>
                  Lưu
                </button>
                <button
                  className="cancelBtn"
                  onClick={() => setIsOpen(false)}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}