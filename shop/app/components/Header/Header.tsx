import "./Header.css";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">MyAdmin</div>

            <input className="search" placeholder="Search..." />

            <div className="user">
                <img src="https://i.pravatar.cc/40" />
                <span>Admin</span>
            </div>
        </header>
    );
};

export default Header;