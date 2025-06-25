import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ProductCardShop({
  product,
  widthCard,
  heightCard,
  heightImage,
  textSizeName,
  textSizeDescription,
  textSizePrice,
  buttonSize,
}) {
  const navigate = useNavigate();
  const handleClick = (productID) => {
    navigate(`/shop/product-manager/detail/${productID}`);
  };

  return (
    <div
      onClick={() => handleClick(product._id)}
      className="p-4 bg-custom-orange shadow-md rounded-2xl flex flex-col hover:cursor-pointer hover:bg-[#FF773E] hover:scale-95 transition-all duration-300"
      style={{ width: `${widthCard}px`, height: `${heightCard}px` }}
    >
      <img
        src={product.image[0]}
        alt={product.name}
        className="w-full rounded-2xl mb-2"
        style={{ height: `${heightImage}px` }}
      />

      {/* Tên sản phẩm (1 dòng, ellipsis) */}
      <h3
        className="font-bold text-white mb-1 truncate"
        style={{ fontSize: `${textSizeName}px` }}
      >
        {product.productName}
      </h3>

      {/* Mô tả sản phẩm (2 dòng, ellipsis) */}
      <div
        className="text-white mb-2 overflow-hidden"
        style={{
          fontSize: `${textSizeDescription}px`,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
        dangerouslySetInnerHTML={{ __html: product?.description }}
      />

      {/* Giá và nút */}
      <div className="flex justify-center items-center mt-auto">
        <span
          className="text-custom-orange font-bold bg-white p-2 rounded-xl"
          style={{
            fontSize: `${textSizePrice}px`,
            width: "200px",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          {Number(product.price).toLocaleString("vi-VN")}{" "}
          <span style={{ fontSize: `${textSizePrice}px` }}>VND</span>
        </span>

        <div className="flex justify-center items-center ml-4">
          <button
            className="bg-white rounded-full text-custom-orange hover:bg-orange-100"
            style={{ width: `${buttonSize}px`, height: `${buttonSize}px` }}
          >
            <ShoppingCart fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
}
