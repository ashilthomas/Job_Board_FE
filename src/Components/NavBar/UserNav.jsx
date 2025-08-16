// src/Components/NavBar/UserNav.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropDownBtn } from "../DropDownBtn/DropDownBtn";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "@/Redux/userData";
import jsCookie from "js-cookie";

const UserNav = ({ openLogin, openSignup }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useSelector((state) => state.user);

  const LogOut = () => {
    dispatch(setLogOut());
    jsCookie.remove("token");
    navigate("/");
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl 
      bg-white/20 backdrop-blur-md border border-white/30 shadow-lg 
      rounded-2xl px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <div className="text-2xl font-serif font-bold text-white tracking-wide">
            Go<span className="text-purple-400">Job</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-white">
          <Link to={"/jobs"} className="hover:text-purple-400 transition">
            Jobs
          </Link>
          <Link to={"/recommended"} className="hover:text-purple-400 transition">
            Recommends
          </Link>
          <button className="hover:text-purple-400 transition">About</button>
          <a href="/" className="hover:text-purple-400 transition">
            Services
          </a>
          <div className="group relative">
            <button className="hover:text-purple-400 flex items-center gap-1 transition">
              Pages
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {/* Dropdown */}
            <div className="hidden group-hover:block absolute top-full mt-2 
              bg-white text-gray-800 rounded-xl shadow-lg py-2 w-44">
              <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                Submenu 1
              </a>
              <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                Submenu 2
              </a>
            </div>
          </div>
          <a href="/" className="hover:text-purple-400 transition">
            Contact
          </a>
        </div>

        {/* Get Started / Auth Buttons */}
        <div className="flex gap-3 items-center">
          {!token && (
            <>
              <span
                onClick={() => openLogin("login")}
                className="hidden md:block cursor-pointer text-white px-4 py-1 
                  border border-white/30 rounded-lg hover:bg-white/10 transition"
              >
                Login
              </span>
              <button
                onClick={() => openSignup("signup")}
                className="hidden md:block bg-purple-600 hover:bg-purple-700 
                  text-white px-4 py-2 rounded-xl shadow-md transition"
              >
                Signup
              </button>
            </>
          )}

          <DropDownBtn logOut={LogOut} />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2 text-white">
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
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow-md">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default UserNav;

