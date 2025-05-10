import logo from './assets/th-logo.png';

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#202020] to-black text-white font-sans">

      <div className="flex flex-col items-center justify-center px-4 pt-10">
        <div className="flex flex-col lg:flex-row items-start justify-start gap-6 max-w-6xl w-full">
          {/* Logo */}
          <div>
            <img
              src={logo}
              alt="Tactical Hacker Logo"
              className="h-44 w-auto drop-shadow-[0_0_25px_#ffffff] transition-transform hover:scale-105"
            />
          </div>

          {/* About Section */}
          <section className="bg-[#1e1e1e]/80 rounded-xl p-8 text-left shadow-md border-[#333] flex-grow max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-[#FFD700]">Welcome to Tactical Hacker</h1>
            <p className="text-lg text-gray-300">
              Tactical Hacker is the parent company that connects and empowers a suite of innovative platforms and products.
              Discover our network by clicking any of the portals below.
            </p>
          </section>
        </div>
      </div>

    {/* Cards Section */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-20 pt-10 max-w-7xl mx-auto">
        {/* Your Cards here */}
        {/* Card 1 */}
        <a href="https://tacticalhacker.github.io/th-scribes/" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-[#4b2e22] to-[#a36d2f] p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer border border-[#5c3b2e]">
            <h2 className="text-2xl font-bold mb-2 text-white">TH-Scribes</h2>
            <p className="text-sm text-white/80">Explore our world of webtoons.</p>
          </div>
        </a>

        {/* Card 2 */}
        <a href="/" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-[#2d2d2d] to-[#50523e] p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer border border-[#454738]">
            <h2 className="text-2xl font-bold mb-2 text-white">TH-Art</h2>
            <p className="text-sm text-white/80">Coming Soon.....</p>
          </div>
        </a>

        {/* Card 3 */}
        <a href="/" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-[#2e2e2e] to-[#7a4c1e] p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer border border-[#604220]">
            <h2 className="text-2xl font-bold mb-2 text-white">TH-Blogs</h2>
            <p className="text-sm text-white/80">Coming Soon.....</p>
          </div>
        </a>

        {/* Card 4 */}
        <a href="/" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-[#3a3a3a] to-[#5a442a] p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer border border-[#5a4b3a]">
            <h2 className="text-2xl font-bold mb-2 text-white">TH-Creations</h2>
            <p className="text-sm text-white/80">Coming Soon.....</p>
          </div>
        </a>
        {/* (Copy from your previous code, same as before) */}
      </section>
    </div>
  );
}

export default App;
