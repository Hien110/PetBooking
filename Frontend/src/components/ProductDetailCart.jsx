import { Button } from "@mui/material";
import { useEffect, useState } from "react";
const ProductDetailCart = ({ product }) => {
  
  const [quantity, setQuantity] = useState(1);
  const [listImage, setListImage] = useState([]);
  


    useEffect(() => {
      if (product?.image && Array.isArray(product.image)) {
        setListImage(product.image || []);
      }
    }, [product]);

  const increase = () => setQuantity((prev) => prev + 1 < product?.quantity ?  prev + 1 : product?.quantity);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  
  const [selected, setSelected] = useState(""); // hoặc mặc định là 'gà' nếu cần

  const handleSelect = (flavor) => {
    setSelected(flavor);
  };

  const baseStyle = {
    borderColor: "#E35E25",
    color: "#c4662a",
    borderRadius: "9999px",
    textTransform: "none",
    px: 2,
  };

  const activeStyle = {
    backgroundColor: "#E35E25",
    color: "white",
  };

  return (
    <div className="ml-20 mr-20 rounded-3xl bg-[#ffffff] mt-5 p-6">
      <main className="mx-auto flex flex-col md:flex-row gap-8">
        {/* Left side images */}
        <div
          className="flex flex-col items-center md:items-start gap-4"
          style={{ alignItems: "center" }}
        >
          <div
            className="bg-[#e7e7e7] rounded-3xl p-6 flex justify-center items-center shadow-sm"
            style={{ width: "380px", height: "450px" }}
          >
            <img
              src={product?.image[0]?.url || "https://via.placeholder.com/380x450"}
              alt="Snack bag"
              className="object-contain max-h-full"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          <div className="flex gap-4">
            {listImage.map((image, idx) => (
              <img
                key={idx}
                src={image.url}
                alt={`Thumbnail ${idx + 1}`}
                className="rounded-xl border object-contain w-18 h-18 cursor-pointer"
                width={90}
                height={90}
              />
            ))}
          </div>
        </div>

        {/* Right side content */}
        <div className="flex flex-col flex-1 gap-4">
          <h1 className="text-[#2e328a] font-extrabold text-xl md:text-2xl leading-tight">
            {product?.productName}
          </h1>
          <div className="flex justify-between text-custom-orange font-semibold text-base md:text-lg">
            <p>
              Đánh Giá: 4.5 <i className="fas fa-star"></i>
            </p>
            <p>Lượt bán: 3000 đơn</p>
          </div>
          <p className="text-custom-orange font-extrabold text-2xl md:text-3xl">
            {product?.price?.toLocaleString('vi-VN')} đ
          </p>

          <div className="flex gap-4">
            <Button
              variant="outlined"
              onClick={() => handleSelect("gà")}
              sx={{
                ...baseStyle,
                ...(selected === "gà" && activeStyle),
                "&:hover":
                  selected === "gà"
                    ? activeStyle
                    : { backgroundColor: "#c4662a", color: "white" },
              }}
            >
              Vị gà
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleSelect("cá")}
              sx={{
                ...baseStyle,
                ...(selected === "cá" && activeStyle),
                "&:hover":
                  selected === "cá"
                    ? activeStyle
                    : { backgroundColor: "#E35E25", color: "white" },
              }}
            >
              Vị cá
            </Button>
          </div>

          <label
            className="text-[#000000] font-semibold text-base md:text-lg"
            htmlFor="quantity"
          >
            Số lượng
          </label>
          <div className="inline-flex items-center border border-[#E35E25] rounded-full w-max px-4 py-1 text-[#E35E25] font-semibold text-lg md:text-xl select-none">
            <button
              onClick={decrease}
              className="text-[#E35E25] font-bold text-2xl pb-1 md:text-3xl px-3 hover:opacity-80"
            >
              −
            </button>
            <span className="px-6 text-center min-w-[2rem]">
              {quantity.toString().padStart(2, "0")}
            </span>
            <button
              onClick={increase}
              className="text-[#E35E25] font-bold text-2xl pb-1 md:text-3xl px-3 hover:opacity-80"
            >
              +
            </button>
          </div>

          <p className="text-[#2e328a] font-extrabold text-base md:text-lg">
            Trạng thái:{" "}
            <span className="font-normal text-[#5a8a4a]">{product?.quantity}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <Button
              sx={{
                backgroundColor: "#2e328a",
                color: "white",
                borderRadius: "9999px",
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 500,
                "&:hover": { backgroundColor: "#232764" },
                textTransform: "none",
              }}
            >
              Thêm vào giỏ
            </Button>
            <Button
              sx={{
                backgroundColor: "#E35E25",
                color: "white",
                borderRadius: "9999px",
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 500,
                "&:hover": { backgroundColor: "#c4662a" },
                textTransform: "none",
              }}
            >
              Mua ngay
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailCart;
