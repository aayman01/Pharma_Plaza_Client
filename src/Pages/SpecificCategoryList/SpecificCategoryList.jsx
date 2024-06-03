import { FaEye } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";

const SpecificCategoryList = () => {
    const items = useLoaderData();
    console.log(items)
    return (
      <div className="max-w-6xl mx-auto px-4">
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
                <th>Category Name</th>
                <th>Price Per Unit</th>
                <th>Add to Cart</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product, idx) => (
                <tr className="text-base" key={product._id}>
                  <td className="font-bold">{idx + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={product?.image} alt="Product image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{product?.companyName}</td>
                  <td className="font-medium">{product?.categoryName}</td>
                  <td className="font-bold">${product?.pricePerUnit}</td>
                  <td>
                    <button className="btn text-white bg-[#076cec] hover:bg-[#0072CE] ">
                      Select
                    </button>
                  </td>
                  <td>
                    <button>
                      <FaEye className="text-xl text-[#076cec]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default SpecificCategoryList;