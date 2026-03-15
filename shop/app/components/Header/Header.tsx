"use client";

import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { GlobalOutlined, DownOutlined, BellOutlined, AppstoreAddOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps, Dropdown, Space, Button, Badge, Input, Row, Col, Avatar } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Search from "antd/es/input/Search";

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
    const [username, setUsername] = useState<string>('');
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

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUsername(user.username);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const items: MenuProps['items'] = [
        {
            key: 'username',
            label: <strong>{username}</strong>,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
        },
    ];

    const item = [
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
                <a className="logo" href="/">Shop<span>Now</span></a>
                <Search
                    placeholder="Search products..."
                    className="search"
                    onSearch={(value) => { router.push(`/listProducts?search=${value}`); }}
                />
            </div>

            <div className="user">
                <Badge count={3} className="notifications">
                    <BellOutlined />
                </Badge>
                <Dropdown menu={{ items: item }} placement="bottomRight">
                    <a onClick={(e) => e.preventDefault()} className="languages">
                        <Space>
                            <GlobalOutlined />
                            {language}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <Dropdown menu={{ items: items }} placement="bottomRight">
                    <Space style={{ cursor: 'pointer' }}>
                        <Avatar icon={<UserOutlined />} />
                        <span style={{ fontWeight: 500 }}>
                            {username || 'Guest'}
                        </span>
                    </Space>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;