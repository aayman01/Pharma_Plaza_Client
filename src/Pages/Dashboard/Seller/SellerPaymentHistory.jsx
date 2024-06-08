import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SellerPaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const getData = () => {
        setLoading(true);
        axiosSecure.get("/payment").then((res) => {
          // console.log(res.data);
          setData(res.data);
          setLoading(false);
        });
      };
      getData();
    }, [axiosSecure]);

    console.log(data)
    return (
      <div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-center underline">
            Payment History
          </h2>
        </div>
        <div>
            
        </div>
      </div>
    );
};

export default SellerPaymentHistory;