import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="navbar-brand" href="#">
              Cake Defi
            </div>
            {/* <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Made with love
                </a>
              </li>
            </ul> */}
            <ul className="navbar-nav ms-auto mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="https://tjandra-putra.github.io/" target="_blank" rel="noopener">
                  Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.linkedin.com/in/tjandra-putra/"
                  target="_blank"
                  rel="noopener"
                >
                  LinkedIn
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com/Tjandra-Putra" target="_blank" rel="noopener">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
