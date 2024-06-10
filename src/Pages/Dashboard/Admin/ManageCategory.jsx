import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { useEffect, useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import useCategory from "../../../Hooks/useCategory";
import { ClipLoader } from "react-spinners";

const ManageCategory = () => {
  const [modalData, setModalData] = useState({});
  const axiosSecure = useAxiosSecure();
  const { refetch, categories, isLoading } = useCategory();

  
  useEffect(()=>{
    refetch();
  },[refetch])

  const handleOpenModal = (item) => {
    setModalData(item);
    document.getElementById("my_modal_2").showModal();
  };


  const handleDelete = (id) => {
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
        axiosSecure.delete(`/category/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Successfully deleted",
              icon: "success",
            });
          }
        });
      }
    });
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
          Manage Category
        </h2>
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="btn text-white bg-[#076cec] hover:bg-[#0072CE] "
        >
          Add Category
        </button>
      </div>
      <AddCategoryModal />
      <div className="overflow-x-auto border rounded mt-3">
        <table className="table font-medium">
          <thead className="bg-[#076cec] text-white">
            <tr className="text-base">
              <th>#</th>
              <th>Category Name</th>
              <th>Category Image</th>
              <th className="text-center"></th>
              <th className="text-center"></th>
            </tr>
          </thead>
          {categories.map((item, idx) => (
            <tbody key={item._id}>
              <tr>
                <th>{idx + 1}</th>
                <td>{item.categoryName}</td>
                <td>
                  <img className="w-12 h-12" src={item.categoryImage} alt="" />
                </td>
                <td>
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="btn btn-success text-white"
                  >
                    Update
                  </button>
                  <UpdateCategoryModal refetch={refetch} data={modalData} />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-error text-white"
                  >
                    Delete
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

export default ManageCategory;
