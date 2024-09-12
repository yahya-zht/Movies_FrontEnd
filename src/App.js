import "./App.css";
import Navbar from "./components/Navbar";
import RouterPage from "./routes/Router";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <RouterPage />
      </div>
    </Router>
  );
}

export default App;
