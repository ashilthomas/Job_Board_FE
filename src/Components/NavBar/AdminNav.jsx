// src/Components/NavBar/AdminNav.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, role } = useSelector((state) => state.user);

  return (
    <nav className="navbar text-white p-4 bg-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-serif font-bold">
          Go<span className="text-primary font-bold">Job</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li className="group relative">
            <button className="hover:text-purple-400">Jobs</button>
            <div className="hidden group-hover:block absolute bg-white text-black rounded-md shadow-md mt-2 w-48">
              <Link to="/jobs" className="block px-4 py-2 hover:bg-gray-100">
                All Jobs
              </Link>
              <Link to="/admin/jobs" className="block px-4 py-2 hover:bg-gray-100">
                Manage Jobs
              </Link>
            </div>
          </li>
          <li>
            <Link to="/about" className="hover:text-purple-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-purple-400">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-purple-400">
              Contact
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        {!token && (
          <div className="hidden md:flex gap-3 items-center">
            <button className="border-b border-slate-500 cursor-pointer px-4 pb-1">
              Login
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-2xl">
              Signup
            </button>
          </div>
        )}

        {/* Mobile Toggle */}
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
          <Link to="/jobs" className="hover:text-purple-400">
            Jobs
          </Link>
          <Link to="/about" className="hover:text-purple-400">
            About
          </Link>
          <Link to="/services" className="hover:text-purple-400">
            Services
          </Link>
          <Link to="/contact" className="hover:text-purple-400">
            Contact
          </Link>
          {!token && (
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
              Get Started
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default AdminNav;
