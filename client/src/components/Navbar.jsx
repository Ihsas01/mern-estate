import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaHome, FaSearch, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MERN Estate
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600">
              <FaHome className="mr-1" />
              Home
            </Link>
            <Link to="/search" className="flex items-center text-gray-600 hover:text-blue-600">
              <FaSearch className="mr-1" />
              Search
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaUser className="mr-1" />
                  Dashboard
                </Link>
                <Link
                  to="/create-listing"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Create Listing
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaSignOutAlt className="mr-1" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="text-gray-600 hover:text-blue-600">
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-blue-600"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              <FaHome className="mr-2" />
              Home
            </Link>
            <Link
              to="/search"
              className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              <FaSearch className="mr-2" />
              Search
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600"
                  onClick={toggleMobileMenu}
                >
                  <FaUser className="mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/create-listing"
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600"
                  onClick={toggleMobileMenu}
                >
                  Create Listing
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    toggleMobileMenu();
                  }}
                  className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600"
                  onClick={toggleMobileMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 