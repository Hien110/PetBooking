export default function ShopCart({ shop, width, height }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-lg"
      style={{ width: width, height: height }}
    >
      <img
        src={shop.avatar}
        alt={shop.name}
        className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-xl font-bold text-white">{shop.name}</h3>
        <p className="text-sm text-gray-200">{shop.address || "Địa chỉ chưa cập nhật"}</p>
      </div>
    </div>
  );
}
