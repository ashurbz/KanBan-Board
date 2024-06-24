import { Link } from "react-router-dom";
import "./navBar.css";
import { useDispatch, useSelector } from "react-redux";
import { isAuth, userDetails } from "../redux/authSlice";
import { useState } from "react";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const auth = useSelector((store) => store.auth.isAuthenticated);
  console.log(auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(userDetails(null));
    dispatch(isAuth(false));
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to={!auth ? "/" : "/dashboard"} className="navbar-brand brand">
            KanBan Board
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggle}
            aria-controls="navbarSupportedContent"
            aria-expanded={toggle ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${toggle ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <li className="nav-item nav-link">Welcome {user}</li>
              ) : (
                ""
              )}

              {!user ? (
                <>
                  <li className="nav-item">
                    <Link to="/signin" className="nav-link">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={handleLogOut}>
                    Log Out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
