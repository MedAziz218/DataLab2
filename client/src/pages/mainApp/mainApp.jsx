import {
  IconTestPipeOff,
  IconBoxSeam,
  IconHammer,
  IconSettings,
  IconFileCheck,
  IconNotes,
  IconCut,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons-react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { MainNavbar } from "components/navbars";
import { useEffect, useState } from "react";
import { Transition } from "@mantine/core";
import ControlePage from "./mainAppPages/controlePage/controlePage";
import CisaillementPage from "./mainAppPages/cisaillementPage/cisaillementPage";
import MpPage from "./mainAppPages/mpPage/mpPage";
import EquipementsPage from "./mainAppPages/equipementsPage/equipementsPage";
import NotesPage from "./mainAppPages/notesPage/notesPage";
import ValidationPage from "./mainAppPages/validationPage/validationPage";
import "./mainApp.css"

const data = [
  {
    link: "/controle",
    label: "Feuille de controle Laboratoire",
    icon: IconTestPipeOff,
  },
  { link: "/cisaillement", label: "Test de cisaillement", icon: IconCut },
  { link: "/mp", label: "Matiere Premiere", icon: IconBoxSeam },
  { link: "/equipements", label: "Les equipements de controle", icon: IconHammer },
  { link: "/notes", label: "Notes", icon: IconNotes },
  { link: "/validation", label: "Validation", icon: IconFileCheck },
  // { link: "", label: "Other Settings", icon: IconSettings },
];
export function MainApp() {
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
        {(styles) => <MainNavbar data={data} style={styles} />}
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
export function MainAppRoutes() {
  return (
    <Routes>
      <Route path="" element={<MainApp />}>
      <Route exact path="" element={<Navigate to="controle" />} />

        <Route exact path="controle" element={<ControlePage />} />
        <Route exact path="/cisaillement" element={<CisaillementPage />} />
        <Route exact path="mp" element={<MpPage />} />
        <Route exact path="/equipements" element={<EquipementsPage />} />
        <Route exact path="/notes" element={<NotesPage />} />
        <Route exact path="/validation" element={<ValidationPage />} />
      </Route>

      <Route exact path="/login" element={<Navigate to="/" />} />
      <Route path="/errors/401" element={<Navigate to="/errors/401" />} />

      <Route path="*" element={<Navigate to="/errors/notFound" />} />
    </Routes>
  );
}
