import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProduct = () => {

    const axiosPublic = useAxiosPublic();
    const {data : products = [], isPending} = useQuery({
        queryKey : ['products'],
        queryFn : async () => {
            const res = await axiosPublic.get('/products')
            return res.data;
        }
    })
    return { products, isPending };
};

export default useProduct;