import Footer from "../Shared/Footer/Footer";
import NavBar from "../Shared/NavBar/NavBar";
import logo from '../../assets/icon.png';

const Invoice = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="max-w-6xl mx-auto px-4">
                <div>
                    <div><img src={logo} alt="" /></div>
                    <div></div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Invoice;