import Category from "../Category/Category";
import Discount from "../Discount/Discount";
import Slider from "../Slider/Slider";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
      <div>
        <Slider />
        <div className="max-w-6xl mx-auto px-4">
          <Category />
          <Discount/>
          <Testimonial/>
        </div>
      </div>
    );
};

export default Home;