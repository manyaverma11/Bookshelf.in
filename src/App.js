import './App.css';
import NavbarTop from './components/Navbar/NavbarTop.jsx';
import Body from './components/Body/Body.jsx';
import About from './components/About/About.jsx';

function App() {
  return (
    <div>
      <NavbarTop/>
      <div style={{paddingTop: '80px'}}>
      <About/>
      <Body/>
      </div>
    </div>
  );
}

export default App;
