import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


import LogoPet1 from '../assets/images/LogoPet1.png';
import { Link } from 'react-router-dom';
function Footer() {
  return (
     <footer className="bg-custom-orange text-white font-sans px-6 py-10 mx-auto flex flex-wrap justify-between pl-20 pr-20" style={{ gap: '6rem' }}>
      {/* Logo + Name */}
      <div className="flex flex-col items-center sm:items-start w-full sm:w-auto mb-8 sm:mb-0">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={LogoPet1}
            alt="Fluffy white dog standing on green grass"
            style={{ width: "250px" }}
            className="mt-16"
          />
        </Link>
      </div>

      {/* Contact Section */}
      <div className="w-full sm:w-auto sm:flex-1 mb-8 sm:mb-0">
        <h3 className="font-semibold text-base mb-6">LIÊN HỆ NGAY</h3>
        <div className="flex items-center mb-4 space-x-3">
          <EmailIcon className="text-white" />
          <span className="text-sm">Petbookingservice@gmail.com</span>
        </div>
        <div className="flex items-center mb-4 space-x-3">
          <PhoneIcon className="text-white" />
          <span className="text-sm">Hotline 0934 679 768</span>
        </div>
        <div className="flex items-center space-x-4 text-lg">
          <button aria-label="Phone" className="focus:outline-none">
            <PhoneAndroidIcon className="text-white" />
          </button>
          <button aria-label="Facebook" className="focus:outline-none">
            <FacebookIcon className="text-white" />
          </button>
          <button aria-label="Instagram" className="focus:outline-none">
            <InstagramIcon className="text-white" />
          </button>
        </div>
      </div>

      {/* Connect Section */}
      <div className="w-full sm:w-auto sm:flex-1 mb-8 sm:mb-0">
        <h3 className="font-semibold text-base mb-6">KẾT NỐI</h3>
        <ul className="space-y-3 text-sm max-w-[180px]">
          <li>Trung tâm trợ giúp</li>
          <li>Hướng Dẫn Mua Hàng</li>
          <li>Chính Sách Bảo Mật</li>
          <li>Quy Chế Hoạt Động</li>
          <li>Đăng ký doanh nghiệp</li>
        </ul>
      </div>

      {/* Services Section */}
      <div className="w-full sm:w-auto sm:flex-1">
        <h3 className="font-semibold text-base mb-6">DỊCH VỤ</h3>
        <ul className="space-y-3 text-sm max-w-[180px]">
          <li>Spa Thú Cưng</li>
          <li>Dịch Vụ Spa, Grooming</li>
          <li>Khách Sạn Thú Cưng</li>
          <li>Cung Cấp Sản Phẩm, Phụ</li>
          <li>Kiện</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
