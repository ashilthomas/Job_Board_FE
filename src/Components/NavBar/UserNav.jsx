import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropDownBtn } from "../DropDownBtn/DropDownBtn";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "@/Redux/userData";
import jsCookie from "js-cookie"

const UserNav = ({ openLogin, openSignup }) => {
  const navigate =useNavigate()
  const dispatch =useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useSelector((state) => state.user);
  console.log(token);
  

  const LogOut =()=>{
    dispatch(setLogOut())
    jsCookie.remove("token")
    navigate("/")



  }
  return (
    <nav className=" text-white p-4  navbar">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
        <div className="text-3xl font-serif font-bold">Go<span className="text-primary font-bold  ">Job</span></div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <div className="group relative">
            <Link to={"/jobs"}>
            <button className="hover:text-purple-400">Jobs</button>
            </Link>
        
            {/* Dropdown Menu */}
           
          </div>
          <div className="group relative">
          <Link to={"/recommended"}>
            <button className="hover:text-purple-400 mr-4">Recommends</button>
            </Link>
            <button className="hover:text-purple-400">About</button>
            {/* Dropdown Menu */}
            <div className="hidden group-hover:block absolute bg-white text-black rounded-md shadow-md mt-2 py-2 w-48">
              <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                Submenu 1
              </a>
              <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                Submenu 2
              </a>
            </div>
          </div>
          <a href="/" className="hover:text-purple-400">
            Services
          </a>
         
          <div className="group relative">
            <button className="hover:text-purple-400 flex justify-center items-center gap-1">Pages <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
</span></button>
            {/* Dropdown Menu */}
            <div className="hidden group-hover:block absolute bg-white text-black rounded-md shadow-md mt-2 py-2 w-48">
              <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                Submenu 1
              </a>
              <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                Submenu 2
              </a>
            </div>
          </div>
          <a href="/" className="hover:text-purple-400">
            Contact
          </a>
        </div>

        {/* Get Started Button */}
        <div className="flex gap-3 items-center">
        {!token && (
  <>
    <span 
      onClick={() => openLogin("login")} 
      className="hidden md:block border-b border-slate-500 cursor-pointer text-white px-4 pb-1"
    >
      Login
    </span>
    <button 
      onClick={() => openSignup("signup")} 
      className="hidden md:block bg-[rgba(25,17,51,0.5)] border-2 border-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl"
    >
      Signup
    </button>
  </>
)}

        

        <DropDownBtn  logOut={LogOut}/>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2">
          <a href="/" className="hover:text-purple-400">
            Objectives
          </a>
          <a href="/" className="hover:text-purple-400">
            Industries
          </a>
          <a href="/" className="hover:text-purple-400">
            What are HQLs?
          </a>
          <a href="/" className="hover:text-purple-400">
            Cohorts
          </a>
          <a href="/" className="hover:text-purple-400">
            Pricing
          </a>
          <a href="/" className="hover:text-purple-400">
            Resources
          </a>
          <a href="/" className="hover:text-purple-400">
            Contact
          </a>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
            Get Started
          </button>
        </div>
      )}
    </nav>
 
  );
};

export default UserNav;
