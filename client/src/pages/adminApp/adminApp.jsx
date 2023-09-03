import {
  IconBellRinging,
  IconFingerprint,
  // IconKey,
  // IconSettings,
  // Icon2fa,
  // IconDatabaseImport,
  IconReceipt2,
  // IconSwitchHorizontal,
} from "@tabler/icons-react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { AdminNavbar } from "components/navbars";
import { useEffect, useState } from "react";
import { Transition } from "@mantine/core";
import ConsultationPage from "./adminAppPages/consultationPage/consultationPage";
import UtilisateurPage from "./adminAppPages/utilisateurPage/utilisateurPage";
import GraphPage from "./adminAppPages/graphPage/graphPage";
import { MainApp } from "pages/mainApp/mainApp";

import ControlePage from "pages/mainApp/mainAppPages/controlePage/controlePage";
import CisaillementPage from "pages/mainApp/mainAppPages/cisaillementPage/cisaillementPage";
import MpPage from "pages/mainApp/mainAppPages/mpPage/mpPage";
import EquipementsPage from "pages/mainApp/mainAppPages/equipementsPage/equipementsPage";
import NotesPage from "pages/mainApp/mainAppPages/notesPage/notesPage";
import ValidationPage from "pages/mainApp/mainAppPages/validationPage/validationPage";
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
        style={{
          padding: "24px",
          backgroundColor: "#f5f6f8",
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
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
      <Route exact path="/" element={<Navigate to="utilisateur" />} />

        <Route exact path="/utilisateur" element={<UtilisateurPage />} />
        <Route exact path="/consultation" element={<ConsultationPage />} />
        <Route exact path="/graph" element={<GraphPage />} />
      </Route>

      <Route exact path="/login" element={<Navigate to="/" />} />

      {/* <Route path="/errors/401" element={<Navigate to="/errors/401" />} /> */}

      <Route path="*" element={<Navigate to="/errors/notFound" />} />
      <Route path="/viewData" element={<MainApp />}>
        <Route path="/viewData/controle" element={<ControlePage />} />
        <Route path="cisaillement" element={<CisaillementPage />} />
        <Route path="mp" element={<MpPage />} />
        <Route path="equipements" element={<EquipementsPage />} />
        <Route path="notes" element={<NotesPage />} />
      </Route>
    </Routes>
  );
}
