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
import { AdminAppRoutes } from "pages/adminApp/adminApp";
import { MantineProvider } from "@mantine/core";
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};
const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};
function formatRGB(rgbValues) {
  const formatted = `rgb(${rgbValues.join(', ')})`;
  return formatted;
}
function generateLighterShades(hexColor) {
  // Convert hex to RGB values
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const tempColors = [];

  for (let i = 0; i <= 9; i++) {
    const lightness = 95 - i * 10;
    const hsl = rgbToHsl(r, g, b);
    const newHexColor = HSLToRGB(hsl[0], hsl[1], lightness);
    tempColors.push(formatRGB(newHexColor));
  }

  return tempColors;
}

// Example usage
const hexColor = "#3498db";
const lighterShades = generateLighterShades(hexColor);
console.log(lighterShades);
const customTheme = {
  colors: {
    navbarColor: lighterShades,

    // [
    //   "#eff1f5",
    //   "#cfd6e2",
    //   "#afbacf",
    //   "#8f9fbc",
    //   "#6f83a9",
    //   "#6f83a9",
    //   "#435270",
    //   "#303b50",
    //   "#1d2330",
    //   "#0a0c10",
    // ],
    // ...other colors
  },
  primaryColor: "navbarColor",
  // ...other theme properties
};

function App() {
  const { user } = useContext(AuthContext);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={user ? customTheme : null}
    >
      <div className="App">
        <Router>
          {!user && <LoginPageRoute />}
          {user && !user.isAdmin && <MainAppRoutes />}
          {user && user.isAdmin && <AdminAppRoutes />}

          <Routes>
            <Route exact path="/errors/notFound" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </MantineProvider>
  );
}

export default App;
