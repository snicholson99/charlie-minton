import "./style.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link to="/charlie-minton/" className="header-title homepage-link">
        <img src="assets/logo.svg" alt="logo" />
        {/* <h1>Charlie Minton</h1> */}
      </Link>
      <div className="header-links">
        <Link to="/charlie-minton/gallery" className="homepage-link">
          Gallery
        </Link>
        <Link to="/charlie-minton/basket" className="homepage-link">
          Basket
        </Link>
        {/* <Link to="/about" className="homepage-link">
          About Me
        </Link>
        <Link to="/contact" className="homepage-link">
          Contact
        </Link> */}
      </div>
    </header>
  );
};
