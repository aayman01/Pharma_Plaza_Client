// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

import useAllProducts from "../../../Hooks/useAllProducts";

const Discount = () => {
  const {products} = useAllProducts();
  
  const discountProduct = products.filter((product) => product.discountPercentage > 0);
  console.log(discountProduct);
  return (
    <div>
      <SectionTitle heading="Discount Products"></SectionTitle>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {discountProduct.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="card h-[350px] bg-base-100 border">
              <figure className="relative">
                <img
                  className="w-[230px]"
                  src={item.image}
                  alt="product image"
                />
              </figure>
              <div className="card-body p-3">
                <h2 className="text-xl font-bold text-center">{item.name}</h2>
                <div className="absolute top-6 right-2 rotate-[35deg]">
                  <p className="font-bold bg-[#076cec] p-2 text-white">
                    {item.discountPercentage}% OFF
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Discount;
