// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './slider.css';
import useAdvertisement from "../../../Hooks/useAdvertisement";

const Slider = () => {
  const [advertisements ] = useAdvertisement();
  const approvedAdvertisements = advertisements.filter(
    (advertisement) => advertisement.status === "Approved"
  );
  console.log(approvedAdvertisements);
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
        {approvedAdvertisements.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="relative overflow-hidden p-12 text-center h-[500px] bg-[#076cec] ">
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
                <div className="flex flex-col lg:flex-row h-full items-center justify-between p-5 lg:p-20 gap-6">
                  <div className="space-y-4">
                    <h2 className="text-white text-left font-bold text-6xl">
                      {item?.medicineName}
                    </h2>
                    <div className="">
                      <p className="text-white text-left">{item.description}</p>
                    </div>
                    <button className="bg-green-500 p-3 flex text-white font-medium rounded-lg hover:bg-green-400">
                      Shop Now
                    </button>
                  </div>
                  <div className="hidden lg:block">
                    <img
                      className="w-80 rounded-2xl"
                      src={item?.medicineImage}
                      alt=""
                    />
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
