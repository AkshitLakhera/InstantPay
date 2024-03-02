import { useNavigate } from "react-router-dom";
import "../custom.css"
import image from "../assets/banking.jpg"
export default function Landing() {
    const navigate=useNavigate();
    return (
       <div className="main_container">
        {/* navigation bar */}
      <div className="flex  justify-between  main_header ">
        <h1 className="text-3xl font-bold mb-4">  InstantPay</h1>
        <div className="flex ">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" onClick={() => {
              navigate("/signup");
            }}>
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Sign Up
              </span>
            </button>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" onClick={() => {
              navigate("/signin");
            }}>
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Sign In
              </span>
            </button>
  
          {/* <button
            className="bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </button> */}
        </div>
      </div>

      {/* Main content */}
      <div className="m_content_container flex">
        <div className="m_content">
          <div className="m_header">
            <h1>Build Payment Gateways Trust With UpTrack Intellgence</h1>
          </div>
          <div className="m_para"><p>Establish Trust with payment Gateway By Synchronizing Shipment information.</p></div>
          <button className="arrow-button bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">Get Started <span className="arrow"></span>
</button>


        </div>
        <div className="m_img">
          <img src={image} alt="" />
          
        </div>
      </div>

      </div>
    );
  }
