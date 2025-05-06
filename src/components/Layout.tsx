import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  user: { fullName: string; role: string } | null;
  setUser: (user: { fullName: string; role: string } | null) => void;
}


function Layout({ user, setUser }: LayoutProps) {
  return (
    <div>
      {/* Static Navbar */}
      <Navbar user={user} setUser={setUser} />
      {/* Render the current page */}
      <Outlet />
    </div>
  );
}

export default Layout;