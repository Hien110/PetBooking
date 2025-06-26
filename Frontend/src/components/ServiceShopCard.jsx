import { useNavigate } from "react-router-dom";

export default function ServiceShopCard({
  service,
  widthCard,
  heightCard,
  heightImage,
  textSizeName,
  textSizePrice,
  buttonSize,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/shop/service-manager/${service._id}`);
    console.log(service._id);
  };
  return (
    <div
      className={`p-4 bg-white shadow-md rounded-2xl flex flex-col border border-gray-200`}
      style={{ width: `${widthCard}px`, height: `${heightCard}px` }}
      onClick={handleClick}
    >
      {service.image && service.image.length > 0 && (
        <img
          src={service.image[0]}
          alt={service.serviceName}
          className={`w-full rounded-2xl mb-3 object-cover`}
          style={{ height: `${heightImage}px` }}
        />
      )}

      <div className="flex flex-col flex-grow">
        <h3
          className={`font-bold text-primary truncate text-center `}
          style={{ fontSize: `${textSizeName}px` }}
        >
          {service.serviceName}
        </h3>

        <div className="mt-auto">
          <div
            className="text-primary font-bold text-center"
            style={{ fontSize: `${textSizePrice}px` }}
          >
            Giá Chỉ Từ {Number(service.priceRange).toLocaleString("vi-VN")} VNĐ
          </div>

          <button
            className={`bg-orange-500 text-white rounded-lg py-2 w-full mt-3 hover:bg-orange-600`}
            style={{ fontSize: `${buttonSize}px` }}
          >
            XEM CHI TIẾT
          </button>
        </div>
      </div>
    </div>
  );
}
