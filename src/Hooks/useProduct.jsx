import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProduct = (searchText) => {
  console.log("in useProduct", searchText);
  const axiosPublic = useAxiosPublic();
  const {
    data: products = [],
    isPending,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products?search=${searchText}`);
      console.log(res.data);
      return res.data;
    },
  });
  return { products, isPending, refetch, isLoading };
};

export default useProduct;