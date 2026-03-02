import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo"><img src="https://cdn.haitrieu.com/wp-content/uploads/2021/12/Logo-DH-Quoc-Te-Mien-Dong-EIU-Ogri.png" alt="" /></div>
            <div className="user">
                <FontAwesomeIcon icon={faUser} />
                <span>Admin</span>
            </div>
        </header>
    );
};

export default Header;