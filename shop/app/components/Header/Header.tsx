/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { GlobalOutlined, DownOutlined, BellOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps, Dropdown, Space, Badge, Avatar } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Search from "antd/es/input/Search";
import { useTranslation } from "react-i18next";

type Props = {
    onToggleSidebar: () => void;
    onSearch: (value: string) => void;
    onCategoryChange: (value: string) => void;
};

const Header: React.FC<Props> = ({ onToggleSidebar }) => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const { t, i18n } = useTranslation();

    // 1. Hàm đổi ngôn ngữ tập trung
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    // 2. Cấu hình Menu Ngôn ngữ (Sử dụng MenuProps của Ant Design)
    const languageItems: MenuProps['items'] = [
        {
            key: 'en',
            label: 'English',
            disabled: i18n.language === 'en', // Vô hiệu hóa nếu đang chọn
            onClick: () => changeLanguage('en'),
        },
        {
            key: 'vi',
            label: 'Tiếng Việt',
            disabled: i18n.language === 'vi',
            onClick: () => changeLanguage('vi'),
        },
    ];

    // 3. Cấu hình Menu User (Sử dụng t() để dịch nhãn)
    const userItems: MenuProps['items'] = [
        {
            key: 'username',
            label: <strong>{username || 'Guest'}</strong>,
            disabled: true,
        },
        { type: 'divider' },
        {
            key: 'logout',
            label: t('header.logout') || 'Log out', // Sử dụng i18n
            icon: <LogoutOutlined />,
            onClick: () => {
                localStorage.removeItem('user');
                router.push('/login');
            },
        },
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUsername(user.username);
        }
    }, []);

    return (
        <header className="header">
            <div className="left">
                <button className="menu-btn" onClick={onToggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <a className="logo" href="/">Shop<span>Now</span></a>
                <Search
                    placeholder={t("header.search_placeholder")}
                    className="search"
                    onSearch={(value) => { router.push(`/listProducts?search=${value}`); }}
                />
            </div>

            <div className="user">
                <Badge count={3} className="notifications">
                    <BellOutlined />
                </Badge>

                {/* Dropdown Ngôn ngữ */}
                <Dropdown menu={{ items: languageItems }} placement="bottomRight">
                    <a onClick={(e) => e.preventDefault()} className="languages">
                        <Space>
                            <GlobalOutlined />
                            {/* Hiển thị text dựa trên i18n.language */}
                            {i18n.language === 'vi' ? 'Tiếng Việt' : 'English'}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>

                {/* Dropdown User */}
                <Dropdown menu={{ items: userItems }} placement="bottomRight">
                    <Space style={{ cursor: 'pointer' }}>
                        <Avatar icon={<UserOutlined />} />
                        <span style={{ fontWeight: 500 }}>
                            {username || t("header.guest")}
                        </span>
                    </Space>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;