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
} from "@mantine/core";
import { useState, useEffect } from "react";
export function AuthenticationTitle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Transition
      mounted={mounted}
      transition="pop"
      duration={200}
      timingFunction="ease"
    >
      {(styles) => (
        <Container style={{ minWidth: "500px", ...styles }} my={40}>
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
            <TextInput
              label="Matricule"
              placeholder="votre matricule"
              required
            />
            <PasswordInput
              label="Mot de passe"
              placeholder="Votre mot de passe"
              required
              mt="md"
            />
            <Group position="apart" mt="lg">
              <Checkbox label="Se souvenir de moi" />
              <Anchor component="button" size="sm">
                Mot de passe oublié ?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl">
              Se connecter
            </Button>
          </Paper>
        </Container>
      )}
    </Transition>
  );
}
