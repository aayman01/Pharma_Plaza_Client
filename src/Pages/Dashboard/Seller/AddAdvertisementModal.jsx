import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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
          status : 'Pending',
        };
        axiosSecure.post('/advertisement',data)
        .then(res => {
            console.log(res.data)
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
              <span className="label-text font-medium">Medicine Name*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Medicine Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Medicine Image*</span>
            </label>
            <input
              type="text"
              name="image"
              placeholder="Medicine Image URL"
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
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddAdvertisementModal;
