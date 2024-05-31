import { Outlet } from 'react-router-dom';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const Main = () => {
    return (
      <div>
        <NavBar />
        <div className='max-w-6xl mx-auto px-4'>
          <Outlet />
        </div>
      </div>
    );
};

export default Main;