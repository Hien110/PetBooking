import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';

const banners = [
  "https://img6.thuthuatphanmem.vn/uploads/2022/01/27/anh-thu-cung-cute-full-hd_014113870.jpg",
  "https://th.bing.com/th/id/OIP.AZXJW2i65qjDQWE4vI4pCAHaEo?r=0&rs=1&pid=ImgDetMain",
  "https://static.vecteezy.com/system/resources/previews/029/483/692/non_2x/cute-puppy-lying-down-looking-at-camera-playful-and-loyal-generated-by-ai-free-photo.jpg",
  "https://th.bing.com/th/id/OIP.JhVR3HBp_w6BEJNvCeZWEwHaFJ?r=0&rs=1&pid=ImgDetMain"
];

function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToPrevSlide = () => setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  const goToNextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);

  return (
    <div className="relative mb-8 rounded-lg overflow-hidden">
      <div className="relative h-48 md:h-56 lg:h-64 xl:h-72">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <IconButton
        onClick={goToPrevSlide}
        sx={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'white',
          '&:hover': { bgcolor: '#f3f4f6' },
        }}
        aria-label="Trước"
      >
        <i className="fas fa-chevron-left text-gray-700"></i>
      </IconButton>
      <IconButton
        onClick={goToNextSlide}
        sx={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'white',
          '&:hover': { bgcolor: '#f3f4f6' },
        }}
        aria-label="Tiếp"
      >
        <i className="fas fa-chevron-right text-gray-700"></i>
      </IconButton>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-[#F97316]' : 'bg-white'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerSlider;