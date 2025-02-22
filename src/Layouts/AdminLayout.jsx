import AdminNav from "@/Components/NavBar/AdminNav";
import AdminSideBar from "@/Components/SideBar/AdminSideBar";

import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="container main-page mx-auto">
      <AdminNav />
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
