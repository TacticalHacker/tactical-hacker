import { useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // For decoding JWT tokens
import Cookies from 'js-cookie'; // For managing cookies
import { API_BASE_URL } from './constants'; // API base URL
import logo from './assets/th-logo.png'; // Application logo

// Define the structure of the JWT payload
interface JwtPayload {
  sub: string;
  authorities: { authority: string }[];
  fullName: string;
  iat: number;
  exp: number;
}

function App() {
  // State for managing UI visibility
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // State for managing authentication and user details
  const [authError, setAuthError] = useState('');
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null);

  // State for form inputs
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpFullName, setSignUpFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpYearOfBirth, setSignUpYearOfBirth] = useState('');

  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  /**
   * Handles user sign-in.
   */
  const handleSignIn = async () => {
    if (!signInEmail || !signInPassword) {
      setAuthError('Please fill in all fields.');
      return;
    }

    setIsSignInLoading(true); // Start loading
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });
      const data = await response.json();

      if (data.token) {
        processToken(data.token);
        setShowSignIn(false);
        clearSignInForm();
      } else {
        setAuthError(data.error || 'An error occurred during sign-in.');
      }
    } catch (error) {
      setAuthError('Failed to connect to the server.');
    } finally {
      setIsSignInLoading(false); // Stop loading
    }
  };

  /**
   * Handles user sign-up.
   */
  const handleSignUp = async () => {
    // Reset error state
    setAuthError('');

    // Frontend validation
    if (!signUpFullName) {
      setAuthError('Full Name is required.');
      return;
    }
    if (signUpFullName.length > 25) {
      setAuthError('Full Name must not exceed 25 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signUpEmail) {
      setAuthError('Email is required.');
      return;
    }
    if (!emailRegex.test(signUpEmail)) {
      setAuthError('Enter a valid email.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!signUpPassword) {
      setAuthError('Password is required.');
      return;
    }
    if (!passwordRegex.test(signUpPassword)) {
      setAuthError('Password must be at least 6 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character.');
      return;
    }

    const currentYear = new Date().getFullYear(); // Get the current year
    if (!signUpYearOfBirth) {
      setAuthError('Year of Birth is required.');
      return;
    }
    const yearOfBirth = parseInt(signUpYearOfBirth, 10);
    if (isNaN(yearOfBirth) || yearOfBirth < 1900 || yearOfBirth > currentYear) {
      setAuthError('Enter a valid Year of Birth');
      return;
    }

    setIsSignUpLoading(true); // Start loading
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: signUpFullName,
          email: signUpEmail,
          password: signUpPassword,
          role: 'USER',
          yearOfBirth: signUpYearOfBirth,
        }),
      });
      const data = await response.json();

      if (data.token) {
        processToken(data.token);
        setShowSignUp(false);
        clearSignUpForm();
      } else {
        setAuthError(data.error || 'An error occurred during sign-up.');
      }
    } catch (error) {
      setAuthError('Failed to connect to the server.');
    } finally {
      setIsSignUpLoading(false); // Stop loading
  }
  };

  /**
   * Processes the JWT token, extracts user details, and saves them in cookies.
   * @param token - JWT token
   */
  const processToken = (token: string) => {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const fullName = decodedToken.fullName;
      const role = decodedToken.authorities[0].authority.replace('ROLE_', '');
      const email = decodedToken.sub;

      // Save details in cookies
      Cookies.set('authToken', token);
      Cookies.set('loggedInFullName', fullName);
      Cookies.set('loggedInUserRole', role);
      Cookies.set('loggedInUserEmail', email);

      // Update state
      setUser({ fullName, role });
      setAuthError('');
    } catch {
      setAuthError('Invalid token received.');
    }
  };

  /**
   * Clears the sign-in form fields.
   */
  const clearSignInForm = () => {
    setSignInEmail('');
    setSignInPassword('');
  };

  /**
   * Clears the sign-up form fields.
   */
  const clearSignUpForm = () => {
    setSignUpFullName('');
    setSignUpEmail('');
    setSignUpPassword('');
    setSignUpYearOfBirth('');
  };

  /**
   * Handles user logout.
   */
  const handleLogout = () => {
    // Clear cookies and reset state
    Cookies.remove('authToken');
    Cookies.remove('loggedInFullName');
    Cookies.remove('loggedInUserRole');
    Cookies.remove('loggedInUserEmail');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#202020] to-black text-white font-sans">
      {/* Navbar */}
      <header className="w-full bg-[#131313] shadow-md border-b border-[#2a2a2a] sticky top-0 z-50">
        <nav className="w-full px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-auto drop-shadow-[0_0_25px_#ffffff] transition-transform hover:scale-105"
            />
          </div>

          {/* Navigation Links */}
          <div className="space-x-6 text-sm sm:text-base flex items-center">
            {user ? (
              <div className="relative">
                {/* User Button */}
                <button
                  type="button"
                  className="bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700 transition duration-200 cursor-pointer"
                  onClick={() => setShowUserMenu((prev) => !prev)} // Toggle dropdown visibility
                >
                  {user.fullName}
                  <span className="text-lg">▼</span> {/* Down arrow */}
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-700 z-50">
                    <div className="px-4 py-3 text-sm text-gray-300">
                      <p className="truncate">
                        <strong>Full Name:</strong> {user.fullName}
                      </p>
                      <p className="truncate">
                        <strong>Email:</strong> {Cookies.get('loggedInUserEmail')}
                      </p>
                      <p>
                        <strong>Role:</strong> {user.role}
                      </p>
                    </div>
                    <div className="border-t border-gray-700 mt-2"></div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-600 hover:text-white transition duration-200 rounded-b-lg cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    clearSignInForm();
                    setShowSignIn(true);
                    setAuthError('');
                  }}
                  className="text-white hover:text-yellow-400 transition duration-200 cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearSignUpForm();
                    setShowSignUp(true);
                    setAuthError('');
                  }}
                  className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-200 cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Sign In Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowSignIn(false)} // Close when clicking outside the modal
        >
          <div
            className="bg-[#1e1e1e] rounded-xl p-8 w-80 space-y-4 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowSignIn(false)}
              className="absolute top-2 right-2 text-white text-xl cursor-pointer"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-yellow-400 text-center">Sign In</h2>
            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded bg-[#333] text-white mb-3"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded bg-[#333] text-white mb-4"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
            {/* Sign In Button */}
            <button
              type="button"
              onClick={handleSignIn}
              disabled={isSignInLoading} // Disable button while loading
              className={`w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600 transition cursor-pointer ${
                isSignInLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSignInLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowSignUp(false)} // Close when clicking outside the modal
        >
          <div
            className="bg-[#1e1e1e] rounded-xl p-8 w-80 space-y-4 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowSignUp(false)}
              className="absolute top-2 right-2 text-white text-xl cursor-pointer"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-yellow-400 text-center">Sign Up</h2>
            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
            <input
              type="text"
              placeholder="Full Name"
              className={`w-full p-2 rounded bg-[#333] text-white mb-3 ${
                authError === 'Full Name is required.' || authError === 'Full Name must not exceed 25 characters.' ? 'border border-red-500' : ''
              }`}
              value={signUpFullName}
              onChange={(e) => setSignUpFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-2 rounded bg-[#333] text-white mb-3 ${
                authError === 'Email is required.' || authError === 'Enter a valid email.' ? 'border border-red-500' : ''
              }`}
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={`w-full p-2 rounded bg-[#333] text-white mb-4 ${
                authError === 'Password is required.' || authError === 'Password must be at least 6 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character.' ? 'border border-red-500' : ''
              }`}
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Year of Birth"
              className={`w-full p-2 rounded bg-[#333] text-white mb-3 ${
                authError.includes('Year of Birth') ? 'border border-red-500' : ''
              }`}
              value={signUpYearOfBirth}
              onChange={(e) => setSignUpYearOfBirth(e.target.value)}
            />
            {/* Sign Up Button */}
            <button
              type="button"
              onClick={handleSignUp}
              disabled={isSignUpLoading} // Disable button while loading
              className={`w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600 transition cursor-pointer ${
                isSignUpLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSignUpLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </div>
      )}

      {/* Logo + About Section */}
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
