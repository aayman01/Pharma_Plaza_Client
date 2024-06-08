import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { ClipLoader } from "react-spinners";

const UserPayment = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const getData = () => {
        setLoading(true);
        axiosSecure.get(`/payment/${user.email}`).then((res) => {
          // console.log(res.data);
          setData(res.data);
          setLoading(false);
        });
      };
      getData();
    }, [axiosSecure,user.email]);
    // console.log(data)
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <ClipLoader color="#076cec" size={50} />
        </div>
      );
    }
    return (
      <div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-center underline">
            Payment History
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
              </tr>
            </thead>
            {data.map((item, idx) => (
              <tbody key={item._id}>
                <tr>
                  <th>{idx + 1}</th>
                  <td>{user.displayName}</td>
                  <td>{item.transactionId}</td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>  
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    );
};

export default UserPayment;