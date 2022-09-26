import { Link } from "react-router-dom";
import { LogoGraphic } from "../../components/LogoGraphic";
import "./style.css";

export const Homepage = () => {
  return (
    <div id="homepage" className="page">
      <LogoGraphic />
      <h1>Charlie Minton</h1>
      <h2>Freelance Photographer</h2>
      <Link to="/charlie-minton/gallery" className="homepage-link">
        View Gallery
      </Link>
      <a
        href="https://www.instagram.com/charlie.minton/"
        target="_blank"
        rel="noreferrer"
        id="homepage-social"
      >
        <i className="fa-brands fa-instagram"></i>
        <p>Follow me on Instagram</p>
      </a>
    </div>
  );
};
