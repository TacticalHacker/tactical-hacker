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
  const [successMessage, setSuccessMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const loggedInUserEmail = Cookies.get('authToken') ? jwtDecode<{ sub: string }>(Cookies.get('authToken')!).sub : null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/getAllUsers`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });

        if (response.status === 403) {
          setError('You do not have access to this page.');
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 5000);
          return;
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Failed to connect to the server.');
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 5000);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const confirmChange = window.confirm(
      `Are you sure you want to change the role of ${user.fullName} from ${user.role.name} to ${newRole}?`
    );

    if (!confirmChange) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/changeUserRole`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
        body: JSON.stringify({ userId, newRole }),
      });

      if (response.ok) {
        setSuccessMessage('User role updated successfully.');
        setError('');
        setShowMessage(true);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: { ...user.role, name: newRole } } : user
          )
        );
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update user role.');
        setSuccessMessage('');
        setShowMessage(true);
      }

      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    } catch (err) {
      setError('Failed to connect to the server.');
      setSuccessMessage('');
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#202020] to-black text-white p-4 sm:p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200 mb-6 cursor-pointer"
      >
        ← Back to Home
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 text-center sm:text-left">
        Admin Dashboard
      </h1>

      {/* Success or Error Message */}
      {showMessage && (
        <div
          className={`${
            successMessage ? 'bg-green-500' : 'bg-red-500'
          } text-white px-4 py-2 rounded mb-4 transition-opacity duration-1000 ${
            showMessage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {successMessage || error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-2 sm:p-4 border border-gray-700">ID</th>
              <th className="p-2 sm:p-4 border border-gray-700">Full Name</th>
              <th className="p-2 sm:p-4 border border-gray-700">Email</th>
              <th className="p-2 sm:p-4 border border-gray-700">Year of Birth</th>
              <th className="p-2 sm:p-4 border border-gray-700">Role</th>
              <th className="p-2 sm:p-4 border border-gray-700">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700">
                <td className="p-2 sm:p-4 border border-gray-700">{user.id}</td>
                <td className="p-2 sm:p-4 border border-gray-700">{user.fullName}</td>
                <td className="p-2 sm:p-4 border border-gray-700">{user.email}</td>
                <td className="p-2 sm:p-4 border border-gray-700">{user.yearOfBirth}</td>
                <td className="p-2 sm:p-4 border border-gray-700">{user.role.name}</td>
                <td className="p-2 sm:p-4 border border-gray-700">
                  {user.email !== loggedInUserEmail ? (
                    <select
                      value={user.role.name}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="bg-gray-800 text-white px-2 py-1 rounded"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="CLIENT">CLIENT</option>
                      <option value="USER">USER</option>
                    </select>
                  ) : (
                    <span className="text-gray-500">No actions available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function jwtDecode<T>(token: string): T {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload) as T;
}

export default AdminDashboard;
