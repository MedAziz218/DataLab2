import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Transition,
  createStyles,
  Box,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { LoadingOverlay } from "@mantine/core";
import { useState, useEffect, useContext, useRef } from "react";

import { AuthContext } from "context/AuthContext";
import { loginCall } from "apiCalls";
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: "72px",
    [theme.fn.largerThan("sm")]: {
      width: "500px",
    },
  },
}));
export function AuthenticationTitle() {
  const [mounted, setMounted] = useState(false);
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);
  const { user, isFetching, dispatch, error } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const data = new FormData(event.currentTarget);
    // console.log(user)

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!isFetching){

      const response = await loginCall({ email, password }, dispatch);
    }
  };
  return (
    <Transition
      mounted={mounted}
      transition="pop"
      duration={200}
      timingFunction="ease"
    >
      {(styles) => (
        <Container className={classes.wrapper} style={{ ...styles }} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              color: "#fff",
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Bienvenue de retour !
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Vous n'avez pas encore de compte ?{" "}
            <Anchor size="sm" component="button">
              Créer un compte
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Transition
              mounted={error}
              transition="pop"
              duration={200}
              timingFunction="ease"
            >
              {(styles)=>(
                <Alert style={styles}
                  icon={<IconAlertCircle size="1rem" />}
                  title={
                    error === "wrong_password"
                      ? "Mot de passe incorrect. Veuillez réessayer."
                      : "Matricule ou mot de passe incorrect. Veuillez réessayer."
                  }
                  color="red"
                ></Alert>
              )}
            </Transition>
            <form>
              <TextInput
                label="Matricule"
                placeholder="votre matricule"
                ref={emailRef}
                required
              />
              <PasswordInput
                label="Mot de passe"
                placeholder="Votre mot de passe"
                ref={passwordRef}
                required
                mt="md"
              />
              <Group position="apart" mt="lg">
                <Checkbox label="Se souvenir de moi" />
                <Anchor component="button" size="sm">
                  Mot de passe oublié ?
                </Anchor>
              </Group>
              <Box style={{ position: "relative" }}>
                <LoadingOverlay visible={isFetching} overlayBlur={2} />
                <Button
                  type="submit"
                  onClick={(e) => !isFetching && handleSubmit(e)}
                  fullWidth
                  mt="xl"
                >
                  Se connecter
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      )}
    </Transition>
  );
}
