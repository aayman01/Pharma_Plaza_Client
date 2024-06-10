import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAllProducts from "../../../Hooks/useAllProducts";
import useAuth from "../../../Hooks/useAuth";

const AddProductModal = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {refetch} = useAllProducts();
   const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const image = form.image.value;
      const description = form.description.value;
      const price = form.price.value;
      const discount = form.discount.value; 
      const companyName = form.companyName.value;
      const categoryName = form.categoryName.value;

      const data = {
        name,
        image,
        description,
        pricePerUnit: price,
        companyName,
        categoryName,
        quantity: 1,
        sellerEmail: user?.email,
        discountPercentage: discount,
      };
      console.log(data)
     const res = await axiosSecure.post("/product", data)
      if (res.data.insertedId) {
        refetch();
        e.target.reset();
        toast.success("Successfully Added!");
      }
    };
    return (
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center">
            Add Medicine!
          </h3>
          <form onSubmit={handleSubmit} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Item Name*</span>
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

            <div className="md:flex items-center gap-4">
              <label className="form-control md:w-1/2">
                <div className="label">
                  <span className="label-text font-bold">Price:</span>
                </div>
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="form-control md:w-1/2">
                <div className="label">
                  <span className="label-text font-bold">
                    Discount Percentage:
                  </span>
                </div>
                <input
                  defaultValue={0}
                  type="text"
                  name="discount"
                  placeholder="Discount Percentage"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="md:flex items-center gap-4">
              <label className="form-control md:w-1/2">
                <div className="label">
                  <span className="label-text font-bold">Company name:</span>
                </div>
                <input
                  defaultValue={0}
                  type="text"
                  name="companyName"
                  placeholder="Company name"
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control md:w-1/2">
                <div className="label">
                  <span className="label-text font-bold">Category:</span>
                </div>
                <select
                  defaultValue=""
                  className="px-4 py-3 rounded-md border w-full"
                  name="categoryName"
                  required
                >
                  <option disabled value="">
                    Select a Category
                  </option>
                  <option value="Prescription Medications">
                    Prescription Medications
                  </option>
                  <option value="Vitamins & Supplements">
                    Vitamins & Supplements
                  </option>
                  <option value="First Aid">First Aid</option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Medical Devices">Medical Devices</option>
                  <option value="Baby & Child Care">Baby & Child Care</option>
                </select>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description*</span>
              </label>
              <textarea
                placeholder="Description"
                name="description"
                className="textarea textarea-bordered text-base  textarea-md w-full"
                required
              ></textarea>
            </div>
            <input
              className="btn mt-4 w-full btn-primary text-white"
              type="submit"
              value="Add"
            />
          </form>
          <Toaster position="top-right" reverseOrder={false} />
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
};


export default AddProductModal;