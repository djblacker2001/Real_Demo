import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">MyAdmin</div>

            <input className="search" placeholder="Search..." />

            <div className="user">
                <FontAwesomeIcon icon={faUser} />
                <span>Admin</span>
            </div>
        </header>
    );
};

export default Header;