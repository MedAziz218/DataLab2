import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { AdminNavbar } from "components/navbars";
import { useEffect, useState } from "react";
import { Transition } from "@mantine/core";
import ConsultationPage from "./adminAppPages/consultationPage/consultationPage";
import UtilisateurPage from "./adminAppPages/utilisateurPage/utilisateurPage";
import GraphPage from "./adminAppPages/graphPage/graphPage";
function Found() {
  return <div>Found</div>;
}
function Found2() {
  return <div>Found2</div>;
}

const data = [
  {
    link: "/utilisateur",
    label: "Controle des utilisateurs",
    icon: IconBellRinging,
  },
  { link: "/consultation", label: "Consulter une fiche", icon: IconReceipt2 },
  { link: "/graph", label: "Graphes", icon: IconFingerprint },
  // { link: '', label: 'SSH Keys', icon: IconKey },
  // { link: '', label: 'Databases', icon: IconDatabaseImport },
  // { link: '', label: 'Authentication', icon: Icon2fa },
  // { link: '', label: 'Other Settings', icon: IconSettings },
];

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
        {(styles) => <AdminNavbar data={data} style={styles} />}
      </Transition>

      <div
        style={{ padding: "24px", backgroundColor: "#F4F5F7", width: "100%" }}
      >
        <Outlet />
      </div>
    </div>
  );
}
export function AdminAppRoutes() {
  return (
    <Routes>
      <Route path="" element={<AdminApp />}>
        <Route exact path="/utilisateur" element={<UtilisateurPage />} />
        <Route exact path="/consultation" element={<ConsultationPage />} />
        <Route exact path="/graph" element={<GraphPage />} />
      </Route>

      <Route exact path="/login" element={<Navigate to="/" />} />

      <Route path="*" element={<Navigate to="/errors/notFound" />} />
    </Routes>
  );
}
