import { useNavigate } from "react-router-dom";
import "../custom.css"
export default function Landing() {
    const navigate=useNavigate();
    return (
       <div className="main_container">
        {/* navigation bar */}
      <div className="flex  justify-between  main_header ">
        <h1 className="text-3xl font-bold mb-4">  InstantPay</h1>
        <div className="flex ">
          <button
            className="#FF4F5A bg-red-500 text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray mr-10"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
  
          <button
            className="bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="m_content_container flex">
        <div className="m_content">
          <div className="m_header">
            <h2>Build Payment Gateways Trust With UpTrack Intellgence</h2>
          </div>
          <div className="m_para"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore?</p></div>
          <button>Get Started </button>

        </div>
        <div className="m_img"></div>
      </div>

      </div>
    );
  }
  