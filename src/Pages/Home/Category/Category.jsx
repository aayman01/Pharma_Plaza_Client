import useProduct from "../../../Hooks/useProduct";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import CategoryCard from "./CategoryCard";
import img1 from '../../../assets/Prescription.png'; 
import img2 from '../../../assets/vitamins.png'; 
import img3 from '../../../assets/toiletries.png'; 
import img4 from '../../../assets/first-aid-kit.png'; 
import img5 from '../../../assets/herbal.png'; 
import img6 from '../../../assets/baby-boy.png'; 
import img7 from '../../../assets/blood-pressure.png'; 

const Category = () => {
  const { products } = useProduct();
  const prescriptions = products.filter(
    (item) => item.categoryName === "Prescription Medications"
  );
  const vitamins = products.filter(
    (item) => item.categoryName === "Vitamins & Supplements"
  );
  const personCare = products.filter(
    (item) => item.categoryName === "Personal Care"
  );
  const firstAid = products.filter(
    (item) => item.categoryName === "First Aid"
  );
  const herbalProducts = products.filter(
    (item) => item.categoryName === "Herbal Products"
  );
  const babyCare = products.filter(
    (item) => item.categoryName === "Baby & Child Care"
  );
  const medicalDevice = products.filter(
    (item) => item.categoryName === "Medical Devices"
  );
  
  return (
    <div>
      <SectionTitle
        heading="Our Popular Categories"
        subHeading="Find the best quality products here"
      ></SectionTitle>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-2">
        <CategoryCard
          categoryImage={img1}
          categoryName="Prescription Medications"
          number={prescriptions?.length}
        ></CategoryCard>
        <CategoryCard
          categoryImage={img2}
          categoryName="Vitamins & Supplements"
          number={vitamins?.length}
        ></CategoryCard>
        <CategoryCard
          categoryImage={img3}
          categoryName="Personal Care"
          number={personCare?.length}
        ></CategoryCard>
        <CategoryCard
          categoryImage={img4}
          categoryName="First Aid"
          number={firstAid?.length}
        ></CategoryCard>
        <CategoryCard
          categoryImage={img5}
          categoryName="Herbal Products"
          number={herbalProducts?.length}
        ></CategoryCard>
        <CategoryCard
          categoryImage={img6}
          categoryName="Baby & Child Care"
          number={babyCare?.length}
        ></CategoryCard>
        <CategoryCard
          categoryImage={img7}
          categoryName="Medical Devices"
          number={medicalDevice?.length}
        ></CategoryCard>
      </div>
    </div>
  );
};

export default Category;
