import Footer from "../Shared/Footer/Footer";
import NavBar from "../Shared/NavBar/NavBar";
import logo from '../../assets/icon.png';
import { useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Invoice = () => {
    const axiosSecure = useAxiosSecure();
    useEffect(() =>{
        axiosSecure.get("/invoice")
        .then(res => {
            console.log(res.data);
        })
    },[axiosSecure])
    return (
        <div>
            <NavBar></NavBar>
            <div className="max-w-6xl mx-auto px-4">
                <div>
                    <div className="mt-10 mb-8">
                        <h2 className="text-3xl font-bold text-center underline decoration-blue-600">Invoice Page</h2>
                    </div>
                    <div>
                        <img className="w-56  h-8" src={logo} alt="" />
                    </div>
                    <div>
                        <p>Invoice no : {}</p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Invoice;