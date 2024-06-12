import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllProducts = () => {
    const axiosPublic = useAxiosPublic();
    const { data: products = [], isPending } = useQuery({
      queryKey: ["all-products"],
      queryFn: async () => {
        const res = await axiosPublic.get("/products");
        // console.log("in discount", res.data);
        return res.data;
      },
    });
    return { products,isPending}
};

export default useAllProducts;