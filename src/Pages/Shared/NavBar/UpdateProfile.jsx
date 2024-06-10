import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import NavBar from "./NavBar";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
    //   console.log(data);
    const imageFile = { image: data.userImg[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(res.data.success){
        const image = res?.data?.data?.display_url;
        
        updateUserProfile(data.name, image)
        .then(() => {
            const updateData = {
              name: data?.name,
              role: data.role,
            };
            axiosPublic.put(`/users/${user.email}`,updateData)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Updated your profile`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
      
    };
    return (
      <div>
        <NavBar />
        <div className="max-w-6xl mx-auto px-4">
          <div>
            <h2 className="text-3xl font-bold text-center my-10 underline">
              Update Profile
            </h2>
          </div>
          <div className="flex items-center justify-center mb-10">
            <img
              className="w-56 h-56 rounded-full"
              src={user?.photoURL}
              alt=""
            />
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                  defaultValue={user.displayName}
                  {...register("name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Your image</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered"
                  {...register("userImg", { required: true })}
                />
                {errors && (
                  <span className="text-red-500 mt-2">Image is required</span>
                )}
              </div>
              <div>
                <label className="form-control w-full mb-4">
                  <div className="label">
                    <span className="label-text font-medium">Role</span>
                  </div>
                  <select
                    defaultValue=""
                    {...register("role")}
                    className="select select-bordered w-full"
                  >
                    <option disabled value="">
                      Select a role
                    </option>
                    <option value="User">User</option>
                    <option value="Seller">Seller</option>
                  </select>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Update User"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default UpdateProfile;