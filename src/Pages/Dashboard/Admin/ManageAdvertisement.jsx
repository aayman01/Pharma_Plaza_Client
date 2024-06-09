import { ClipLoader } from "react-spinners";
import useAdvertisement from "../../../Hooks/useAdvertisement";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageAdvertisement = () => {
  const [advertisements, refetch, isLoading] = useAdvertisement();
    const axiosSecure = useAxiosSecure();

  const handleToggle = async (status, id) => {
    console.log(status, id)
     let newStatus;
     if (status === "approved") {
       newStatus = "hidden";
     } else if (status === "hidden") {
       newStatus = "approved";
     }
    await axiosSecure.patch(`/advertisement/${id}`, { status: newStatus });
            refetch(); 
  };

  if (isLoading) {
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
          Manage Advertisements
        </h2>
      </div>
      <div className="overflow-x-auto border rounded mt-8">
        <table className="table font-medium">
          <thead className="bg-[#076cec] text-white text-lg">
            <tr>
              <th>#</th>
              <th>Product name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Add</th>
              <th>Remove</th>
            </tr>
          </thead>
          {advertisements.map((item, idx) => (
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
                <td>{item.description}</td>
                <td className={`inline-flex items-center justify-center font-bold`}>
                  <p
                    className={`font-medium rounded-lg ${
                      item?.status === "Approved" &&
                      "bg-emerald-100/60 p-2 text-emerald-500"
                    } ${
                      item?.status === "Hidden" &&
                      "text-yellow-500 p-2 font-bold bg-yellow-100/60"
                    }  `}
                  >
                    {item?.status}
                  </p>
                </td>
                <td>
                  <input
                    checked={item.status === "Approved"}
                    onChange={() => handleToggle(item.status, item._id)}
                    type="checkbox"
                    className="toggle"
                  />
                </td>
                <td></td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ManageAdvertisement;
