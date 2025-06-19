import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";

import LogoPet from "../assets/images/LogoPet.png";
import { ROUTE_PATH } from "../constants/routePath";
function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div>
      <nav className="flex items-center justify-between px-4 py-5 bg-white border-b border-gray-200 shadow-md pl-20 pr-20">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={LogoPet}
              alt="Small fluffy white dog with a happy expression in a circular frame"
              className="h-10 rounded-full object-cover"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-10 font-bold text-[18px] leading-[24px]">
          <li>
            <Link
              to={ROUTE_PATH.HOME}
              className={`px-6 py-2 rounded-full ${
                isActive(ROUTE_PATH.HOME) ? "bg-[#E35E25] text-white" : "text-[#1E2A6F]"
              }`}
            >
              TRANG CHỦ
            </Link>
          </li>
          <li>
            <Link
              to={ROUTE_PATH.PRODUCT}
              className={`px-6 py-2 rounded-full ${
                isActive(ROUTE_PATH.PRODUCT)
                  ? "bg-[#E35E25] text-white"
                  : "text-[#1E2A6F]"
              }`}
            >
              SẢN PHẨM
            </Link>
          </li>
          <li>
            <Link
              to={ROUTE_PATH.SERVICE}
              className={`px-6 py-2 rounded-full ${
                isActive(ROUTE_PATH.SERVICE)
                  ? "bg-[#E35E25] text-white"
                  : "text-[#1E2A6F]"
              }`}
            >
              DỊCH VỤ
            </Link>
          </li>
          <li>
            <Link
              to={ROUTE_PATH.SHOP}
              className={`px-6 py-2 rounded-full ${
                isActive(ROUTE_PATH.SHOP) ? "bg-[#E35E25] text-white" : "text-[#1E2A6F]"
              }`}
            >
              CỬA HÀNG
            </Link>
          </li>
        </ul>
        {/* Action Buttons */}
        <div className="hidden md:flex space-x-6 text-white text-lg">
          {isLoggedIn ? (
            <>
              <button
                aria-label="Shopping cart"
                className="bg-[#E35E25] rounded-full w-10 h-10 flex items-center justify-center"
              >
                <ShoppingCartIcon />
              </button>
              <button
                aria-label="Search"
                className="bg-[#E35E25] rounded-full w-10 h-10 flex items-center justify-center"
              >
                <SearchIcon />
              </button>
              <div
                type="b"
                aria-label="User account"
                className="bg-[#E35E25] rounded-full w-10 h-10 flex items-center justify-center hover:cursor-pointer"
              >
                {isLoggedIn && <UserMenu  />}
              </div>
            </>
          ) : (
            <>
              <Link
                to={ROUTE_PATH.LOGIN}
                className="bg-[#E35E25] text-[14px] text-white px-3 py-1 rounded-full hover:bg-[#c24d1f]"
              >
                Đăng nhập
              </Link>
              <Link
                to={ROUTE_PATH.REGISTER}
                className="bg-[#E35E25] text-[14px] text-white px-3 py-1 rounded-full hover:bg-[#c24d1f]"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
