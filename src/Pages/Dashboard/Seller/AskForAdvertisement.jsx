import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ClipLoader } from "react-spinners";
import AddAdvertisementModal from "./AddAdvertisementModal";
import useAdvertisement from "../../../Hooks/useAdvertisement";
import { Helmet } from "react-helmet-async";

const AskForAdvertisement = () => {
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useAdvertisement();
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      axiosSecure.get(`/advertisements/${user.email}`).then((res) => {
        // console.log(res.data);
        setData(res.data);
        refetch();
        setLoading(false);
      });
    };
    getData();
  }, [axiosSecure,user.email,refetch]);

  // console.log(data);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#076cec" size={50} />
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>PharmaPlaza | Ask Advertisements</title>
      </Helmet>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center underline">
          Ask For Advertisement
        </h2>
      </div>
      <div className="flex items-center justify-between mt-10">
        <h2 className="text-2xl font-bold">
          Total referred medicine: {data.length}
        </h2>
        <button
          className="btn mr-2 text-white bg-[#076cec] hover:bg-[#0072CE] "
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Add
        </button>
      </div>
      <AddAdvertisementModal />
      <div className="overflow-x-auto border rounded mt-8">
        <table className="table font-medium">
          <thead className="bg-[#076cec] text-white text-lg">
            <tr>
              <th>#</th>
              <th>Product name</th>
              <th>Status</th>
            </tr>
          </thead>
          {data.map((item, idx) => (
            <tbody key={item._id}>
              <tr className="text-base" key={item._id}>
                <td className="font-bold">{idx + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.medicineImage} alt="Product image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.medicineName}</div>
                    </div>
                  </div>
                </td>
                <td className={`inline-flex items-center font-bold`}>
                  <p
                    className={`font-medium rounded-lg ${
                      item?.status === "Approved" &&
                      "bg-emerald-100/60 p-2 text-emerald-500"
                    } ${
                      item?.status === "Hidden" &&
                      "text-yellow-500 p-2 font-bold bg-yellow-100/60"
                    } `}
                  >
                    {item?.status}
                  </p>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AskForAdvertisement;
