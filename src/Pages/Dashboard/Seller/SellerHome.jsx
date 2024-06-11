import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { FaSackDollar } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const SellerHome = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const { data = [] } = useQuery({
      queryKey: ["query-stats"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/seller-stats?email=${user?.email}`);
        console.log(res.data);
        return res.data;
      },
    });
    console.log(data)
  return (
    <div className="flex items-center justify-center">
      <Helmet>
        <title>PharmaPlaza | Seller Home</title>
      </Helmet>
      <div className="text-4xl">
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-center underline">
            Seller Homepage
          </h2>
        </div>
        <div>
          <div className="stats w-full mt-4">
            <div className="stat space-y-3 bg-green-400">
              <div className="stat-figure text-secondary">
                <FaSackDollar className="w-11 h-11" />
              </div>
              <div className="stat-title font-bold text-white">Paid Total</div>
              <div className="stat-value">${data.amountTotals?.Paid}</div>
              {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
            </div>

            <div className="stat space-y-3 bg-red-400">
              <div className="stat-figure text-secondary">
                <MdOutlinePendingActions className="w-11 h-11" />
              </div>
              <div className="stat-title text-white font-bold">
                Pending Total
              </div>
              <div className="stat-value">${data.amountTotals?.pending}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;