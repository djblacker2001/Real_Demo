"use client";

import { useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      <Header onToggleSidebar={() => setOpen(prev => !prev)} />

      <div className="main">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="content">{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;