import { FaTrash } from "react-icons/fa6";
import useCart from "../../Hooks/useCart";
import { ClipLoader } from "react-spinners";
import NavBar from "../Shared/NavBar/NavBar";
import Footer from "../Shared/Footer/Footer";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Cart = () => {
  const { carts, isLoading, refetch } = useCart();
  const axiosSecure = useAxiosSecure();
  const totalPrice = carts.reduce(
    (total, item) => total + item.pricePerUnit,
    0
  );
  // console.log(totalPrice);
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
      <div className="max-w-6xl mx-auto px-4">
        <div>
          <h2 className="text-3xl font-bold text-center my-10">My Carts</h2>
          <p className="text-3xl font-bold mb-5">
            Total Selected Item: {carts.length}
          </p>
        </div>
        <div className="overflow-x-auto border rounded-lg mb-10">
          <table className="table mt-5">
            <thead>
              <tr className="text-xl">
                <th>#</th>
                <th>Name</th>
                <th>Company</th>
                <th>Price Per Unit</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart, idx) => (
                <tr key={cart._id}>
                  <td className="font-bold">{idx + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
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
                    <button>Quantity</button>
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
      </div>
      <Footer />
    </>
  );
};

export default Cart;
