import React from "react";
import { ROUTE_PATH } from "../constants/routePath";
import MainLayout from "../layouts/main-layout";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const ProductDetailPage = React.lazy(() =>
  import("../pages/ProductDetailPage")
);
const ProductPage = React.lazy(() => import("../pages/ProductPage"));
const ProfileUser = React.lazy(() => import("../pages/ProfileUser"));
const RegisterPage = React.lazy(() => import("../pages/RegisterPage"));
const ServicePage = React.lazy(() => import("../pages/ServicePage"));
const ShopPage = React.lazy(() => import("../pages/ShopPage"));
const OTPVerifyPage = React.lazy(() => import("../pages/VerifyPage"));
const OrderPage = React.lazy(() => import("../pages/OrderPage"));
const OrderSuccessPage = React.lazy(() => import("../pages/OrderSuccessPage"));
const OrderShopPage = React.lazy(() => import("../pages/OrderShopPage"));
const ProductManagerPage = React.lazy(() => import("../pages/ProductManagerPage"));
const ServiceManagerPage = React.lazy(() => import("../pages/ServiceManagerPage"));
const ServiceManageDetailPage = React.lazy(() => import("../pages/ServiceManageDetailPage"));
const ServiceDetailPage = React.lazy(() => import("../pages/ServiceDetailPage"));
const ProductManageDetailPage = React.lazy(() => import("../pages/ProductManageDetailPage"));
const CreateServicePage = React.lazy(() => import("../pages/CreateServicePage"));
const CreateProductPage = React.lazy(() => import("../pages/CreateProductPage"));
const OrderPersonalPage = React.lazy(() => import("../pages/OrderPersonalPage"));
const BookingServicePage = React.lazy(() => import("../pages/BookingServicePage"));
const BookingSuccessPage = React.lazy(() => import("../pages/BookingSuccessPage"));
const BookingPersonalPage = React.lazy(() => import("../pages/BookingPersonalPage"));
const BookingShopPage = React.lazy(() => import("../pages/BookingShopPage"));

const ShopProfilePage = React.lazy(() => import("../pages/ShopProfilePage"));
const ShopProfileUpdatePage = React.lazy(() => import("../pages/ShopProfileUpdatePage"));

const AppRoute = [
  { path: ROUTE_PATH.HOME, page: HomePage, layout: MainLayout },
  { path: ROUTE_PATH.LOGIN, page: LoginPage },
  { path: ROUTE_PATH.PRODUCT, page: ProductPage, layout: MainLayout },
  { path: ROUTE_PATH.PRODUCT_DETAIL, page: ProductDetailPage, layout: MainLayout},
  { path: ROUTE_PATH.PROFILE, page: ProfileUser, layout: MainLayout },
  { path: ROUTE_PATH.REGISTER, page: RegisterPage },
  { path: ROUTE_PATH.SERVICE, page: ServicePage, layout: MainLayout },
  { path: ROUTE_PATH.SERVICE_DETAIL_PUBLIC, page: ServiceDetailPage, layout: MainLayout},
  { path: ROUTE_PATH.SHOP, page: ShopPage, layout: MainLayout },
  { path: ROUTE_PATH.VERIFY, page: OTPVerifyPage },
  { path: ROUTE_PATH.ORDER, page: OrderPage, layout: MainLayout },
  { path: ROUTE_PATH.ORDER_SUCCESS, page: OrderSuccessPage, layout: MainLayout },
  { path: ROUTE_PATH.ORDER_PERSONAL, page: OrderPersonalPage, layout: MainLayout },
  { path: ROUTE_PATH.ORDER_SHOP, page: OrderShopPage, layout: MainLayout },
  { path: ROUTE_PATH.VERIFY, page: OTPVerifyPage, layout: MainLayout },
  { path: ROUTE_PATH.PRODUCT_SHOP_MANAGER, page: ProductManagerPage, layout: MainLayout },
  { path: ROUTE_PATH.SERVICE_SHOP_MANAGER, page: ServiceManagerPage, layout: MainLayout },
  { path: ROUTE_PATH.SERVICE_DETAIL, page: ServiceManageDetailPage, layout: MainLayout },
  { path: ROUTE_PATH.PRODUCT_MANAGE_DETAIL, page: ProductManageDetailPage, layout: MainLayout },
  { path: ROUTE_PATH.CREATE_SERVICE, page: CreateServicePage, layout: MainLayout },
  { path: ROUTE_PATH.CREATE_PRODUCT, page: CreateProductPage, layout: MainLayout },

  //service booking
  { path: ROUTE_PATH.BOOKING_SERVICE, page: BookingServicePage, layout: MainLayout },
  { path: ROUTE_PATH.BOOKING_SERVICE_SUCCESS, page: BookingSuccessPage, layout: MainLayout },
  { path: ROUTE_PATH.BOOKING_PERSONAL, page: BookingPersonalPage, layout: MainLayout },
  { path: ROUTE_PATH.BOOKING_SHOP, page: BookingShopPage, layout: MainLayout },

  // shop profile
  { path: ROUTE_PATH.SHOP_PROFILE, page: ShopProfilePage, layout: MainLayout },
  { path: ROUTE_PATH.SHOP_EDIT_PROFILE, page: ShopProfileUpdatePage, layout: MainLayout },
];

export default AppRoute;
