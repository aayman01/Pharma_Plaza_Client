import useProduct from "../../Hooks/useProduct";
import { ClipLoader } from "react-spinners";
import Table from "../Shared/Table/Table";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Shop = () => {
  const [searchText, setSearchText] = useState('');
  const [count , setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(''); 
  const { products, refetch, isLoading } = useProduct(searchText,currentPage,itemsPerPage,sort);
  const axiosPublic = useAxiosPublic();

  // search functionality
  const handleSearch = e =>{
    e.preventDefault();
    refetch();
  }

  // pagination functionality


  useEffect(()=>{
    const getCount = async () => {
      const { data } = await axiosPublic("/products-count")
      setCount(data.count)
    }
    getCount();
  },[axiosPublic])

  const numberOfPages = Math.ceil(count/itemsPerPage)
  const pages = [
    ...Array(numberOfPages)
      .keys()
      .map((element) => element + 1),
  ];

  const handlePaginationButton = (value) =>{
    console.log(value);
    setCurrentPage(value);
    refetch();
  }


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#076cec" size={50} />
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mt-8">
        <h2 className="text-4xl font-bold mb-2">All Products</h2>
        <p className="text-gray-500 text-sm mb-12">
          Find All Your Product You Need
        </p>
      </div>
      <div className="flex items-center justify-center gap-7 px-10 pb-10">
        {/* search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center gap-1"
        >
          <input
            type="text"
            placeholder="Type here"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            className="input input-bordered w-full"
          />
          <input
            className="btn text-white bg-[#076cec] hover:bg-[#0072CE]"
            type="submit"
            value="Search"
          />
        </form>
        {/* sort */}
        <div>
          <select
            onChange={(e) => {
              setSort(e.target.value);
              refetch();
            }}
            defaultValue=""
            value={sort}
            className="select select-bordered w-full"
          >
            <option disabled value="">
              Sort by price
            </option>
            <option value="dsc">Price: low to high</option>
            <option value="asc">Price: high to low</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto mb-20 border rounded-lg">
        <table className="table">
          <thead>
            <tr className="text-lg text-[#076cec]">
              <th>#</th>
              <th>Product Name</th>
              <th>Company Name</th>
              <th>Price Per Unit</th>
              <th>Add to Cart</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <Table key={idx} idx={idx} product={product}></Table>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <div className="flex justify-center my-12 ">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1 font-medium">previous</span>
          </div>
        </button>
        {/* Numbers */}
        {pages.map((btnNum) => (
          <button
            key={btnNum}
            onClick={() => handlePaginationButton(btnNum)}
            className={`hidden ${
              currentPage === btnNum
                ? "bg-[#076cec] text-white font-medium"
                : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform font-medium rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1 font-medium">Next</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Shop;
