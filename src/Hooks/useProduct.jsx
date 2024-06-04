import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProduct = (searchText, currentPage, itemsPerPage) => {
  console.log("in useProduct", currentPage, itemsPerPage);
  const axiosPublic = useAxiosPublic();
  const {
    data: products = [],
    isPending,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?search=${searchText}&page=${currentPage}&size=${itemsPerPage}`
      );
      console.log(res.data);
      return res.data;
    },
  });
  return { products, isPending, refetch, isLoading };
};

export default useProduct;
