import "./App.css";
import NavbarTop from "./components/Navbar/NavbarTop.jsx";
import Body from "./components/Body/Body.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
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

export default App;
