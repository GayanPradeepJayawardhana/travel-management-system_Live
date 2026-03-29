import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            ✈️ TravelHub
          </Link>
        </div>
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          
          {!user ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link btn-register">Register</Link>
            </>
          ) : (
            <>
              {user.role === "user" && (
                <Link to="/user" className="nav-link">My Bookings</Link>
              )}
              {user.role === "admin" && (
                <Link to="/admin" className="nav-link">Admin Panel</Link>
              )}
              <div className="nav-user">
                <span className="user-name">{user.name}</span>
                <button onClick={handleLogout} className="btn btn-logout">Logout</button>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;