import logo from './assets/th-logo.png';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#202020] to-black text-white font-sans">

      {/* Navbar */}
      <header className="w-full bg-[#131313] shadow-md border-b border-[#2a2a2a] sticky top-0 z-50">
      <nav className="w-full px-6 py-4 flex justify-between items-center">
          {/* Logo (Small in Nav) */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-auto drop-shadow-sm bg-gradient-to-tr from-[#3a3a3a] to-[#5a442a] rounded-xl" />
            
          </div>

          {/* Nav Links */}
          <div className="space-x-6 text-sm sm:text-base">
            <a href="#" className="hover:text-yellow-400 transition duration-200">Sign In</a>
            <a href="#" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-200">Sign Up</a>
          </div>
        </nav>
      </header>

      {/* Logo + About Section Side-by-Side */}
      <div className="flex flex-col items-center justify-center px-4 pt-10">
        <div className="flex flex-col lg:flex-row items-start justify-start gap-6 max-w-6xl w-full">

          {/* Logo Container */}
          <div>
            <img
              src={logo}
              alt="Tactical Hacker Logo"
              className="h-44 w-auto drop-shadow-[0_0_25px_#ffffff] transition-transform hover:scale-105"
            />
          </div>

          {/* About Section Container */}
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
        {/* Card 1 */}
        <a href="https://tacticalhacker.github.io/th-scribes-frontend/" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-[#4b2e22] to-[#a36d2f] p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer border border-[#5c3b2e]">
            <h2 className="text-2xl font-bold mb-2 text-white">TH-Scribes</h2>
            <p className="text-sm text-white/80">Explore our world of webtoons.</p>
          </div>
        </a>

        {/* Card 2 */}
        <a href="https://child2.example.com" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-[#2d2d2d] to-[#50523e] p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer border border-[#454738]">
            <h2 className="text-2xl font-bold mb-2 text-white">Coming Soon</h2>
            <p className="text-sm text-white/80">Coming Soon.....</p>
          </div>
        </a>

        {/* Card 3 */}
        <a href="https://child3.example.com" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-[#2e2e2e] to-[#7a4c1e] p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer border border-[#604220]">
            <h2 className="text-2xl font-bold mb-2 text-white">Coming Soon</h2>
            <p className="text-sm text-white/80">Coming Soon.....</p>
          </div>
        </a>

        {/* Card 4 */}
        <a href="https://child4.example.com" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-[#3a3a3a] to-[#5a442a] p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer border border-[#5a4b3a]">
            <h2 className="text-2xl font-bold mb-2 text-white">Coming Soon</h2>
            <p className="text-sm text-white/80">Coming Soon.....</p>
          </div>
        </a>
      </section>
    </div>
  );
}

export default App;
