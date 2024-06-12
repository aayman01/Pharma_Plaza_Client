import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import ShowModal from "../ShowModal/ShowModal";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";



const Table = ({ product, idx }) => {
    const {
      _id,
      name,
      image,
      companyName,
      pricePerUnit,
      quantity,
      sellerEmail,
    } = product;
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const [modalData, setModalData] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (item) => {
    setModalData(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddCart = () => {
    if(user && user.email){
        const cartItem = {
          productId: _id,
          email: user?.email,
          name,
          image,
          companyName,
          pricePerUnit,
          quantity,
          sellerEmail,
        }; 
        axiosSecure.post("/carts",cartItem)
        .then(res => {
            // console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `${name} added your cart`,
                  showConfirmButton: false,
                  timer: 1500,
                });
            }
        })
    }
    else{
        // if not logged in redirect to log in page
        Swal.fire({
          title: "You are not logged in",
          text: "Please login to add to the cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Login",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login", { state: { from: location } });
          }
        });
    }
  };
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