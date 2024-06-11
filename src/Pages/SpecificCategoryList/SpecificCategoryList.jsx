import { useLoaderData } from "react-router-dom";
import Table from "../Shared/Table/Table";
import { Helmet } from "react-helmet-async";

const SpecificCategoryList = () => {
    const items = useLoaderData();
    
    return (
      <div className="max-w-6xl mx-auto px-4">
        <Helmet>
          <title>PharmaPlaza | Category</title>
        </Helmet>
        <div className="text-center mt-8">
          <h2 className="text-4xl font-bold mb-10">{items[0].categoryName}</h2>
        </div>
        <div className="overflow-x-auto mb-20 border rounded-lg">
          <table className="table">
            <thead>
              <tr className="text-lg text-[#076cec]">
                <th>#</th>
                <th>Product Name</th>
                <th>Company Name</th>
                <th>Price Per Unit</th>
                <th>Add to Cart</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product, idx) => (
                <Table key={idx} product={product} idx={idx}></Table>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default SpecificCategoryList;