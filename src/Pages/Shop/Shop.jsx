import useProduct from "../../Hooks/useProduct";
import { ClipLoader } from "react-spinners";
import Table from "../Shared/Table/Table";
import { useState } from "react";

const Shop = () => {
  const [searchText, setSearchText] = useState('');
 
 const { products, refetch, isLoading } = useProduct(searchText);

  const handleSearch = e =>{
    e.preventDefault();
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
        <div>
          <select defaultValue="" className="select select-bordered w-full">
            <option disabled value="">
              Sort by
            </option>
            <option value="Price low to high">Price: low to high</option>
            <option value="Price high to low">Price: high to low</option>
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
    </div>
  );
};

export default Shop;
