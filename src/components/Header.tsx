import logo from '../assets/logo.png'; // Add your logo image here

export default function Header() {
  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt="Tactical Hacker" className="h-24 w-auto" />
      <h1 className="text-4xl font-bold mt-4">Tactical Hacker</h1>
      <p className="text-lg text-gray-300 mt-2">Empowering Through Innovation</p>
    </div>
  );
}
