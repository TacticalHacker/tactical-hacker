import { useNavigate } from "react-router-dom";
import logo from "../assets/th-logo.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-white px-4">
      <img
        src={logo}
        alt="Tactical Hacker Logo"
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-6 rounded-full border-2 border-[#00bfa6] shadow-[0_0_12px_#00bfa6] transition-all"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
        Welcome to{" "}
        <span className="text-[#00bfa6]">Tactical Hacker</span>
      </h1>
      <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-300 text-center">
        Initializing{" "}
        <span className="text-[#00bfa6] font-semibold">Tactical Mode</span>...
      </p>
      <div className="mt-8 flex justify-center w-full">
        <blockquote className="italic text-base sm:text-lg md:text-xl text-[#00bfa6] px-4 sm:px-6 py-4 rounded-xl border border-[#00bfa6] shadow-[0_0_12px_#00bfa6] bg-[#161b22] max-w-xs sm:max-w-lg md:max-w-xl text-center">
          “We believe in learning by building. Every idea deserves a prototype.”
        </blockquote>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/about")}
          className="bg-[#00bfa6] text-[#0d1117] px-6 py-2 rounded font-semibold hover:bg-cyan-400 transition text-center"
        >
          Our Journey
        </button>
        <a
          href="https://youtube.com/@tacticalhacker"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[#00bfa6] text-[#00bfa6] px-6 py-2 rounded font-semibold hover:bg-[#00bfa6] hover:text-[#0d1117] transition text-center"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}

export default Home;