import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const banners = [
  {
    image:
      "https://th.bing.com/th/id/R.75074a3e66b15a8ccef022b33264ee6d?rik=NPE9hqgm3bZ%2f%2bA&pid=ImgRaw&r=0",
  },
  {
    image:
      "https://static.vecteezy.com/system/resources/previews/002/478/302/original/sale-electronics-banner-background-free-vector.jpg",
  },
  {
    image:
      "https://th.bing.com/th/id/R.31062d34fc5ee17cb360522c71d4875b?rik=Saxy%2fELAZDoNIA&pid=ImgRaw&r=0",
  },
  {
    image:
      "https://th.bing.com/th/id/R.86a2d25f04c123ee8b0e3d2f82d889cb?rik=mFXJ%2bapGyJV%2bIg&pid=ImgRaw&r=0",
  },
];

// Custom Next Arrow
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-4xl cursor-pointer z-10"
      onClick={onClick}
    >
      <FiChevronRight />
    </div>
  );
};

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-4xl cursor-pointer z-10"
      onClick={onClick}
    >
      <FiChevronLeft />
    </div>
  );
};

const Header = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <header className="w-full overflow-hidden relative">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="w-full relative">
            <div className="relative w-full h-[75vh]">
              <img
                src={banner.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover position-center"
              />
            </div>
          </div>
        ))}
      </Slider>
    </header>
  );
};

export default Header;
