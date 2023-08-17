import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import LoginPage  from "pages/loginpage/login";
import { AuthContext } from "context/AuthContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
