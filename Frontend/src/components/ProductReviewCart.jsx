import React from "react";

function ProductReviewCart() {
   const reviews = [
    {
      avatar:
        "https://storage.googleapis.com/a1aa/image/4083ff4a-2a42-478e-f53e-ef74d4392c77.jpg",
      name: "Thwouuu",
      rating: 5,
      date: "2024-11-15",
      time: "20:11",
      variant: "màu xanh",
      content:
        "Sản phẩm khá tốt chó của tôi rất thích sản phẩm này . Sản đúng dịp Sale nên giá cũng khá hợp lí . Sẽ quay lại ủng hộ ^^",
      images: [
        "https://storage.googleapis.com/a1aa/image/dca48d3e-3bf6-4518-ae16-5f9b2ff5f308.jpg",
        "https://storage.googleapis.com/a1aa/image/9e93bf79-3896-426e-b6ce-431d20944f5d.jpg",
      ],
    },
    {
      avatar:
        "https://storage.googleapis.com/a1aa/image/430822a0-5ddc-4225-98d1-55bce13533fa.jpg",
      name: "Thwouuu",
      rating: 5,
      date: "2024-11-15",
      time: "20:11",
      variant: "màu xanh",
      content:
        "Sản phẩm khá tốt chó của tôi rất thích sản phẩm này . Sản đúng dịp Sale nên giá cũng khá hợp lí . Sẽ quay lại ủng hộ ^^",
      images: [
        "https://storage.googleapis.com/a1aa/image/dca48d3e-3bf6-4518-ae16-5f9b2ff5f308.jpg",
        "https://storage.googleapis.com/a1aa/image/9e93bf79-3896-426e-b6ce-431d20944f5d.jpg",
      ],
    },
  ];

  return (
    <div className="mx-20">

      {reviews.map((review, index) => (
        <div key={index} className="bg-white rounded-3xl shadow-md p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{review.name}</p>
              <div className="flex items-center text-[#d46a00] text-xs mt-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <i key={i} className="fas fa-star" />
                ))}
              </div>
            </div>
          </div>

          <div className="text-[14px] text-gray-600 mb-2 flex flex-wrap gap-1">
            <span>{review.date}</span>
            <span>{review.time}</span>
            <span>Phân loại:</span>
            <span className="whitespace-nowrap">{review.variant}</span>
          </div>

          <p className=" mb-2 leading-tight">{review.content}</p>

          <div className="flex gap-2">
            {review.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Ảnh ${i + 1}`}
                className="w-[60px] h-[50px] object-cover rounded"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductReviewCart;
