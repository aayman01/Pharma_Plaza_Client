import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
    const {categoryName, categoryImage} = category;
  return (
    <Link to={`/category/${categoryName}`}>
      <div className="card card-compact bg-base-100 shadow-xl border h-[234px]">
        <figure className="mt-4">
          <img className="w-32 h-28" src={categoryImage} alt={categoryName} />
        </figure>
        <div className="card-body">
          <h2 className="text-base lg:text-2xl font-bold text-center">{categoryName}()</h2>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;