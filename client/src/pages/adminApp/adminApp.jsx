import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { AdminNavbar } from "components/navbars";
import { useEffect, useState } from "react";
import { Transition } from "@mantine/core";
function Found() {
  return <div>Found</div>;
}
function Found2() {
  return <div>Found2</div>;
}
function AdminApp() {
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
        {(styles) => <AdminNavbar style={styles} />}
      </Transition>

      <Outlet />
    </div>
  );
}
export function AdminAppRoutes() {
  return (
    <Routes>
      <Route path="" element={<AdminApp />}>
        <Route exact path="ss" element={<Found />} />
       
      </Route>

      <Route exact path="/login" element={<Navigate to="/" />} />

      <Route path="*" element={<Navigate to="/errors/notFound" />} />
    </Routes>
  );
}
