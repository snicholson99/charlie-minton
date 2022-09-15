import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import { Gallery } from "./pages/Gallery";
import { Basket } from "./pages/Basket";
import { Header } from "./components/Header";
import { GalleryItems } from "./components/GalleryItems";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/charlie-minton" element={<Homepage />} />
        <Route exact path="/charlie-minton/gallery" element={<Gallery />} />
        <Route
          path={`/charlie-minton/gallery/:eventId`}
          element={<GalleryItems />}
        />
        <Route exact path="/charlie-minton/basket" element={<Basket />} />
      </Routes>
    </div>
  );
};

export default App;
