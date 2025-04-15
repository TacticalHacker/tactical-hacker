import './index.css';
import { Card, Header } from '@components';

function App() {
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white font-sans">
      {/* About Section */}
      <Header />
      <section className="p-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-neon-green">Welcome to Tactical Hacker</h1>
        <p className="text-lg text-gray-300">
          Tactical Hacker is the parent company that connects and empowers a suite of innovative platforms and products.
          Discover our network by clicking any of the portals below.
        </p>
      </section>
    
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10">
        <Card title="TH-Scribes" link="https://tacticalhacker.github.io/th-scribes-frontend/" />
        <Card title="TH-Scribes" link="https://tacticalhacker.github.io/th-scribes-frontend/" />
        <Card title="TH-Scribes" link="https://tacticalhacker.github.io/th-scribes-frontend/" />
        <Card title="TH-Scribes" link="https://tacticalhacker.github.io/th-scribes-frontend/" />
      </div>
    </div>
  );
}

export default App;
