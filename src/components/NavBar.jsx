// import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";
import "./navBar.css";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../redux/authSlice";
const NavBar = () => {
  const user = useSelector((store) => store.auth.user);

  const dispatch = useDispatch();

  console.log(user);
  const handleLogOut = () => {
    dispatch(userDetails(null));
  };
  return (
    <div>
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand" href="#">
              <span className="brand"> KanBan Board</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {user && <li className="nav-item nav-link">Welcome {user}</li>}

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
                  <li className="nav-item" onClick={handleLogOut}>
                    <Link to="/" className="nav-link">
                      Log Out
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </>
    </div>
  );
};

export default NavBar;
