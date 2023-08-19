import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Demo } from "components/navbars/mainNavbar/mainNavbar";

function Found() {
  return <div>Found</div>;
}
function Found2() {
  return <div>Found2</div>;
}
function MainApp() {
  return (
    <div style={{display:"flex"}}>
      
      <Demo/>
      
      <Outlet />
    </div>
  );
}
export function MainAppRoutes() {
  return (
    <Routes>
      <Route path="" element={<MainApp />}>
        <Route exact path="f" element={<Found />} />
        <Route exact path="/ff" element={<Found2 />} />
      </Route>

      <Route exact path="/login" element={<Navigate to="/" />} />

     
      <Route path="*" element={<Navigate to="/errors/notFound" />} />
    </Routes>
  );
}
