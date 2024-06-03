import { useLoaderData } from "react-router-dom";
// import { FaEye } from "react-icons/fa6";
// import ShowModal from "../Shared/ShowModal/ShowModal";
// import { useState } from "react";
import Table from "../Shared/Table/Table";

const SpecificCategoryList = () => {
    const items = useLoaderData();
    // const [modalData, setModalData] = useState({});
    // const [isModalOpen, setModalOpen] = useState(false);

    // const handleOpenModal = (item) => {
    //   setModalData(item);
    //   setModalOpen(true);
    // }

    // const handleCloseModal = () => {
    //   setModalData({});
    //   setModalOpen(false)
    // }

    // const handleAddCart = () => {

    // }


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
                <th>Price Per Unit</th>
                <th>Add to Cart</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product, idx) => <Table key={idx} product={product} idx={idx}></Table> )}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default SpecificCategoryList;