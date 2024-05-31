import { Link } from 'react-router-dom';
import error from '../../assets/error.png'
const ErrorPage = () => {
    return (
      <div>
        <div className="flex justify-center items-center mt-8 h-[450px]">
          <img
            className="h-[450px] w-[450px]"
            src={error}
            alt="404 not found"
          />
        </div>
        <Link className="flex justify-center font-bold " to="/">
          <button className="btn btn-primary">Go to homepage</button>
        </Link>
      </div>
    );
};

export default ErrorPage;