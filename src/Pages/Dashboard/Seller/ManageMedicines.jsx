import { Helmet } from "react-helmet-async";
import useAllProducts from "../../../Hooks/useAllProducts";
import useAuth from "../../../Hooks/useAuth";
import AddProductModal from "./AddProductModal";

const ManageMedicines = () => {
    const { products } = useAllProducts();
    const {user} = useAuth();
    const seller = products.filter(product => product.sellerEmail === `${user.email}`);
    // console.log(seller)
    return (
      <div>
        <Helmet>
          <title>PharmaPlaza | Manage Medicines</title>
        </Helmet>
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-center underline">
            Manage Medicine
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Total items: {seller.length}</h2>
          <button
            onClick={() => document.getElementById("my_modal_2").showModal()}
            className="btn mr-2 text-white bg-[#076cec] hover:bg-[#0072CE] "
          >
            Add
          </button>
        </div>
        <AddProductModal />
        {seller.length === 0 ? (
          <div className="h-screen-minus-20px flex items-center justify-center">
            <h2 className="text-3xl font-bold">
              You have not added anything yet
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded mt-3">
            <table className="table font-medium">
              <thead className="bg-[#076cec] text-white text-base">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Company Name</th>
                  <th>Category Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              {seller.map((item, idx) => (
                <tbody key={item._id}>
                  <tr>
                    <th>{idx + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.companyName}</td>
                    <td>{item.categoryName}</td>
                    <td>{item.pricePerUnit}$</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        )}
      </div>
    );
};

export default ManageMedicines;