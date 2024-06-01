import { CiLocationOn } from "react-icons/ci";
import { FaLinkedin, FaMessage, FaPhone } from "react-icons/fa6";
import logo from '../../../assets/white-logo.png'

const Footer = () => {
    return (
      <div>
        <div className="bg-[#076cec]">
          <footer className="footer p-10 text-white">
            <aside>
              <img className="w-56 h-10" src={logo} alt="" />
            </aside>
            <nav>
              <h6 className="footer-title">Contact Info</h6>
              <p className="flex items-center justify-center gap-1">
                <CiLocationOn /> 5678 New Boulevard
              </p>
              <p className="flex items-center justify-center gap-1">
                <FaMessage />
                pharmaPlaza@gmail.com
              </p>
              <p className="flex items-center justify-center gap-1">
                <FaPhone />
                +880 101 000 000
              </p>
            </nav>
            <nav>
              <h6 className="footer-title">Company</h6>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Services</a>
            </nav>
            <nav>
              <h6 className="footer-title">Social</h6>
              <div className="grid grid-flow-col gap-4">
                <a>
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
            </nav>
            <hr />
          </footer>

          <footer className="footer p-4 text-white flex justify-between border-t">
            <aside>
              <p>Copyright © 2024 - All right reserved by PharmaPlaza</p>
            </aside>
            <div className="flex items-center gap-4">
              <a>Privacy Policy</a>
              <a>Terms of use</a>
            </div>
          </footer>
        </div>
      </div>
    );
};

export default Footer;