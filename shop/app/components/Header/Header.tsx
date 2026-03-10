"use client";

import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { GlobalOutlined, DownOutlined, BellOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { MenuProps, Dropdown, Space, Button, Badge, Input } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const { Search } = Input;


type Props = {
    onToggleSidebar: () => void;
    onSearch: (value: string) => void;
    onCategoryChange: (value: string) => void;
};

type Category = {
    slug: string;
    name: string;
    url: string;
};

const Header: React.FC<Props> = ({ onToggleSidebar }) => {
    const router = useRouter();
    const [language, setLanguage] = useState("English");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")

            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCategories(data);
            });
    }, []);

    const categoryItems =
        categories.map((cat) => ({
            key: cat.slug,
            label: (
                <span
                    onClick={() =>
                        router.push(`/listProducts?category=${cat.slug}`)
                    }
                >
                    {cat.name}
                </span>
            ),
        }));


    const items = [
        {
            key: "en",
            label: (
                <span
                    onClick={() => {
                        setLanguage("English");
                    }}
                >
                    English
                </span>
            ),
        },
        {
            key: "vi",
            label: (
                <span
                    onClick={() => {
                        setLanguage("Tiếng Việt");
                    }}
                >
                    Tiếng Việt
                </span>
            ),
        },
    ];
    return (
        <header className="header">
            <div className="left">
                <button className="menu-btn" onClick={onToggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <a href="/">
                    <img src="/shop.png" alt="Shop" className="logo-shop" />
                </a>
                <Search
                    placeholder="Search products..."
                    style={{ width: 250, marginLeft: 20 }}
                    onSearch={(value) => { router.push(`/listProducts?search=${value}`); }}
                />
            </div>

            <div className="user">
                <Dropdown
                    dropdownRender={() => (
                        <div className="category-dropdown">
                            {categories.map((cat) => (
                                <div
                                    key={cat.slug}
                                    className="category-item"
                                    onClick={() =>
                                        router.push(`/listProducts?category=${cat.slug}`)
                                    }
                                >
                                    {cat.name}
                                </div>
                            ))}
                        </div>
                    )}
                    trigger={["hover"]}
                >
                    <a onClick={(e) => e.preventDefault()} className="languages">
                        <Space>
                            <AppstoreAddOutlined />
                            Categories
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <Badge count={3} className="notifications">
                    <BellOutlined />
                </Badge>
                <Dropdown menu={{ items }} placement="bottomRight">
                    <a onClick={(e) => e.preventDefault()} className="languages">
                        <Space>
                            <GlobalOutlined />
                            {language}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <FontAwesomeIcon icon={faUser} />
                <span>Admin</span>
            </div>
        </header>
    );
};

export default Header;