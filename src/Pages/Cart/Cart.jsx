import { FaTrash } from "react-icons/fa6";
import useCart from "../../Hooks/useCart";
import { ClipLoader } from "react-spinners";
import NavBar from "../Shared/NavBar/NavBar";
import Footer from "../Shared/Footer/Footer";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import QuantityButton from "../Shared/Quantity Button/QuantityButton";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";


const Cart = () => {
  const { carts, isLoading, refetch } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  
 
  useEffect(() => {   
    setCartItems(
      carts.map((product) => ({
        ...product,
        totalPrice: product.pricePerUnit,
      }))
    );   
  }, [carts]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity : newQuantity,
              totalPrice : item.pricePerUnit * newQuantity,
            }
          : item
      )
    );
  };

  const handleSingleDelete = (id) => {
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  }

  const handleAllDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${user.email}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Successfully Deleted All Your Cart",
              icon: "success",
            });
          }
        });
      }
    });
  }

  const handleUpdate = (id,quantity,price) => {

    const cartData = {
      quantity : quantity,
      price : price
    }
    axiosSecure
      .put(`/update-cart/${id}`, cartData)
      .then(() => {
        // if (res.data.modifiedCount){
           
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#076cec" size={50} />
      </div>
    );
  }
 
  return (
    <>
      <NavBar />
      {cartItems.length === 0 ? (
        <div className="h-screen-minus-20px flex items-center justify-center">
          <h2 className="text-3xl font-bold">
            You have not added anything in your cart
          </h2>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4">
          <div>
            <h2 className="text-3xl font-bold text-center my-10 underline">
              My Carts
            </h2>
          </div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-3xl font-bold">
              Total Selected Item: {carts.length}
            </p>
            <button
              onClick={handleAllDelete}
              className="btn text-white bg-red-600 hover:bg-red-800"
            >
              <FaTrash /> Clear All Cart
            </button>
          </div>
          <div className="overflow-x-auto border rounded-lg mb-5">
            <table className="table mt-5">
              <thead>
                <tr className="text-xl">
                  <th>#</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Price Per Unit</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, idx) => (
                  <tr key={cart._id}>
                    <td className="font-bold">{idx + 1}</td>
                    <td>
                      <div className="flex items-center">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={cart.image} alt="item image" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{cart.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{cart.companyName}</td>
                    <td className="font-medium text-left">
                      {cart?.pricePerUnit}
                    </td>
                    <td>
                      <QuantityButton
                        quantity={cart.quantity}
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChange(cart._id, newQuantity)
                        }
                      ></QuantityButton>
                    </td>
                    <td className="font-medium">{cart.totalPrice}</td>
                    <td className="font-medium">
                      <button
                        className="btn bg-green-400 hover:bg-green-500 text-white"
                        onClick={() =>
                          handleUpdate(
                            cart.productId,
                            cart.quantity,
                            cart.pricePerUnit
                          )
                        }
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleSingleDelete(cart._id)}
                        className="text-red-600 p-2 text-xl hover:bg-slate-100 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end mr-2 mb-10">
            <Link to='/payment'>
              <button className="btn text-white bg-[#076cec] hover:bg-[#0072CE] font-bold text-lg">
                <FaShoppingCart /> checkout
              </button>
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
