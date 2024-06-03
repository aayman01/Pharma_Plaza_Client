import { FaEye } from "react-icons/fa6";
import useProduct from "../../Hooks/useProduct";
import SelectButton from "../Shared/SelectButton/SelectButton";
import ShowModal from "../Shared/ShowModal/ShowModal";
import { useState } from "react";

const Shop = () => {
    const {products} = useProduct();
    
    const [modalData, setModalData] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = (item) => {
      setModalData(item);
      setModalOpen(true);
    };

    const handleCloseModal = () => {
      setModalData({});
      setModalOpen(false);
    };
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mt-8">
          <h2 className="text-4xl font-bold mb-2">All Products</h2>
          <p className="text-gray-500 text-sm mb-12">
            Find All Your Product You Need
          </p>
        </div>
        <div className="flex items-center justify-center gap-7 px-10 pb-10">
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button className="btn text-white bg-[#076cec] hover:bg-[#0072CE]">
              Search
            </button>
          </div>
          <div>
            <select defaultValue="" className="select select-bordered w-full">
              <option disabled value="">
                Sort by
              </option>
              <option value="Price low to high">Price: low to high</option>
              <option value="Price high to low">Price: high to low</option>
            </select>
          </div>
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
              {products.map((product, idx) => (
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
                    <SelectButton />
                  </td>
                  <td>
                    <td>
                      <button onClick={() => handleOpenModal(product)}>
                        <FaEye className="text-xl text-[#076cec]" />
                      </button>
                      <ShowModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        data={modalData}
                      />
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Shop;