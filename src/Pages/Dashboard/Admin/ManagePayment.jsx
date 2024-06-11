import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";

const ManagePayment = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const { refetch, data: payments = [], isLoading } = useQuery({
      queryKey: ["payments"],
      queryFn: async () => {
        const res = await axiosSecure.get("/payment");
        return res.data;
      },
    });
    const handlePayment = (id) => {
        axiosSecure
          .patch(`/payment/admin/${id}`, { status: "Paid" })
          .then((res) => {
            if(res.data.modifiedCount > 0){
                refetch();
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
      <div>
        <Helmet>
          <title>PharmaPlaza | Manage Payment</title>
        </Helmet>
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-center underline">
            Payment Management
          </h2>
        </div>
        <div className="overflow-x-auto border rounded mt-16">
          <table className="table font-medium">
            <thead className="bg-[#076cec] text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Transaction Id</th>
                <th>Date</th>
                <th>Status</th>
                <td>Action</td>
              </tr>
            </thead>
            {payments.map((item, idx) => (
              <tbody key={item._id}>
                <tr>
                  <th>{idx + 1}</th>
                  <td>{user.displayName}</td>
                  <td>{item.transactionId}</td>
                  <td>{item.date}</td>
                  <td
                    className={`inline-flex items-center justify-center font-bold`}
                  >
                    <p
                      className={`font-medium rounded-lg ${
                        item?.status === "Paid" &&
                        "bg-emerald-100/60 p-2 text-emerald-500"
                      } ${
                        item?.status === "pending" &&
                        "text-yellow-500 p-2 font-bold bg-yellow-100/60"
                      }  `}
                    >
                      {item.status}
                    </p>
                  </td>
                  <td>
                    <button
                      onClick={() => handlePayment(item._id)}
                      className="text-white btn btn-success"
                    >
                      Accept Payment
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    );
};

export default ManagePayment;