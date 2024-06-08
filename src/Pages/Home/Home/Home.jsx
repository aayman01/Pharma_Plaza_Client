import Footer from "../../Shared/Footer/Footer";
import NavBar from "../../Shared/NavBar/NavBar";
import Blog from "../Blog/Blog";
import Category from "../Category/Category";
import Discount from "../Discount/Discount";
import Slider from "../Slider/Slider";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
      <div>
        <NavBar/>
        <Slider />
        <div className="max-w-6xl mx-auto px-4">
          <Category />
          <Discount/>
          <Blog/>
          <Testimonial/>
        </div>
        <Footer/>
      </div>
    );
};

export default Home;