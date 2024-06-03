import { FaTrash } from "react-icons/fa6";
import useCart from "../../Hooks/useCart";

const Cart = () => {
  const { carts } = useCart();
  const totalPrice = carts.reduce(
    (total, item) => total + item.pricePerUnit,
    0
  );

  console.log(totalPrice);
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div>
        <h2 className="text-3xl font-bold text-center my-10">My Cart</h2>
        <p className="text-3xl font-bold">
          Total Selected Item: {carts.length}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
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
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={cart.image}
                          alt="item image"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{cart.name}</div>
                    </div>
                  </div>
                </td>
                <td>{cart.companyName}</td>
                <td>{cart?.pricePerUnit}</td>
                <td><button>Quantity</button></td>
                <td>
                  <button className="text-red-600 p-2 text-xl hover:bg-slate-100 rounded-lg"><FaTrash/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
