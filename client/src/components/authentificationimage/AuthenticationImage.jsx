import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  rem,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { LoadingOverlay } from "@mantine/core";
import { CustomLoadingOverlay } from "components/customloader"; 
import {CardsCarousel} from "components/carousel"
const useStyles = createStyles((theme) => ({
  wrapper: {
    display:"flex",
    flexDirection:"row",
    minHeight: "500px",
    height: "calc(100vh - 78px)",
    // backgroundSize: "cover",

    // backgroundImage:
      // "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    // minHeight: rem(600),
    height:"100%",
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function AuthenticationImage() {
  const { classes } = useStyles();
  const [visible, { toggle }] = useDisclosure(false);
  return (
    <div className={classes.wrapper} >
      <Paper
        className={classes.form}
        radius={0}
        p={30}
      
      >
        <Box maw={400} miw={326} pos="relative" className="hola">
          <CustomLoadingOverlay visible={visible} overlayBlur={2} />
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}
          >
            Welcome back to Mantine!
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" onClick={toggle}>
            Login
          </Button>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor
              href="#"
              weight={700}
              onClick={(event) => event.preventDefault()}
            >
              Register
            </Anchor>
          </Text>
        </Box>
      </Paper>
      <CardsCarousel/>
    </div>
  );
}
