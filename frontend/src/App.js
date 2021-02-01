import { BrowserRouter } from "react-router-dom";
import AOS from "aos";
import Routes from "./components/Routes";
import "./assets/css/custom.css";
import "./assets/css/aos.css";

AOS.init();

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
