import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './constants';
import Cookies from 'js-cookie';

interface User {
  id: string;
  fullName: string;
  email: string;
  yearOfBirth: number;
  role: { id: number; name: string };
}

function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/getAllUsers`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`, // Pass the auth token
          },
        });

        if (response.status === 403) {
          setError('You do not have access to this page.');
          return;
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch user data. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#202020] to-black text-white p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')} // Navigate back to the home screen
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200 mb-6 cursor-pointer"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 border border-gray-700">ID</th>
              <th className="p-4 border border-gray-700">Full Name</th>
              <th className="p-4 border border-gray-700">Email</th>
              <th className="p-4 border border-gray-700">Year of Birth</th>
              <th className="p-4 border border-gray-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700">
                <td className="p-4 border border-gray-700">{user.id}</td>
                <td className="p-4 border border-gray-700">{user.fullName}</td>
                <td className="p-4 border border-gray-700">{user.email}</td>
                <td className="p-4 border border-gray-700">{user.yearOfBirth}</td>
                <td className="p-4 border border-gray-700">{user.role.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;