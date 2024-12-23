import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Home() {
  useEffect(() => {
    AOS.init(); 
  }, []);

  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Users Growth",
        data: [50, 100, 150, 200, 250],
        borderColor: "#FEAF00",
        backgroundColor: "rgba(254, 175, 0, 0.3)",
      },
    ],
  };

  const barData = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        label: "Sales",
        data: [30, 50, 70],
        backgroundColor: ["#FEAF00", "#00A3FE", "#6A67FE"],
      },
    ],
  };

  const pieData = {
    labels: ["Category A", "Category B", "Category C"],
    datasets: [
      {
        label: "Revenue by Category",
        data: [40, 35, 25],
        backgroundColor: ["#FEAF00", "#00A3FE", "#6A67FE"],
      },
    ],
  };

  return (
    <section className="w-full min-h-screen bg-[#f8f8f8] py-4">
      <div className="m-5">
        <h3 className="text-2xl font-bold" data-aos="fade-up">Dashboard Home</h3>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
        <div
          className="p-3 bg-white rounded shadow-xl h-[120px] flex flex-col justify-between items-start"
          data-aos="zoom-in"
        >
          <h4 className="text-sm font-bold">Total Users</h4>
          <p className="text-lg text-[#FEAF00] font-bold">250</p>
        </div>
        <div
          className="p-3 bg-white rounded shadow-xl h-[120px] flex flex-col justify-between items-start"
          data-aos="zoom-in"
        >
          <h4 className="text-sm font-bold">Revenue</h4>
          <p className="text-lg text-[#00A3FE] font-bold">$12,300</p>
        </div>
        <div
          className="p-3 bg-white rounded shadow-xl h-[120px] flex flex-col justify-between items-start"
          data-aos="zoom-in"
        >
          <h4 className="text-sm font-bold">Active Sessions</h4>
          <p className="text-lg text-[#6A67FE] font-bold">45</p>
        </div>
      </div>
   
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3 bg-white rounded shadow-xl h-[250px]" data-aos="fade-right">
          <Line data={lineData} />
        </div>
        <div className="p-3 bg-white rounded shadow-xl h-[250px]" data-aos="fade-left">
          <Bar data={barData} />
        </div>
      </div>
    
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3 bg-white rounded shadow-xl h-[300px]" data-aos="fade-up">
          <Pie data={pieData} />
        </div>
      </div>
    </section>
  );
}
