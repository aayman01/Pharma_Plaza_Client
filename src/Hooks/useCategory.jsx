import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCategory = () => {
  const axiosSecure = useAxiosSecure();

    const { refetch, data: categories = [], isLoading } = useQuery({
      queryKey: ["category"],
      queryFn: async () => {
        const res = await axiosSecure.get("/category");
        // console.log(res.data);
        return res.data;
      },
    });

    return { refetch, categories, isLoading };
};

export default useCategory;