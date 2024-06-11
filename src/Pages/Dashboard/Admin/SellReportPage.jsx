import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { DateRangePicker } from "react-date-range";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { formatDate } from "date-fns";

const SellReportPage = () => {
  const axiosSecure = useAxiosSecure();
  const [openData, setOpenData] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    setIsLoading(true)
    axiosSecure.get('/sales-report')
    .then(res => {
      if(res.data){
        setIsLoading(false)
        setProducts(res.data);
        setAllProducts(res.data);
      }
    })
  },[axiosSecure])

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (date) => {
    let filtered = allProducts.filter(product => {
      let productDate = new Date(product['date']);
      return productDate >= date.selection.startDate && productDate <= date.selection.endDate;
    })
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setProducts(filtered)
  };

  const handleClick = () => {
    setOpenData(!openData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#076cec" size={50} />
      </div>
    );
  }
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-center underline">
          Sells Report
        </h2>
      </div>
      <div className="container flex items-center justify-end mt-8 mb-4">
        <span
          onClick={handleClick}
          className="btn text-white bg-[#076cec] hover:bg-[#0072CE] "
        >
          Date Range
        </span>
        {openData && (
          <DateRangePicker
            className="dateRange"
            ranges={[selectionRange]}
            onChange={handleSelect}
          />
        )}
      </div>
      {products.length === 0 ? (
        <div className="h-screen-minus-20px flex items-center justify-center">
          <h2 className="text-3xl font-bold">
            Any kind of sales not happened on this Dates...
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="table font-medium">
            <thead className="bg-[#076cec] text-white">
              <tr className="text-base">
                <th>#</th>
                <th>Product Name</th>
                <th>Buyer Email</th>
                <th>Seller Email</th>
                <th>Transaction Id</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            {products.map((item, idx) => (
              <tbody key={idx}>
                <tr>
                  <th>{idx + 1}</th>
                  <td>{item.productDetails?.name}</td>
                  <td>{item.email}</td>
                  <td>{item.productDetails?.sellerEmail}</td>
                  <td>{item.transactionId}</td>
                  <td>{formatDate(item?.date, "MMM,dd,yyyy")}</td>
                  <td>{item.price.toFixed(2)}$</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default SellReportPage;
