import React from 'react'
import { Avatar, Box, Button } from "@mui/material";

function ProductShopTag({ product }) {
   
  return (
      <div className="mr-20 ml-20 bg-white rounded-3xl justify-around items-center justify flex flex-col my-10 flex-row gap-6 py-4 shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
        {/* Left: Avatar and text */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Avatar
            src="https://storage.googleapis.com/a1aa/image/8bfa47a8-d304-4281-db3e-015cbd88ff0f.jpg"
            alt="Shop Avatar"
            sx={{ width: 64, height: 64 }}
          />
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-[#1A1A1A] font-semibold text-base leading-5">
              {product?.sellerId?.name || "Tên Cửa Hàng"}
            </span>
            <span className="text-[#6B7280] text-xs leading-4 mt-1">
              Online 12 Phút Trước
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#E35E25",
              color: "white",
              textTransform: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#b94d00" },
            }}
            startIcon={<i className="fas fa-comment-alt text-[10px]" />}
          >
            Chat ngay
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#2e328a",
              color: "white",
              textTransform: "none",
              padding: "8px 20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#162050" },
            }}
          >
            Xem shop
          </Button>
        </div>

        {/* Vertical divider */}
        <div className="hidden sm:block border-l border-[#D35400] h-12"></div>

        {/* Info columns */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-xs leading-4">
          <div className="flex flex-col gap-1 text-[#D35400] font-semibold">
            <span>Đánh Giá</span>
            <span>Sản Phẩm</span>
          </div>
          <div className="flex flex-col gap-1 text-[#1E2A64] font-semibold">
            <span>746</span>
            <span>86</span>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden sm:block border-l border-[#D35400] h-12"></div>

        {/* Right info */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-xs leading-4">
          <div className="flex flex-col gap-1 text-[#D35400] font-semibold">
            <span>Tham Gia</span>
            <span>Người Theo Dõi</span>
          </div>
          <div className="flex flex-col gap-1 text-[#1E2A64] font-semibold">
            <span>10 tháng trước</span>
            <span>1,7K</span>
          </div>
        </div>
      </div>
  )
}

export default ProductShopTag;
