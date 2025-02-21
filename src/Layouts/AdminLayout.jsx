import AdminNav from "@/Components/NavBar/AdminNav";
import AdminSidebar from "@/Components/Sidebar/AdminSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="container main-page mx-auto">
      <AdminNav />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
