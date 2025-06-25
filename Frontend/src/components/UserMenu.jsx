import React, { useState } from "react";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoTo = (path) => {
    handleClose();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    handleClose();
    window.location.href = "/";
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar style={{ backgroundColor: "#E35E25" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {role === "shop"
          ? [
              <MenuItem
                key="shop-manage"
                onClick={() => handleGoTo("/shop/product-manager")}
              >
                Quản lí cửa hàng
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                Đăng xuất
              </MenuItem>,
            ]
          : [
              <MenuItem key="profile" onClick={() => handleGoTo("/profile/" + user._id)}>
                Hồ sơ
              </MenuItem>,
              <MenuItem key="orders" onClick={() => handleGoTo("/order-personal/" + user._id)}>
                Đơn mua
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                Đăng xuất
              </MenuItem>,
            ]}
      </Menu>
    </>
  );
}

export default UserMenu;
