import useCategory from "../../../Hooks/useCategory";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import CategoryCard from "./CategoryCard";

const Category = () => {
    const {categories} = useCategory();
  return (
    <div>
      <SectionTitle
        heading="Our Products"
        subHeading="Find the best quality products here"
      ></SectionTitle>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-6 mb-2">
        {
            categories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
        }
      </div>
    </div>
  );
};

export default Category;
