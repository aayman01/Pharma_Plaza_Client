import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCategory from "../../../Hooks/useCategory";

const AddCategoryModal = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch} = useCategory();

    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const image = form.image.value;
      const data = {
        categoryName: name,
        categoryImage: image,
      };
      axiosSecure.post("/category", data).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
            refetch();
          e.target.reset();
          toast.success("Successfully Added!");
        }
      });
    };
    return (
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center">
            Add Your Advertisements!
          </h3>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Category Name*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Category Image*</span>
              </label>
              <input
                type="text"
                name="image"
                placeholder="Category Image URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-white">Add</button>
            </div>
          </form>
          <Toaster position="top-right" reverseOrder={false} />
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
};

export default AddCategoryModal;