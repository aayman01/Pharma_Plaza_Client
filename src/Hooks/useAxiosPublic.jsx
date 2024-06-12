import axios from "axios";

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
      baseURL: "https://pharma-plaza-server.vercel.app",
    });
    return axiosPublic;
};

export default useAxiosPublic;