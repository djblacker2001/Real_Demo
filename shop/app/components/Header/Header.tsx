"use client";

import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

type Props = {
    onToggleSidebar: () => void;
};

const Header: React.FC<Props> = ({ onToggleSidebar }) => {
    return (
        <header className="header">
            <div className="left">
                <button className="menu-btn" onClick={onToggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <div className="logo">
                    <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2021/12/Logo-DH-Quoc-Te-Mien-Dong-EIU-Ogri.png"
                        alt="logo"
                    />
                </div>
            </div>

            <div className="user">
                <FontAwesomeIcon icon={faUser} />
                <span>Admin</span>
            </div>
        </header>
    );
};

export default Header;