import { useState } from "react";
import { FaHome, FaInfo, FaConciergeBell, FaPhone, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Add Job", icon: FaHome, link: "/admin" },
  { label: "All Jobs", icon: FaInfo, link: "/alljobs" },
  { label: "Services", icon: FaConciergeBell, link: "/services" },
  { label: "Contact", icon: FaPhone, link: "/contact" },
];

const AdminSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <div className={`flex flex-col h-screen bg-gray-900 text-white border-r px-5 transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h1 className="text-lg font-bold">GoJob Admin</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="text-gray-300 hover:text-white"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 mt-4 space-y-2">
        {menuItems.map(({ label, icon: Icon, link }) => (
          <li key={label}>
            <Link
              to={link}
              className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-primary transition ${
                location.pathname === link ? "bg-primary text-white" : ""
              }`}
              role="menuitem"
            >
              <Icon className="text-xl" />
              {isOpen && <span>{label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-sm">
        {isOpen && `© ${new Date().getFullYear()} GoJob`}
      </div>
    </div>
  );
};

export default AdminSideBar;