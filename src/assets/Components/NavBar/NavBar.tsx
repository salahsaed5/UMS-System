import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../Context/AuthContext";

export default function NavBar() {
  const { userData }: any = useContext(authContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-3">
      <div className="flex items-center justify-between mx-auto px-4">
        
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <h1 className="border-l-4 border-[#F8D442] pl-3 font-bold text-lg">
            UMS
          </h1>
        </Link>

       
        <h1 className="hidden md:block text-2xl text-gray-600 font-bold">
          Welcome <span className="text-[#feae00e0]">{userData?.firstName}</span>
        </h1>

        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>


      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md mt-2 p-4">
          <h1 className="text-lg text-gray-600 font-bold">
            Welcome <span className="text-[#feae00e0]">{userData?.firstName}</span>
          </h1>
        </div>
      )}
    </nav>
  );
}
