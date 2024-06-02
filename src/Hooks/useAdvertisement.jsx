import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdvertisement = () => {
    const axiosSecure = useAxiosSecure();

    const { data : advertisements = [] } = useQuery({
        queryKey : ['advertisements'],
        queryFn : async () =>{
            const res = await axiosSecure.get("/advertisements");
            return res.data
        }
    })

    return [advertisements];
};

export default useAdvertisement;