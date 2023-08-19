import {
  createStyles,
  Overlay,
  Container,
  Title,
  Button,
  Text,
  rem,
  Box,
  Transition,
} from "@mantine/core";
import { Navbar1 } from "components/navbars";
import { AuthenticationTitle } from "components/authenticationtitle/authenticationtitle";
import { useState, useEffect } from "react";
import { Outlet, useNavigate, Route, Routes } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage: `url(${require("./bg.jpg")})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    zIndex: 1,
    position: "relative",
    marginTop: "72px",

    [theme.fn.smallerThan("sm")]: {
      height: "100vh",
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },
  navbar: {
    zIndex: 1,
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));
export function LoginPage() {
  const { classes } = useStyles();
  const [start, setStart] = useState(false);

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />

      <Navbar1
        style={{ position: "fixed", top: 0, width: "100vw", zIndex: 1 }}
      />

      <Container className={classes.container}>
        <Outlet />
      </Container>
    </div>
  );
}

export function Hero() {
  const { classes } = useStyles();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Transition
      mounted={mounted}
      transition="pop"
      duration={200}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles}>
          <Title className={classes.title}>
            {"DataLab : La Puissance du Contrôle Qualité chez Sancella"}
          </Title>
          <Text className={classes.description} size="xl" mt="xl">
            Stockez, analysez et visualisez efficacement les données de test
            avec DataLab. Graphiques, sécurité et collaboration pour un meilleur
            contrôle qualité chez Sancella.
          </Text>

          <Button
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
            onClick={() => {
              navigate("/login");
            }}
          >
            Commencez
          </Button>
        </div>
      )}
    </Transition>
  );
}

export function LoginPageRoute() {
  return (
    
    <Routes>
      <Route path="" element={<LoginPage />}>
        <Route exact path="" element={<Hero />} />
        <Route path="login" element={<AuthenticationTitle />} />

      </Route>
    </Routes>
  );
}
