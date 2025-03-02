import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Hamburger Button for small screens */}
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[#151515] p-2 fixed rounded-lg sm:hidden z-50`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes className="text-white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </>
        )}
      </button>

      {/* Side menu on smaller screens */}
      {isMenuOpen && (
        <section className="bg-[#151515] p-4 fixed top-0 left-0 w-2/3 h-full sm:hidden z-40 transition-transform transform ease-in-out duration-300">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}

      {/* Sidebar for larger screens */}
      <section className="hidden sm:flex flex-col bg-[#151515] p-4 fixed top-0 left-0 h-full w-60 z-30">
        <ul className="list-none mt-2">
          <li>
            <NavLink
              className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
              to="/admin/dashboard"
              style={({ isActive }) => ({
                color: isActive ? "greenyellow" : "white",
              })}
            >
              Admin Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
              to="/admin/categorylist"
              style={({ isActive }) => ({
                color: isActive ? "greenyellow" : "white",
              })}
            >
              Create Category
            </NavLink>
          </li>
          <li>
            <NavLink
              className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
              to="/admin/productlist"
              style={({ isActive }) => ({
                color: isActive ? "greenyellow" : "white",
              })}
            >
              Create Product
            </NavLink>
          </li>
          <li>
            <NavLink
              className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
              to="/admin/allproductslist"
              style={({ isActive }) => ({
                color: isActive ? "greenyellow" : "white",
              })}
            >
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
              to="/admin/userlist"
              style={({ isActive }) => ({
                color: isActive ? "greenyellow" : "white",
              })}
            >
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
              to="/admin/orderlist"
              style={({ isActive }) => ({
                color: isActive ? "greenyellow" : "white",
              })}
            >
              Manage Orders
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
};

export default AdminMenu;
