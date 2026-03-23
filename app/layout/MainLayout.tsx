"use client";

import { useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import CategoryBar from "../components/CategoryBar/CategoryBar";
import "./layout.css"

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  return (
    <div className="layout">
      <Header onToggleSidebar={() => setOpen(prev => !prev)} onSearch={(value) => setSearchText(value)} onCategoryChange={(value) => setCategory(value)}/>
      <CategoryBar />
      <div className="main">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;