import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UpdateCategoryForm = ({ data, refetch }) => {
//   console.log("in fom", data);
  const axiosSecure = useAxiosSecure();
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;

    const status = {
      categoryName: name,
      categoryImage: image,
    };
    const res = await axiosSecure.patch(`/category/${data._id}`, status);
    if (res.data.modifiedCount > 0) {
      refetch();
      toast.success("Successfully Updated!");
    }
  };
  return (
    <form onSubmit={handleUpdate} className="">
      <div className="form-control mt-4">
        <label className="label">
          <span className="label-text font-medium">Category Name*</span>
        </label>
        <input
          type="text"
          defaultValue={data.categoryName}
          name="name"
          placeholder="Product Name"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">Category Image*</span>
        </label>
        <input
          type="text"
          defaultValue={data.categoryImage}
          name="image"
          placeholder="Product Image URL"
          className="input input-bordered"
          required
        />
      </div>
      <input
        className="btn w-full btn-success text-white"
        type="submit"
        value="Update"
      />
    </form>
  );
};

export default UpdateCategoryForm;