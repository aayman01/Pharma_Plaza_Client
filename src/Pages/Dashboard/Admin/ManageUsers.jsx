import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false)
    const { refetch, data: users = [],isLoading } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/user");
        return res.data;
      },
    });
    const options = [
      { role : "Admin" },
      { role : "Seller" },
      { role : "User" },
    ];
    const handleChange = (role,id) => {
      // console.log(role,id)
        axiosSecure
          .patch(`/users/admin/${id}`, { role })
          .then(res => {
            setLoading(true)
            if (res.data.modifiedCount > 0) {
              refetch();
              setLoading(false)
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
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-center underline">
            Manage Users
          </h2>
        </div>
        <div className="overflow-x-auto border rounded mt-3">
          <table className="table font-medium">
            <thead className="bg-[#076cec] text-white">
              <tr className="text-base">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Update Role</th>
              </tr>
            </thead>
            {users.map((item, idx) => (
              <tbody key={item._id}>
                <tr>
                  <th>{idx + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {loading ? (
                      <ClipLoader color="#076cec" size={18} />
                    ) : (
                      item.role
                    )}
                  </td>
                  <td>
                    <select
                      defaultValue={item.role}
                      name="updateRole"
                      onChange={(e) => {
                        handleChange(e.target.value, item._id);
                      }}
                    >
                      {options.map((opt, idx) => (
                        <option key={idx}>{opt.role}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    );
};

export default ManageUsers;