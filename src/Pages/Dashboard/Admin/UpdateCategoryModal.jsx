import { Toaster } from "react-hot-toast";
import UpdateCategoryForm from "./UpdateCategoryForm";

const UpdateCategoryModal = ({ data, refetch }) => {
//   console.log("in modal", data);
  
  return (
    <>
      <div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-center">Update Category</h3>
            <UpdateCategoryForm refetch={refetch} data={data} />
            <Toaster position="top-right" reverseOrder={false} />
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default UpdateCategoryModal;