import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../auth";

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide">MyStore</Link>
      
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Products</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
        {token && (
          <>
            <Link to="/admin" className="hover:underline">Admin</Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        )}
        {!token && (
          <Link to="/login" className="hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
