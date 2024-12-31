import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
