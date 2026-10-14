import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="brand">
          <img
            src={logo}
            alt="PasteSpace Logo"
            className="brand-logo"
          />
          <span className="brand-name">
            Paste<span>Space</span>
          </span>
        </NavLink>

        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            My Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;