import "../custom.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <button className="flex items-center" onClick={handleLogoClick}>
        <h1 className="text-3xl font-bold text-pink-500">InstantPay</h1>
      </button>
      <div className="flex gap-4">
        <button
          className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-gray-900 rounded-lg transition-all duration-200 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-500 hover:to-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-300"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </button>
        <button
          className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-gray-900 rounded-lg transition-all duration-200 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-500 hover:to-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-300"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
