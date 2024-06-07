import logo from "../../assets/icon.png";
import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { ClipLoader } from "react-spinners";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";


const Invoice = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pdfRef = useRef();

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      axiosSecure.get("/invoices").then((res) => {
        // console.log(res.data);
        setData(res.data);
        setLoading(false);
      });
    };
    getData();
  }, [axiosSecure]);

  
  const totalPrice = data[0]?.items.reduce(
    (total, item) => total + item.price,
    0
  );

  const handleGoHome = () => {
    axiosPublic.delete(`/invoice-delete/${data[0]?._id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        navigate("/");
      }
    });
  };
  // console.log(data);
  const downloadPDF =() => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imageData = canvas.toDataURL('/image/png');
      const pdf = new jsPDF('p','mm','a4',true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeigth = canvas.width;
      const ratio = Math.min(pdfWidth/imgWidth,pdfHeight/imgHeigth);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imageData,'PNG',imgX,imgY,imgWidth * ratio,imgHeigth * ratio);
      pdf.save('invoice.pdf')

    });
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#076cec" size={50} />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        <div ref={pdfRef}>
          <div className="mt-10 mb-8">
            <h2 className="text-3xl font-bold text-center underline decoration-blue-600">
              Invoice
            </h2>
          </div>
          <div className="ml-3">
            <img className="w-56  h-8" src={logo} alt="" />
          </div>
          <div className="flex justify-between mt-6 p-3">
            <div className="font-bold">
              <p>Name: {data[0]?.name}</p>
              <p>Email: {data[0]?.email}</p>
              <p>
                Address: <span className="text-gray-400 font-normal">N\A</span>
              </p>
            </div>
            <div className="font-bold">
              <p>Invoice no : {data[0]?._id}</p>
              <p>Date : {data[0]?.date}</p>
            </div>
          </div>
          <div>
            <div className="overflow-x-auto border rounded-sm mt-6">
              <table className="table font-bold text-base">
                {/* head */}
                <thead>
                  <tr className="text-lg text-white bg-[#076cec] ">
                    <th></th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {data[0]?.items?.map((item, idx) => (
                    <tr key={item.productId} className="bg-[#dbf4fc] border">
                      <td>{idx + 1}</td>
                      <td>{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}$</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#dbf4fc] border-black">
                    <th></th>
                    <th></th>
                    <th className="text-lg text-black text-end">
                      Total Price:
                    </th>
                    <th className="text-lg text-black ">{totalPrice}$</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex justify-end mr-4 mt-7 mb-9">
              <button
                className="btn text-base text-white bg-[#076cec] hover:bg-[#0072CE]"
                onClick={downloadPDF}
              >
                Download PDF
              </button>
            </div>
            <div className="flex justify-center mr-4 mt-7 mb-9">
              <button
                onClick={handleGoHome}
                className="btn text-base text-white bg-[#076cec] hover:bg-[#0072CE]"
              >
                Go To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
