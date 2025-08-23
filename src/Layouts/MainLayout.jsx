// src/Layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import UserNav from "@/Components/NavBar/UserNav";
import Footer from "@/Components/Footer/Footer";

function MainLayout({ openLogin, openSignup }) {
  return (
    <div className="flex flex-col main-page min-h-screen">
      {/* Navbar */}
      <UserNav openLogin={openLogin} openSignup={openSignup} />

      {/* Main content */}
      <main className="flex-1 container max-w-6xl mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;



