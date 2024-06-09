import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const AddAdvertisementModal = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const description = form.description.value;
        const data = {
          medicineName: name,
          medicineImage: image,
          description: description,
          sellerEmail: user?.email,
          status : 'hidden',
        };
        axiosSecure.post('/advertisement',data)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
                e.target.reset();
                toast.success("Successfully Added!");
            
            }
        })
        
    }
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-xl text-center">
          Add Your Advertisements!
        </h3>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Product Name*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Product Image*</span>
            </label>
            <input
              type="text"
              name="image"
              placeholder="Product Image URL"
              className="input input-bordered"
              required
            />
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

export default AddAdvertisementModal;
