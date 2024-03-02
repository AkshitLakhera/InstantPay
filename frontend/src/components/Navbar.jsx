import "../custom.css"
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/")
  }
  return (
    <div className="flex justify-between main_header">
       <button className="logo" onClick={handleLogoClick}>
        <h1 className="text-3xl font-bold mb-4">InstantPay</h1>
      </button>
      <div className="flex">
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          onClick={() => {
            navigate("/signup");
          }}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Sign Up
          </span>
        </button>
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          onClick={() => {
            navigate("/signin");
          }}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Sign In
          </span>
        </button>
      </div>
    </div>
  );
}
