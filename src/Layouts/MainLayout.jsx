import React from "react";
import { Outlet } from "react-router-dom";
import UserNav from "@/Components/NavBar/UserNav";
import Footer from "@/Components/Footer/Footer";

function MainLayout({ openLogin, openSignup }) {
  return (
    <main className=" relative  main-page px-3">
        <div className="max-w-[1200px] m-auto">

     
      
        <UserNav  openLogin={openLogin}  openSignup={ openSignup } />
        <Outlet />
        <Footer/>
        </div>
   
   
    </main>
  );
}

export default MainLayout;


