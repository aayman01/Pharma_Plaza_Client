import { Outlet } from 'react-router-dom';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import Footer from '../Pages/Shared/Footer/Footer';

const Main = () => {
    const noHeaderFooter =
      location.pathname.includes("login") ||
      location.pathname.includes("signup");
    return (
      <div>
        {noHeaderFooter || <NavBar />}
        <div className="max-w-6xl mx-auto px-4">
          <Outlet />
        </div>
        {noHeaderFooter || <Footer/>}
      </div>
    );
};

export default Main;