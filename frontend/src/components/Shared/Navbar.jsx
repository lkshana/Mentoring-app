import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Menu, X, Sun, Moon, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Define navigation links based on user role
  const getNavLinks = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'student':
        return [
          { name: 'Dashboard', path: '/student/dashboard' },
          { name: 'Projects', path: '/student/projects' },
          { name: 'Profile', path: '/student/profile' }
        ];
      case 'mentor':
        return [
          { name: 'Dashboard', path: '/mentor/dashboard' },
          { name: 'Profile', path: '/mentor/profile' }
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard' }
        ];
      case 'master':
        return [
          { name: 'Dashboard', path: '/master/dashboard' }
        ];
      default:
        return [];
    }
  };
  
  const navLinks = getNavLinks();
  
  return (
    <nav className="bg-white dark:bg-blue-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to={user ? `/${user.role}/dashboard` : '/'} 
                className="text-blue-900 dark:text-white font-bold text-xl">
                Mentoring Portal
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${
                    location.pathname === link.path
                      ? 'border-blue-500 text-blue-900 dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user && (
              <div className="hidden sm:ml-3 sm:flex sm:items-center">
                <div className="relative ml-3">
                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/${user.role}/profile`}
                      className="flex items-center text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-blue-800 px-3 py-2 rounded-md"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user.name}
                    </Link>
                    <button
                      className="px-4 py-2 rounded-md text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-blue-800"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${
                location.pathname === link.path
                  ? 'bg-blue-50 dark:bg-blue-800 border-blue-500 text-blue-900 dark:text-white'
                  : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-blue-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <>
              <Link
                to={`/${user.role}/profile`}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-blue-700 text-base font-medium"
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-blue-700 text-base font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;