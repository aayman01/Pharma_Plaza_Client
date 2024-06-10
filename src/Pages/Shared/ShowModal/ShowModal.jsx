import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ShowModal = ({ isOpen, onClose, data }) => {

  // console.log("in modal shop",data)

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left align-middle border shadow-sm transition-all">
                  <div className="flex items-center justify-center">
                    <img className="w-52" src={data?.image} alt="" />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg mt-4 text-center font-bold leading-6 text-gray-900"
                  >
                    {data?.name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-base text-gray-500">
                      <span className="font-bold">Description</span> :{" "}
                      {data?.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mr-4">
                    <p className="text-base text-gray-500">
                      <span className="font-bold">Company Name</span> :{" "}
                      {data?.companyName}
                    </p>
                    <p className="text-base text-gray-500">
                      <span className="font-bold">Price</span> :{" "}
                      {data?.pricePerUnit}$
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-base font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShowModal;
