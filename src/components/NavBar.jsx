// import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand" href="#">
              Your Brand
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
                <li className="nav-item">
                  <Link to="/signin" className="nav-link" href="#">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="signup" className="nav-link" href="#">
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    </div>
  );
};

export default NavBar;
