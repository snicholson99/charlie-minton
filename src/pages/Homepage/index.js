import { Link } from "react-router-dom";
import { LogoGraphic } from "../../components/LogoGraphic";
import "./style.css";

export const Homepage = () => {
  return (
    <div id="homepage" className="page">
      <LogoGraphic />
      <h1>Charlie Minton</h1>
      <h2>Freelance Photographer</h2>
      <Link to="/gallery" className="homepage-link">
        View Gallery
      </Link>
    </div>
  );
};
