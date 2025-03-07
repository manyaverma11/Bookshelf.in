import "./App.css";
import NavbarTop from "./components/Navbar/NavbarTop.jsx";
import Body from "./components/Body/Body.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BookRecommender from "./components/BookRecommender/BookRecommender";

function HomePage() {
  return (
    <div>
      <NavbarTop />
      <div style={{ paddingTop: "0px" }}>
        <Body />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommend" element={<BookRecommender />} />
      </Routes>
    </Router>
  );
}

export default App;
