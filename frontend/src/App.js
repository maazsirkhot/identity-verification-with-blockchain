import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Homepage/Home";
import DocumentType from "./components/Verification/DocumentType";
import DocumentFiles from "./components/Verification/DocumentFiles";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/documenttype" component={DocumentType} />
        <Route path="/documentfiles" component={DocumentFiles} />
      </BrowserRouter>
    </div>
  );  
}

export default App;
