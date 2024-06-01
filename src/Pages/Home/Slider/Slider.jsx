// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import useCategory from "../../../Hooks/useCategory";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './slider.css'
const Slider = () => {
  const { categories } = useCategory();
  return (
    <div className="mb-10">
      <Swiper
        cssMode={true}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="relative overflow-hidden p-12 text-center h-[400px] bg-[#076cec]">
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
                <div className="flex h-full items-center justify-evenly">
                  <div>
                    <h2 className="text-white font-bold text-6xl">
                      {category.categoryName}
                    </h2>
                  </div>
                  <div>
                    <img className="w-52" src={category.categoryImage} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
