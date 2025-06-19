import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ProductService } from "../services/productService";
import { UserService } from "../services/userService";

import { NextArrow, PrevArrow } from "../components/ArrowCustom";

import { Button } from "@mui/material";

import DogAndCat from "../assets/images/DogAndCat.png";
import CatTia from "../assets/images/CatTia.png";
import HuanLuyen from "../assets/images/HuanLuyen.png";
import DichVuYTe from "../assets/images/DichVuYTe.png";
import DichVuKS from "../assets/images/DichVuKS.png";
import ProductCard from "../components/ProductCart";
import ShopCart from "../components/ShopCart";

function HomePage() {
  const [productsFeatured, setProductsFeatured] = useState([]);
  const [shops, setShops] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  
   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await ProductService.getProducts();
        setProductsFeatured(products.slice(0, 8));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const fetchShops = async () => {
      try {
        const shopsData = await UserService.getShop();
        setShops(shopsData.slice(0, 5));
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);
  return (
    <div>
      <div>
        <div className=" pl-20 pr-20 mx-auto pt-12">
          <section className="relative flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-0">
            <div className=" md:flex-1 flex flex-col justify-center">
              <h1 className="text-[90px] leading-[90px] font-extrabold text-custom-orange select-none">
                PET <br /> BOOKING
              </h1>
              <div className="mt-4 rounded-3xl bg-custom-orange p-8 shadow-lg flex flex-col justify-between">
                <div>
                  <p className="text-white text-[18px] leading-6 font-normal max-w-[600px] -">
                    PetBooking là nền tảng toàn diện giúp khách hàng dễ dàng tìm
                    kiếm, đặt lịch và mua sắm các sản phẩm, dịch vụ dành cho thú
                    cưng chỉ trong vài bước đơn giản. Dù bạn đang cần mua thức
                    ăn dinh dưỡng, phụ kiện thời trang, hay muốn đặt lịch spa,
                    cắt tỉa lông, tắm gội, huấn luyện, hoặc thậm chí là khám
                    chữa bệnh định kỳ, PetBooking đều có thể đáp ứng nhanh chóng
                    và tiện lợi.
                  </p>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#fff",
                      color: "#c4662e",
                      fontWeight: 800,
                      marginTop: "40px",
                      fontFamily: "inherit",
                    }}
                    className="rounded-full shadow-md hover:shadow-lg active:shadow-sm transition-shadow select-none text-lg"
                  >
                    TÌM HIỂU THÊM
                  </Button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0">
                <img
                  src={DogAndCat}
                  alt="Cat and dog"
                  className="rounded-r-3xl object-cover "
                  width={600}
                  height={320}
                />
              </div>
            </div>
          </section>

          <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-0">
            <h2 className="text-center text-[#2a327d] font-extrabold text-xl sm:text-2xl md:text-3xl leading-tight select-none">
              DỊCH VỤ THÚ CƯNG HÀNG ĐẦU
            </h2>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 max-w-7xl mx-auto text-center">
              {[
                {
                  title: "Dịch vụ cắt tỉa lông",
                  description:
                    "Với dịch vụ grooming & spa chuyên nghiệp, thú cưng của bạn sẽ được chăm sóc tỉ mỉ, sạch đẹp và thư giãn.",
                  img: `${CatTia}`,
                },
                {
                  title: "Huấn luyện thú cưng",
                  description:
                    "Huấn luyện thú cưng nghe lệnh, cư xử đúng. Chủ yếu dùng thường để khuyến khích hoặc kỷ luật nhẹ để điều chỉnh.",
                  img: `${HuanLuyen}`,
                },
                {
                  title: "Dịch vụ khách sạn",
                  description:
                    "Dịch vụ lưu trú thú cưng được cung cấp bởi các pet shop uy tín, mang đến không gian sạch sẽ, tiện nghi cùng chế độ chăm sóc tận tâm.",
                  img: `${DichVuKS}`,
                },
                {
                  title: "Dịch vụ Y tế",
                  description:
                    "Thú cưng của bạn sẽ được thăm khám, tiêm phòng và chăm sóc sức khỏe tốt nhất. Kết nối ngay qua nền tảng của chúng tôi để tìm địa chỉ phù hợp!",
                  img: `${DichVuYTe}`,
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center px-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="mb-4 w-16 h-16"
                    width={64}
                    height={64}
                  />
                  <h3 className="text-[#c4662e] font-extrabold text-base leading-5 mb-2 select-none">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-5 max-w-[180px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-0 mt-20">
        <h2 className="text-center text-[#2a327d] font-extrabold text-xl sm:text-2xl md:text-3xl leading-tight select-none">
          SẢN PHẨM NỔI BẬT
        </h2>
        <Slider {...settings} className="mt-12">
          {productsFeatured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              widthCard={300}
              heightCard={420}
              heightImage={270}
              textSizeName={18}
              textSizeDescription={12}
              textSizePrice={16}
              buttonSize={40}
            />
          ))}
        </Slider>
      </div>
      <div className="text-[#2e2e7a]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-center font-extrabold text-[28px] leading-[34px] mb-10">
            CÁC CÂU HỎI THƯỜNG GẶP
          </h1>
          <div className="flex flex-col md:flex-row md:space-x-16">
            {/* Left side */}
            <div className="flex flex-col space-y-6 md:w-1/2">
              <div className="border border-[#c36a2a] rounded-xl p-6 text-[#2e2e7a] font-semibold text-[18px] leading-[22px]">
                Dấu hiệu nào cho thấy thú cưng bị dị ứng thức ăn?
                <p className="font-normal text-[14px] leading-[20px] mt-2">
                  Nếu bé cưng thường xuyên gãi ngứa, rụng lông bất thường hoặc
                  gặp vấn đề tiêu hóa như tiêu chảy hay nôn mửa, rất có thể
                  chúng đang bị dị ứng thức ăn! Vậy làm sao để nhận biết và xử
                  lý kịp thời? Hãy cùng tìm hiểu ngay!
                </p>
              </div>
              <button
                type="button"
                className="border border-[#c36a2a] rounded-xl py-3 px-4 text-[#2e2e7a] font-semibold text-[18px] leading-[22px] text-left"
              >
                Làm thế nào để phòng ngừa bọ chét và ve cho thú cưng?
              </button>
              <button
                type="button"
                className="border border-[#c36a2a] rounded-xl py-3 px-4 text-[#2e2e7a] font-semibold text-[18px] leading-[22px] text-left"
              >
                Những loại vắc-xin nào là bắt buộc cho chó/mèo?
              </button>
              <button
                type="button"
                className="border border-[#c36a2a] rounded-xl py-3 px-4 text-[#2e2e7a] font-semibold text-[18px] leading-[22px] text-left"
              >
                Nếu thú cưng có dấu hiệu căng thẳng khi grooming thì xử lý thế
                nào?
              </button>
            </div>

            {/* Right side */}
            <div className="mt-10 md:mt-0 md:w-1/2 flex flex-col space-y-6">
              <div>
                <h2 className="font-semibold text-[18px] leading-[22px] mb-2">
                  Có những dịch vụ nào dành cho thú cưng?
                </h2>
                <p className="text-[14px] leading-[20px] text-[#2e2e7a] max-w-xl">
                  Chúng tôi kết nối bạn với các dịch vụ thú cưng uy tín, từ cửa
                  hàng phụ kiện & thực phẩm, Grooming & Spa, đến chăm sóc sức
                  khỏe thú y và khách sạn trông giữ. Dễ dàng tìm kiếm và đặt
                  dịch vụ chất lượng, giúp thú cưng luôn khỏe mạnh và hạnh phúc!
                </p>
              </div>
              <div className="flex space-x-4">
                <div className="relative rounded-xl overflow-hidden w-[120px] h-[120px] flex-shrink-0">
                  <img
                    src="https://storage.googleapis.com/a1aa/image/67ff267b-4bb7-46c5-6c91-120a5c05effb.jpg"
                    alt="A brown dog being groomed by a person using scissors in a pet grooming salon"
                    className="w-full h-full object-cover"
                    width={120}
                    height={120}
                  />
                  <div className="absolute bottom-0 left-0 bg-[#c36a2a] text-white text-[12px] leading-[16px] px-3 py-1 rounded-tr-xl">
                    22/2/2024
                  </div>
                </div>
                <div className="max-w-[calc(100%-120px-16px)]">
                  <h3 className="font-semibold text-[18px] leading-[22px] mb-1">
                    Giữ sức khoẻ cho trẻ nhỏ khi trong nhà có nuôi chó mèo ?
                  </h3>
                  <p className="text-[14px] leading-[20px] text-[#2e2e7a]">
                    Nuôi thú cưng trong nhà giúp trẻ nhỏ phát triển tình cảm và
                    trách nhiệm, tuy nhiên cũng cần lưu ý vệ sinh và phòng bệnh.
                    Hãy đảm bảo chó mèo được tiêm phòng đầy đủ, tẩy giun định kỳ
                    và giữ sạch sẽ không gian sống để bảo vệ sức khỏe của cả gia
                    đình.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-0 mb-20">
        <h2 className="text-center text-[#2a327d] font-extrabold text-xl sm:text-2xl md:text-3xl leading-tight select-none">
          CỬA HÀNG NỔI BẬT
        </h2>
        <Slider {...settings} className="mt-12">
          {shops.map((shop) => (
            <ShopCart key={shop._id} shop={shop} width={300} height={400} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default HomePage;
