import "../custom.css"
import image from "../assets/banking.jpg"
import Navbar from "./Navbar";
export default function Landing() {
    return (
       <div className="main_container ">
        {/* navigation bar */}
        <Navbar/>
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
