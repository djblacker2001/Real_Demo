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
            </div>

            <div className="user">
                <FontAwesomeIcon icon={faUser} />
                <span>Admin</span>
            </div>
        </header>
    );
};

export default Header;