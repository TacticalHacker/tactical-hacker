import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import AdminDashboard from './AdminDashboard';
import App from './App'; // Use App.tsx as the home page

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppWrapper />
    </StrictMode>
  );
}

function AppWrapper() {
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null);

  return (
    <Router basename="/tactical-hacker">
      <Routes>
        {/* Layout wraps all routes */}
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          {/* Home Page */}
          <Route index element={<App />} />
          {/* Admin Dashboard */}
          <Route path="adminDashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
