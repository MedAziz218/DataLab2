import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPageRoute, LoginPage, Hero } from "pages/loginpage/login";
import { AuthContext } from "context/AuthContext";

import { NotFoundTitle as NotFound } from "pages/notFound/notfound";
import { MainAppRoutes } from "pages/mainApp";


function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        {!user && <LoginPageRoute />}

        {user && (
         <MainAppRoutes/>
        )}
        <Routes>
          <Route exact path="/errors/notFound" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
