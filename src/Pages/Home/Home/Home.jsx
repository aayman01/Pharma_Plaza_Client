import Category from "../Category/Category";
import Slider from "../Slider/Slider";

const Home = () => {
    return (
      <div>
        <Slider />
        <div className="max-w-6xl mx-auto px-4">
          <Category />
        </div>
      </div>
    );
};

export default Home;