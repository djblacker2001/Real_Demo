import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li className="active">Dashboard</li>
        <li>Products</li>
        <li>Orders</li>
        <li>Users</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
