import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import log from '../../assets/log.png';
import { useForm } from "react-hook-form";

const Register = () => {
     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm();

     const onSubmit = (data) => console.log(data);
    return (
      <div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
              <div className="text-center lg:text-left">
                <div>
                  <img src={log} alt="" />
                </div>
              </div>
              <div className="card shrink-0 w-full max-w-sm shadow-2xl">
                <h2 className="text-3xl p-4 text-center font-bold mt-6">
                  Sign up your account
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">User Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="email"
                      className="input input-bordered"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-red-500 mt-2">
                        Name is required
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      className="input input-bordered"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-500 mt-2">
                        Email is required
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Your image
                        </span>
                      </label>
                      <input
                        type="file"
                        className="file-input file-input-bordered"
                        {...register("userImg", { required: true })}
                      />
                      {errors.userImg && (
                        <span className="text-red-500 mt-2">
                          Image is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="form-control w-full mb-4">
                      <div className="label">
                        <span className="label-text font-medium">Role</span>
                      </div>
                      <select
                        defaultValue=""
                        {...register("role", { required: true })}
                        className="select select-bordered w-full"
                      >
                        <option disabled value="">
                          Select a role
                        </option>
                        <option value="User">User</option>
                        <option value="Seller">Seller</option>
                      </select>
                      {errors.role && (
                        <span className="text-red-500 mt-2">
                          Role is required
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="password"
                      className="input input-bordered"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-red-500 mt-2">
                        Password is required
                      </span>
                    )}
                  </div>
                  <div className="form-control mt-6">
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Sign Up"
                    />
                  </div>
                </form>
                <p className="text-center text-black mb-4 font-medium">
                  -Or login with-
                </p>
                <div className="flex text-2xl items-center gap-3 justify-center">
                  <button>
                    <FcGoogle />
                  </button>
                  <button>
                    <FaGithub />
                  </button>
                </div>
                <p className="text-center text-black mt-4 pb-10 font-medium">
                  Already have an account?
                  <Link
                    className="text-red-600 font-medium underline decoration-red-600"
                    to="/login"
                  >
                    {" "}
                    Login
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Register;