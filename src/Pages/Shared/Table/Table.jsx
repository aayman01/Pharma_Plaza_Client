import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import ShowModal from "../ShowModal/ShowModal";


const Table = ({ product, idx }) => {

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

  const handleAddCart = () => {};
  return (
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
      <td className="font-bold">${product?.pricePerUnit}</td>
      <td>
        <button
          onClick={handleAddCart}
          className="btn text-white bg-[#076cec] hover:bg-[#0072CE] "
        >
          Select
        </button>
      </td>
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
    </tr>
  );
};

export default Table;