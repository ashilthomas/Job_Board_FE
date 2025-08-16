// src/Layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "@/Components/NavBar/AdminNav";
import AdminSideBar from "@/Components/SideBar/AdminSideBar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <AdminNav />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

