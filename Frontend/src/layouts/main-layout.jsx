import React from "react";
import Header from "../components/Header";
import { ROUTE_PATH } from "../constants/routePath";
import BannerSlider from "../components/BannerSlider";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button"; // Thêm dòng này

const routeBanner = [ROUTE_PATH.PRODUCT, ROUTE_PATH.SERVICE, ROUTE_PATH.SHOP];

function ScrollToTopButton() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <Button
        onClick={scrollToTop}
        variant="default"
        size="icon"
        round="full"
        className="fixed bottom-8 right-8 z-50 bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition"
        aria-label="Lên đầu trang"
      >
        <span className="text-2xl">↑</span>
      </Button>
    )
  );
}

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="mx-auto p-4">
        {routeBanner.includes(window.location.pathname) && <BannerSlider />}
        {children}
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default MainLayout;
