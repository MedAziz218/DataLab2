import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { MainNavbar } from "components/navbars";
import { useEffect, useState } from "react";
import { Transition } from "@mantine/core";
function Found() {
  return <div>Found</div>;
}
function Found2() {
  return <div>Found2</div>;
}
function MainApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div style={{ display: "flex" }}>
      <Transition
        mounted={mounted}
        transition="slide-right"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => <MainNavbar style={styles} />}
      </Transition>

      <Outlet />
    </div>
  );
}
export function MainAppRoutes() {
  return (
    <Routes>
      <Route path="" element={<MainApp />}>
        <Route exact path="controle" element={<Found />} />
        <Route exact path="/cisaillement" element={<Found2 />} />
        <Route exact path="mp" element={<Found />} />
        <Route exact path="/equipements" element={<Found2 />} />
        <Route exact path="/notes" element={<Found2 />} />
      </Route>

      <Route exact path="/login" element={<Navigate to="/" />} />

      <Route path="*" element={<Navigate to="/errors/notFound" />} />
    </Routes>
  );
}
