import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          My App
        </Link>
        
        <div className="flex space-x-4">

          
          {token ? (
            location.pathname === '/users' ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/users"
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md"
              >
                Dashboard
              </Link>
            )
          ) : (
            <Link
              to="/"
              className={`text-white px-3 py-2 rounded-md ${
                location.pathname === '/' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;