import './index.css';
import Header from './components/Header';
import Card from './components/Card';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-6 font-sans">
      <Header />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10">
        <Card title="Child Site 1" link="https://example.com/1" />
        <Card title="Child Site 2" link="https://example.com/2" />
        <Card title="Child Site 3" link="https://example.com/3" />
        <Card title="Child Site 4" link="https://example.com/4" />
      </div>
    </div>
  );
}

export default App;
