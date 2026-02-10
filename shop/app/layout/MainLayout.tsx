import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="container">
      <Header />

      <div className="main">
        <Sidebar />
        <div className="content">{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
