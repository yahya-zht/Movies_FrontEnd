import "./App.css";
import Navbar from "./components/Navbar";
import RouterPage from "./routes/Router";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div>
          <RouterPage />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
