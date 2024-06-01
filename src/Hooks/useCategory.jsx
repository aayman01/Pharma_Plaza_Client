import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCategory = () => {

    const axiosSecure = useAxiosSecure();
    const {data : categories = []} = useQuery({
        queryKey : ['category'],
        queryFn : async () => {
            const res = await axiosSecure.get('/category')
            return res.data
        }
    })

    return {categories}
};

export default useCategory;