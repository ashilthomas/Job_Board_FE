import React, { useState } from "react";
import { FaHome, FaInfo, FaConciergeBell, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  const menuItems = [
    {
      label: "AddJob",
      icon: FaHome,
      link:"/admin"
    },
    {
      label: "AllJobs",
      icon: FaInfo,
      link:"/alljobs"
    },
    {
      label: "Services",
      icon: FaConciergeBell,
    },
    {
      label: "Contact",
      icon: FaPhone,
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col h-screen text-white border-r  px-5 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className={`text-lg font-bold ${!isOpen && "hidden"}`}>
          App Name
        </h1>
        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 mt-4 space-y-2">
  {menuItems.map((item, index) => (
    <li
      key={index}
      className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-primary border-b cursor-pointer"
    >
      <Link to={item.link} className="flex items-center space-x-4">
        <item.icon className="text-xl" />
        <span className={`${!isOpen && "hidden"} transition-opacity duration-300`}>
          {item.label}
        </span>
      </Link>
    </li>
  ))}
</ul>


      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <span className={`${!isOpen && "hidden"} text-sm`}>
          © 2025 App Name
        </span>
      </div>
    </div>
  );
};

export default AdminSideBar;

