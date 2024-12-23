import { useNavigate } from "react-router";
import img from "./../../Images/404-not-found.png"

export default function NotFound() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/dashboard");
  };

  return (
    <section className="w-full min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#FEAF00]">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mt-4">
          Oops! Page Not Found
        </p>
        <p className="text-gray-600 mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={goToHome}
          className="mt-6 text-white bg-[#FEAF00] px-6 py-3 rounded-lg text-lg hover:bg-[#d49a00] transition"
        >
          Go to Home
        </button>
      </div>
      <div className="mt-10">
        <img
          src={img}
          alt="Not Found"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </section>
  );
}
