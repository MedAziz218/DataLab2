import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPageRoute from "pages/loginpage/login";
import { AuthContext } from "context/AuthContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          {LoginPageRoute()}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
