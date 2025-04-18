import logo from './assets/th-logo.png';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white font-sans">
      {/* Logo + About Section Side-by-Side Centered */}
      <div className="flex flex-col items-center justify-center px-4 pt-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-6xl w-full">

          {/* Logo Container */}
          <div className="bg-pink/10 rounded-2xl p-6 shadow-xl  border-white">
            <img
              src={logo}
              alt="Tactical Hacker Logo"
              className="h-56 w-auto drop-shadow-[0_0_25px_#ffffff] transition-transform hover:scale-105"
            />
          </div>

          {/* About Section Container */}
          <section className="bg-blue-90/60 rounded-2xl p-8 shadow-xl  border-gray-700 max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-neon-green">Welcome to Tactical Hacker</h1>
            <p className="text-lg text-gray-300">
              Tactical Hacker is the parent company that connects and empowers a suite of innovative platforms and products.
              Discover our network by clicking any of the portals below.
            </p>
          </section>
        </div>
      </div>

      {/* Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 pt-10 pb-20 max-w-7xl mx-auto">
        {/* Card 1 */}
        <a href="https://tacticalhacker.github.io/th-scribes/" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-pink-500 to-red-500 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2 text-white">TH-Scribes</h2>
            <p className="text-sm text-white/80">Explore our world of webtoons.</p>
          </div>
        </a>

        {/* Card 2 */}
        <a href="https://child2.example.com" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-green-400 to-blue-500 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2 text-white">Coming Soon</h2>
            <p className="text-sm text-white/80">Coming Soon.....</p>
          </div>
        </a>

        {/* Card 3 */}
        <a href="https://child3.example.com" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-yellow-400 to-orange-500 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2 text-white">Coming Soon</h2>
            <p className="text-sm text-white/80">Coming Soon.....</p>
          </div>
        </a>

        {/* Card 4 */}
        <a href="https://child4.example.com" target="_blank" rel="noopener noreferrer">
          <div className="bg-gradient-to-tr from-purple-500 to-indigo-600 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2 text-white">Coming Soon</h2>
            <p className="text-sm text-white/80">Coming Soon.....</p>
          </div>
        </a>
      </section>
    </div>
  );
}

export default App;
