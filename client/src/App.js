import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPageRoute, LoginPage, Hero } from "pages/loginpage/login";
import { AuthContext } from "context/AuthContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        {!user && <LoginPageRoute />}

        {user && (
          <Routes>
            <Route exact path="/login" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
