import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Pagination } from "swiper/modules";
import './testimonial.css'

const Testimonial = () => {
    const [reviews, setReview] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/reviews")
        .then((res) => {
          setReview(res.data);
        });
    },[])
    console.log(reviews)
    return (
      <section className="my-20">
        <SectionTitle
          heading={"Testimonial"}
          subHeading={"What Our Client Say"}
        ></SectionTitle>
        <Swiper
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id} review={review}>
              <section className="pb-6">
                <div className="container max-w-xl mx-auto">
                  <div className="flex flex-col items-center w-full p-6 space-y-8 rounded-md lg:h-full lg:p-8 bg-[#dbf4fc] mb-7">
                    <img
                      src={review?.image}
                      alt=""
                      className="w-28 h-28 rounded-full"
                    />
                    <div className="text-center">
                      <p className="text-xl font-bold">{review?.name}</p>
                      <p className="font-normal">{review?.description}</p>
                    </div>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
};

export default Testimonial;